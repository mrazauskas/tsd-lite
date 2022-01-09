import type * as ts from "@tsd/typescript";
import type { Diagnostic } from "../types";

export function makeDiagnostic(node: ts.Node, messageText: string): Diagnostic {
  return {
    file: node.getSourceFile(),
    start: node.getStart(),
    messageText,
  };
}
