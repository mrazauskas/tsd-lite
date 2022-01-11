import type * as ts from "@tsd/typescript";

export type AssertionResult = {
  messageText: string | ts.DiagnosticMessageChain;
  file: ts.SourceFile;
  start: number;
};

export type ErrorResult = ts.Diagnostic | ts.DiagnosticWithLocation;

export type RawResult = AssertionResult | ErrorResult;

export type TsdResult<T extends RawResult> = {
  message: string;
  messageText: T["messageText"];
  start: T["start"];
  file: T["file"];
};
