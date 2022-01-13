import * as ts from "@tsd/typescript";
import { handleAssertions, toAssertionResult } from "./handleAssertions";
import {
  Location,
  extractAssertions,
  parseErrorAssertionToLocation,
} from "./parser";
import { resolveCompilerOptions } from "./resolveCompilerOptions";
import { silenceError } from "./silenceError";
import type { AssertionResult, TsdResult } from "./types";

function toTsdResult(
  rawResult: AssertionResult | ts.Diagnostic,
  messagePrefix = ""
): TsdResult {
  return {
    message: [
      messagePrefix,
      ts.flattenDiagnosticMessageText(rawResult.messageText, ts.sys.newLine),
    ].join(""),
    messageText: rawResult.messageText,
    file: rawResult.file,
    start: rawResult.start,
  };
}

function toTsdErrors(
  rawErrors: ReadonlyArray<ts.Diagnostic>,
  messagePrefix = ""
) {
  return {
    tsdErrors: rawErrors.map((error) => toTsdResult(error, messagePrefix)),
    assertionsCount: 0,
    tsdResults: [],
  };
}

const isDiagnosticWithLocation = (
  diagnostic: ts.Diagnostic
): diagnostic is ts.DiagnosticWithLocation => diagnostic.file !== undefined;

export function tsdLite(testFilePath: string): {
  assertionsCount: number;
  tsdResults: Array<TsdResult>;
  tsdErrors?: Array<TsdResult>;
} {
  const { compilerOptions, configDiagnostics } =
    resolveCompilerOptions(testFilePath);

  if (configDiagnostics.length !== 0) {
    return toTsdErrors(configDiagnostics);
  }

  const program = ts.createProgram([testFilePath], compilerOptions);
  const syntacticDiagnostics = program.getSyntacticDiagnostics();

  if (syntacticDiagnostics.length !== 0) {
    return toTsdErrors(syntacticDiagnostics, "SyntaxError: ");
  }

  const semanticDiagnostics = program.getSemanticDiagnostics();

  const typeChecker = program.getTypeChecker();
  const { assertions, assertionsCount } = extractAssertions(program);

  const assertionResults = handleAssertions(typeChecker, assertions);

  const expectedErrors = parseErrorAssertionToLocation(assertions);
  const expectedErrorsLocationsWithFoundDiagnostics: Array<Location> = [];

  for (const diagnostic of semanticDiagnostics) {
    if (isDiagnosticWithLocation(diagnostic)) {
      const silenceErrorResult = silenceError(diagnostic, expectedErrors);

      if (silenceErrorResult !== "preserve") {
        if (silenceErrorResult !== "ignore") {
          expectedErrorsLocationsWithFoundDiagnostics.push(silenceErrorResult);
        }
        continue;
      }
    }

    assertionResults.push(diagnostic);
  }

  for (const errorLocation of expectedErrorsLocationsWithFoundDiagnostics) {
    expectedErrors.delete(errorLocation);
  }

  for (const [, node] of expectedErrors) {
    assertionResults.push(
      toAssertionResult(node, "Expected an error, but found none.")
    );
  }

  const tsdResults = assertionResults.map((result) => {
    return toTsdResult(result);
  });

  return { assertionsCount, tsdResults };
}
