import type * as ts from "@tsd/typescript";

export type AssertionResult = {
  messageText: string | ts.DiagnosticMessageChain;
  file: ts.SourceFile | undefined;
  start: number | undefined;
};

export type TsdResult = AssertionResult;
