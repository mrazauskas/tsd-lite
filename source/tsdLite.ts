import * as ts from "@tsd/typescript";
import { handleAssertions } from "./handleAssertions";
import { extractAssertions, parseErrorAssertionToLocation } from "./parser";
import { resolveCompilerOptions } from "./resolveCompilerOptions";
import type { ExpectedError, Location, TsdResult } from "./types";

// For reference see:
// https://github.com/microsoft/TypeScript/blob/main/src/compiler/diagnosticMessages.json

const silencedErrors = [
  2314, 2322, 2339, 2344, 2345, 2348, 2349, 2350, 2351, 2540, 2554, 2555, 2559,
  2575, 2684, 2741, 2743, 2769, 2820, 4113, 4114, 7009,
];

const topLevelAwaitErrors = [1308, 1378];

const isDiagnosticWithLocation = (
  diagnostic: ts.Diagnostic
): diagnostic is ts.DiagnosticWithLocation => diagnostic.file !== undefined;

function isIgnoredDiagnostic(
  diagnostic: ts.DiagnosticWithLocation,
  expectedErrors: Map<Location, ExpectedError>
) {
  if (topLevelAwaitErrors.includes(diagnostic.code)) {
    return "ignore";
  }

  if (!silencedErrors.includes(diagnostic.code)) {
    return "preserve";
  }

  const diagnosticFileName = diagnostic.file.fileName;
  const diagnosticStart = diagnostic.start;

  for (const [location] of expectedErrors) {
    if (
      diagnosticFileName === location.fileName &&
      diagnosticStart > location.start &&
      diagnosticStart < location.end
    ) {
      return location;
    }
  }

  return "preserve";
}

export function tsdLite(testFilePath: string): {
  assertionCount: number;
  tsdResults: Array<TsdResult>;
  tsdErrors?: ReadonlyArray<ts.Diagnostic | ts.DiagnosticWithLocation>;
} {
  const { compilerOptions, configDiagnostics } =
    resolveCompilerOptions(testFilePath);

  if (configDiagnostics.length !== 0) {
    return {
      tsdErrors: configDiagnostics,
      assertionCount: 0,
      tsdResults: [],
    };
  }

  const program = ts.createProgram([testFilePath], compilerOptions);
  const syntacticDiagnostics = program.getSyntacticDiagnostics();

  if (syntacticDiagnostics.length !== 0) {
    return {
      tsdErrors: syntacticDiagnostics,
      assertionCount: 0,
      tsdResults: [],
    };
  }

  const semanticDiagnostics = program.getSemanticDiagnostics();

  const typeChecker = program.getTypeChecker();
  const { assertions, assertionCount } = extractAssertions(program);

  const tsdResults = handleAssertions(typeChecker, assertions);

  const expectedErrors = parseErrorAssertionToLocation(assertions);
  const expectedErrorsLocationsWithFoundDiagnostics: Location[] = [];

  for (const diagnostic of semanticDiagnostics) {
    if (!isDiagnosticWithLocation(diagnostic)) {
      continue;
    }

    if (/[/\\]node_modules[/\\]/.test(diagnostic.file.fileName)) {
      continue;
    }

    const ignoreDiagnosticResult = isIgnoredDiagnostic(
      diagnostic,
      expectedErrors
    );

    if (ignoreDiagnosticResult !== "preserve") {
      if (ignoreDiagnosticResult !== "ignore") {
        expectedErrorsLocationsWithFoundDiagnostics.push(
          ignoreDiagnosticResult
        );
      }

      continue;
    }

    tsdResults.push(diagnostic);
  }

  for (const errorLocationToRemove of expectedErrorsLocationsWithFoundDiagnostics) {
    expectedErrors.delete(errorLocationToRemove);
  }

  for (const [, error] of expectedErrors) {
    tsdResults.push({
      ...error,
      messageText: "Expected an error, but found none.",
    });
  }

  return { assertionCount, tsdResults };
}
