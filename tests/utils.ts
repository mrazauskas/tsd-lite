import { join } from "path";
import * as ts from "@tsd/typescript";
import type { TsdResult } from "../source/types";

export const fixturePath = (fixture: string): string =>
  join(__dirname, fixture, "index.test.ts");

type TsdResultWithLocation = TsdResult & {
  file: ts.SourceFile;
  start: number;
};

const isTsdResultWithLocation = (
  result: TsdResult
): result is TsdResultWithLocation => result.file !== undefined;

type NormalizedResult = {
  message: string;
  file?: ts.SourceFile;
  line?: number;
  character?: number;
};

export function normalizeResults(
  results: Array<TsdResult> = []
): Array<NormalizedResult> {
  return results.map((result) => {
    if (isTsdResultWithLocation(result)) {
      const { line, character } = result.file.getLineAndCharacterOfPosition(
        result.start
      );
      return {
        message: ts.flattenDiagnosticMessageText(result.messageText, "\n"),
        file: result.file,
        line: line + 1,
        character: character + 1,
      };
    }

    return {
      message: ts.flattenDiagnosticMessageText(result.messageText, "\n"),
      file: result.file,
    };
  });
}
