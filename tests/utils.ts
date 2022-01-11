import { join } from "path";
import type * as ts from "@tsd/typescript";
import type { AssertionResult, ErrorResult, TsdResult } from "../source/types";

export const fixturePath = (fixture: string): string =>
  join(__dirname, fixture, "index.test.ts");

type NormalizedResult = {
  message: string;
  file: ts.SourceFile;
  line: number;
  character: number;
};

export function normalizeResults(
  results: Array<TsdResult<AssertionResult>>
): Array<NormalizedResult> {
  return results.map((result) => {
    const { line, character } = result.file.getLineAndCharacterOfPosition(
      result.start
    );
    return {
      message: result.message,
      file: result.file,
      line: line + 1,
      character: character + 1,
    };
  });
}

type NormalizedError = {
  message: string;
  file?: ts.SourceFile;
  line?: number;
  character?: number;
};

const isDiagnosticWithLocation = (
  diagnostic: TsdResult<ErrorResult>
): diagnostic is TsdResult<ts.DiagnosticWithLocation> =>
  diagnostic.file !== undefined;

export function normalizeErrors(
  errors: Array<TsdResult<ErrorResult>> = []
): Array<NormalizedError> {
  return errors.map((error) => {
    if (isDiagnosticWithLocation(error)) {
      const { line, character } = error.file.getLineAndCharacterOfPosition(
        error.start
      );
      return {
        message: error.message,
        file: error.file,
        line: line + 1,
        character: character + 1,
      };
    }

    return {
      message: error.message,
      file: error.file,
    };
  });
}
