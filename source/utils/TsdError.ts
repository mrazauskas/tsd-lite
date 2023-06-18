import * as ts from "@tsd/typescript";

export interface TsdErrorOptions {
  file?: ts.SourceFile | undefined;
  messageText: string | ts.DiagnosticMessageChain;
  start?: number | undefined;
}

export class TsdError extends Error {
  constructor(name: string, options: TsdErrorOptions) {
    let location: string | undefined;

    if (options.file != null && options.start != null) {
      const { line, character } = options.file.getLineAndCharacterOfPosition(
        options.start
      );
      location = `at ${options.file.fileName}:${line + 1}:${character + 1}`;
    }

    const message = ts.flattenDiagnosticMessageText(options.messageText, "\n");

    super(message);

    this.name = name;
    this.stack = [`${this.name}: ${this.message}`, location]
      .filter((line) => line !== undefined)
      .join("\n    ");
  }
}
