import { dirname } from "path";
import * as ts from "@tsd/typescript";

export function resolveCompilerOptions(searchPath: string): {
  compilerOptions: ts.CompilerOptions;
  configDiagnostics: Array<ts.Diagnostic>;
} {
  const configPath = ts.findConfigFile(searchPath, ts.sys.fileExists);

  if (configPath === undefined) {
    return { compilerOptions: {}, configDiagnostics: [] };
  }

  const sourceFile = ts.readJsonConfigFile(configPath, ts.sys.readFile);

  const { options: compilerOptions, errors: configDiagnostics } =
    ts.parseJsonSourceFileConfigFileContent(
      sourceFile,
      ts.sys,
      dirname(configPath),
      undefined,
      configPath
    );

  return { compilerOptions, configDiagnostics };
}
