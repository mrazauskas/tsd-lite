import * as ts from "@tsd/typescript";
import { handleAssertions, toAssertionResult } from "./handleAssertions";
import {
  Location,
  extractAssertions,
  parseErrorAssertionToLocation,
} from "./parser";
import { silenceError } from "./silenceError";
import type { AssertionResult, TsdResult } from "./types";
import {
  TsdError,
  isDiagnosticWithLocation,
  resolveCompilerOptions,
} from "./utils";

function toTsdResult(rawResult: AssertionResult | ts.Diagnostic): TsdResult {
  return {
    messageText: rawResult.messageText,
    file: rawResult.file,
    start: rawResult.start,
  };
}

export function tsdLite(testFilePath: string): {
  assertionsCount: number;
  tsdResults: Array<TsdResult>;
} {
  const compilerOptions = resolveCompilerOptions(testFilePath);

  const program = ts.createProgram([testFilePath], compilerOptions || {});
  const syntacticDiagnostics = program.getSyntacticDiagnostics();

  if (syntacticDiagnostics.length !== 0) {
    throw new TsdError(syntacticDiagnostics[0], "SyntaxError");
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
