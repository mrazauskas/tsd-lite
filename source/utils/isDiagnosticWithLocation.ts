import type * as ts from "@tsd/typescript";

export const isDiagnosticWithLocation = (
  diagnostic: ts.Diagnostic
): diagnostic is ts.DiagnosticWithLocation => diagnostic.file !== undefined;
