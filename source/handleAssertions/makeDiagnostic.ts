import type * as ts from "@tsd/typescript";
import type { Diagnostic } from "../types";

export function makeDiagnostic(node: ts.Node, message: string): Diagnostic {
  const position = node
    .getSourceFile()
    .getLineAndCharacterOfPosition(node.getStart());
  const { fileName, text: fileText } = node.getSourceFile();

  return {
    fileName,
    fileText,
    message,
    line: position.line + 1,
    column: position.character + 1,
  };
}
