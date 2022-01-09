import { resolve } from "path";
import type * as ts from "@tsd/typescript";
import type { Diagnostic } from "../source/types";

export const fixturePath = (fixture: string): string =>
  resolve("tests", fixture, "index.test.ts");

export function normalizeDiagnostics(diagnostics: Diagnostic[]): {
  file: ts.SourceFile;
  message: string | ts.DiagnosticMessageChain;
  character: number;
  line: number;
}[] {
  return diagnostics.map((diagnostic) => {
    const { character, line } = diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start
    );
    return {
      file: diagnostic.file,
      message: diagnostic.messageText,
      line: line + 1,
      character: character + 1,
    };
  });
}
