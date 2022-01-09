import type * as ts from "@tsd/typescript";

export type Diagnostic = {
  file: ts.SourceFile;
  messageText: string | ts.DiagnosticMessageChain;
  start: number;
};

export type ExpectedError = Omit<Diagnostic, "messageText">;

export type Location = {
  fileName: string;
  start: number;
  end: number;
};

export type Handler = (
  typeChecker: ts.TypeChecker,
  nodes: Set<ts.CallExpression>
) => Diagnostic[];
