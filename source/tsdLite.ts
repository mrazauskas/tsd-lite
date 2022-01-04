import * as ts from "@tsd/typescript";
import { handleAssertions } from "./handleAssertions";
import { extractAssertions, parseErrorAssertionToLocation } from "./parser";
import { resolveConfig } from "./resolveConfig";
import type { Diagnostic, ExpectedError, Location } from "./types";

enum DiagnosticCode {
  AwaitExpressionOnlyAllowedWithinAsyncFunction = 1308,
  TopLevelAwaitOnlyAllowedWhenModuleESNextOrSystem = 1378,
  GenericTypeRequiresTypeArguments = 2314,
  TypeIsNotAssignableToOtherType = 2322,
  PropertyDoesNotExistOnType = 2339,
  TypeDoesNotSatisfyTheConstraint = 2344,
  ArgumentTypeIsNotAssignableToParameterType = 2345,
  ValueOfTypeNotCallable = 2348,
  ExpressionNotCallable = 2349,
  OnlyVoidFunctionIsNewCallable = 2350,
  ExpressionNotConstructable = 2351,
  CannotAssignToReadOnlyProperty = 2540,
  ExpectedArgumentsButGotOther = 2554,
  ExpectedAtLeastArgumentsButGotOther = 2555,
  TypeHasNoPropertiesInCommonWith = 2559,
  NoOverloadExpectsCountOfArguments = 2575,
  ThisContextOfTypeNotAssignableToMethodOfThisType = 2684,
  PropertyMissingInType1ButRequiredInType2 = 2741,
  NoOverloadExpectsCountOfTypeArguments = 2743,
  NoOverloadMatches = 2769,
  StringLiteralTypeIsNotAssignableToUnionTypeWithSuggestion = 2820,
  MemberCannotHaveOverrideModifierBecauseItIsNotDeclaredInBaseClass = 4113,
  MemberMustHaveOverrideModifier = 4114,
  NewExpressionTargetLackingConstructSignatureHasAnyType = 7009,
}

// List of diagnostic codes that should be ignored in general
const ignoredDiagnostics = new Set<number>([
  // Older TS version report 'await expression only allowed within async function
  DiagnosticCode.AwaitExpressionOnlyAllowedWithinAsyncFunction,
  DiagnosticCode.TopLevelAwaitOnlyAllowedWhenModuleESNextOrSystem,
]);

// List of diagnostic codes which should be ignored inside `expectError` statements
const expectErrorDiagnosticCodesToIgnore = new Set<DiagnosticCode>([
  DiagnosticCode.ArgumentTypeIsNotAssignableToParameterType,
  DiagnosticCode.PropertyDoesNotExistOnType,
  DiagnosticCode.CannotAssignToReadOnlyProperty,
  DiagnosticCode.TypeIsNotAssignableToOtherType,
  DiagnosticCode.TypeDoesNotSatisfyTheConstraint,
  DiagnosticCode.GenericTypeRequiresTypeArguments,
  DiagnosticCode.ExpectedArgumentsButGotOther,
  DiagnosticCode.ExpectedAtLeastArgumentsButGotOther,
  DiagnosticCode.NoOverloadExpectsCountOfArguments,
  DiagnosticCode.NoOverloadExpectsCountOfTypeArguments,
  DiagnosticCode.NoOverloadMatches,
  DiagnosticCode.PropertyMissingInType1ButRequiredInType2,
  DiagnosticCode.TypeHasNoPropertiesInCommonWith,
  DiagnosticCode.ThisContextOfTypeNotAssignableToMethodOfThisType,
  DiagnosticCode.ValueOfTypeNotCallable,
  DiagnosticCode.ExpressionNotCallable,
  DiagnosticCode.OnlyVoidFunctionIsNewCallable,
  DiagnosticCode.ExpressionNotConstructable,
  DiagnosticCode.NewExpressionTargetLackingConstructSignatureHasAnyType,
  DiagnosticCode.MemberCannotHaveOverrideModifierBecauseItIsNotDeclaredInBaseClass,
  DiagnosticCode.MemberMustHaveOverrideModifier,
  DiagnosticCode.StringLiteralTypeIsNotAssignableToUnionTypeWithSuggestion,
]);

/**
 * Check if the provided diagnostic should be ignored.
 *
 * @param diagnostic - The diagnostic to validate.
 * @param expectedErrors - Map of the expected errors.
 * @returns Whether the diagnostic should be `'preserve'`d, `'ignore'`d or, in case that
 * the diagnostic is reported from inside of an `expectError` assertion, the `Location`
 * of the assertion.
 */
const ignoreDiagnostic = (
  diagnostic: ts.Diagnostic,
  expectedErrors: Map<Location, ExpectedError>
) => {
  if (ignoredDiagnostics.has(diagnostic.code)) {
    // Filter out diagnostics which are present in the `ignoredDiagnostics` set
    return "ignore";
  }

  if (!expectErrorDiagnosticCodesToIgnore.has(diagnostic.code)) {
    return "preserve";
  }

  const diagnosticFileName = diagnostic.file!.fileName; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  for (const [location] of expectedErrors) {
    const start = diagnostic.start!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

    if (
      diagnosticFileName === location.fileName &&
      start > location.start &&
      start < location.end
    ) {
      return location;
    }
  }

  return "preserve";
};

/**
 * Check TypeScript type definitions.
 *
 * @param testPath - Fully resolved path to a test file.
 * @returns A promise which resolves the diagnostics of the type definition.
 */
export function tsdLite(testPath: string): {
  assertionCount: number;
  diagnostics: Diagnostic[];
} {
  const diagnostics: Diagnostic[] = [];

  const { compilerOptions } = resolveConfig(testPath);
  const program = ts.createProgram([testPath], compilerOptions);

  const tsDiagnostics = program
    .getSemanticDiagnostics()
    .concat(program.getSyntacticDiagnostics());

  const { assertions, assertionCount } = extractAssertions(program);

  diagnostics.push(...handleAssertions(program.getTypeChecker(), assertions));

  const expectedErrors = parseErrorAssertionToLocation(assertions);
  const expectedErrorsLocationsWithFoundDiagnostics: Location[] = [];

  for (const diagnostic of tsDiagnostics) {
    /* Filter out all diagnostic messages without a file or from node_modules directories, files under
     * node_modules are most definitely not under test.
     */
    if (
      !diagnostic.file ||
      /[/\\]node_modules[/\\]/.test(diagnostic.file.fileName)
    ) {
      continue;
    }

    const ignoreDiagnosticResult = ignoreDiagnostic(diagnostic, expectedErrors);

    if (ignoreDiagnosticResult !== "preserve") {
      if (ignoreDiagnosticResult !== "ignore") {
        expectedErrorsLocationsWithFoundDiagnostics.push(
          ignoreDiagnosticResult
        );
      }

      continue;
    }

    const position = diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start! // eslint-disable-line @typescript-eslint/no-non-null-assertion
    );
    const { fileName, text: fileText } = diagnostic.file;

    diagnostics.push({
      fileName,
      fileText,
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
      line: position.line + 1,
      column: position.character + 1,
    });
  }

  for (const errorLocationToRemove of expectedErrorsLocationsWithFoundDiagnostics) {
    expectedErrors.delete(errorLocationToRemove);
  }

  for (const [, diagnostic] of expectedErrors) {
    diagnostics.push({
      ...diagnostic,
      message: "Expected an error, but found none.",
    });
  }

  return { assertionCount, diagnostics };
}
