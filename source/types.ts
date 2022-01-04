import type * as ts from "@tsd/typescript";

export type Diagnostic = {
  fileName: string;
  fileText: string;
  message: string;
  line?: number;
  column?: number;
};

export type Location = {
  fileName: string;
  start: number;
  end: number;
};

export type Handler = (
  typeChecker: ts.TypeChecker,
  nodes: Set<ts.CallExpression>
) => Diagnostic[];

export type ExpectedError = Pick<
  Diagnostic,
  "fileName" | "fileText" | "line" | "column"
>;
