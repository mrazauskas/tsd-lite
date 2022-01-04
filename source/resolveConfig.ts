import { dirname } from "path";
import * as ts from "@tsd/typescript";

export function resolveConfig(fileName: string): {
  compilerOptions: ts.CompilerOptions;
  configDiagnostics: ts.Diagnostic[];
} {
  const tsconfigPath = ts.findConfigFile(fileName, ts.sys.fileExists);

  if (tsconfigPath) {
    const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

    if (error) {
      return { compilerOptions: {}, configDiagnostics: [error] };
    }

    const { options, errors } = ts.parseJsonConfigFileContent(
      config,
      ts.sys,
      dirname(tsconfigPath),
      undefined,
      tsconfigPath
    );

    if (errors.length !== 0) {
      return { compilerOptions: {}, configDiagnostics: errors };
    }

    return { compilerOptions: options, configDiagnostics: [] };
  }

  return { compilerOptions: {}, configDiagnostics: [] };
}
