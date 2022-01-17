import * as ts from "@tsd/typescript";
import { isDiagnosticWithLocation } from "./isDiagnosticWithLocation";

function formatMassageAndLocation(diagnostic: ts.Diagnostic): {
  message: string;
  location?: string;
} {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");

  if (isDiagnosticWithLocation(diagnostic)) {
    const { file, start } = diagnostic;

    const { line, character } = file.getLineAndCharacterOfPosition(start);
    const location = `at ${file.fileName}:${line + 1}:${character + 1}`;

    return { message, location };
  }

  return { message };
}

export class TsdError extends Error {
  constructor(diagnostic: ts.Diagnostic, name: string) {
    const { message, location } = formatMassageAndLocation(diagnostic);

    super(message);

    this.name = name;
    this.stack = [`${this.name}: ${this.message}`, location]
      .filter((line) => line !== undefined)
      .join("\n    ");
  }
}
