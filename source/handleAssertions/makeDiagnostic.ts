import type * as ts from "@tsd/typescript";
import type { Diagnostic } from "../types";

/**
 * Create a diagnostic from the given `node` and `message`.
 *
 * @param node - The TypeScript Node where this diagnostic occurs.
 * @param message - Message of the diagnostic.
 */
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
