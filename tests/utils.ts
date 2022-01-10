import { join } from "path";
import type * as ts from "@tsd/typescript";
import type { TsdResult } from "../";

export const fixturePath = (fixture: string): string =>
  join(__dirname, fixture, "index.test.ts");

type NormalizedResult = {
  message: string | ts.DiagnosticMessageChain;
  file: ts.SourceFile;
  line: number;
  character: number;
};

export function normalizeResults(
  results: Array<TsdResult>
): Array<NormalizedResult> {
  return results.map((result) => {
    const { line, character } = result.file.getLineAndCharacterOfPosition(
      result.start
    );
    return {
      message: result.messageText,
      file: result.file,
      line: line + 1,
      character: character + 1,
    };
  });
}

type NormalizedError = {
  message: string | ts.DiagnosticMessageChain;
  file?: ts.SourceFile;
  line?: number;
  character?: number;
};

const isDiagnosticWithLocation = (
  diagnostic: ts.Diagnostic
): diagnostic is ts.DiagnosticWithLocation => diagnostic.file !== undefined;

export function normalizeErrors(
  diagnostics: ReadonlyArray<ts.Diagnostic | ts.DiagnosticWithLocation> = []
): Array<NormalizedError> {
  return diagnostics.map((diagnostic) => {
    if (isDiagnosticWithLocation(diagnostic)) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start
      );
      return {
        message: diagnostic.messageText,
        file: diagnostic.file,
        line: line + 1,
        character: character + 1,
      };
    }

    return {
      message: diagnostic.messageText,
      file: diagnostic.file,
    };
  });
}
