import type * as ts from "@tsd/typescript";

export type TsdResult = {
  file: ts.SourceFile;
  messageText: string | ts.DiagnosticMessageChain;
  start: number;
};

export type ExpectedError = Omit<TsdResult, "messageText">;

export type Location = {
  fileName: string;
  start: number;
  end: number;
};

export type Handler = (
  typeChecker: ts.TypeChecker,
  nodes: Set<ts.CallExpression>
) => TsdResult[];
