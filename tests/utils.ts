import { resolve } from "path";
import type * as ts from "@tsd/typescript";
import type { TsdResult } from "../";

export const fixturePath = (fixture: string): string =>
  resolve("tests", fixture, "index.test.ts");

export function normalizeResults(results: TsdResult[]): {
  file: ts.SourceFile;
  message: string | ts.DiagnosticMessageChain;
  line: number;
  character: number;
}[] {
  return results.map((result) => {
    const { character, line } = result.file.getLineAndCharacterOfPosition(
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
