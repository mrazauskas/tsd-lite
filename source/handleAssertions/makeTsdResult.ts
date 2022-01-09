import type * as ts from "@tsd/typescript";
import type { TsdResult } from "../types";

export function makeTsdResult(node: ts.Node, messageText: string): TsdResult {
  return {
    file: node.getSourceFile(),
    start: node.getStart(),
    messageText,
  };
}
