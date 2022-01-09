import { join } from "path";
import type * as ts from "@tsd/typescript";
import type { TsdResult } from "../";

export const fixturePath = (fixture: string): string =>
  join(__dirname, fixture, "index.test.ts");

export function normalizeResults(results: TsdResult[]): {
  file: ts.SourceFile;
  message: string | ts.DiagnosticMessageChain;
  line: number;
  character: number;
}[] {
  return results.map((result) => {
    const { line, character } = result.file.getLineAndCharacterOfPosition(
      result.start
    );
    return {
      file: result.file,
      message: result.messageText,
      line: line + 1,
      character: character + 1,
    };
  });
}

const isDiagnosticWithLocation = (
  diagnostic: ts.Diagnostic
): diagnostic is ts.DiagnosticWithLocation => diagnostic.file !== undefined;

export function normalizeDiagnostic(diagnostics: ts.Diagnostic[] = []): {
  file: ts.SourceFile | undefined;
  message: string | ts.DiagnosticMessageChain;
  line: number | undefined;
  character: number | undefined;
}[] {
  return diagnostics.map((diagnostic) => {
    let location;

    if (isDiagnosticWithLocation(diagnostic)) {
      location = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start
      );
    }

    return {
      file: diagnostic.file,
      message: diagnostic.messageText,
      line: location?.line ? location.line + 1 : undefined,
      character: location?.character ? location.character + 1 : undefined,
    };
  });
}
