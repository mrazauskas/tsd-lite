import { dirname } from "path";
import * as ts from "@tsd/typescript";
import { TsdError } from "./TsdError";

export function resolveCompilerOptions(
  searchPath: string,
): ts.CompilerOptions | undefined {
  const configPath = ts.findConfigFile(searchPath, ts.sys.fileExists);

  if (configPath === undefined) {
    return;
  }

  const sourceFile = ts.readJsonConfigFile(configPath, ts.sys.readFile);

  const { options: compilerOptions, errors: configDiagnostics } =
    ts.parseJsonSourceFileConfigFileContent(
      sourceFile,
      ts.sys,
      dirname(configPath),
      undefined,
      configPath,
    );

  if (configDiagnostics.length > 0) {
    throw new TsdError("ConfigError", configDiagnostics[0]);
  }

  return compilerOptions;
}
