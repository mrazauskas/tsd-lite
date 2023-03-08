import * as ts from "@tsd/typescript";
import type { Location } from "./parser";

// For reference see:
// https://github.com/microsoft/TypeScript/blob/main/src/compiler/diagnosticMessages.json

const silencedErrors = [
  2314, 2322, 2339, 2344, 2366, 2345, 2348, 2349, 2350, 2351, 2375, 2379, 2412,
  2540, 2542, 2554, 2555, 2559, 2575, 2684, 2707, 2741, 2743, 2769, 2820, 4113,
  4114, 7009,
];

const topLevelAwaitErrors = [1308, 1378];

export function silenceError(
  diagnostic: ts.DiagnosticWithLocation,
  expectedErrors: Map<Location, ts.Node>
): "ignore" | "preserve" | Location {
  if (topLevelAwaitErrors.includes(diagnostic.code)) {
    return "ignore";
  }

  if (!silencedErrors.includes(diagnostic.code)) {
    return "preserve";
  }

  for (const [location] of expectedErrors) {
    if (
      location.fileName === diagnostic.file.fileName &&
      ts.textSpanContainsPosition(location.span, diagnostic.start)
    ) {
      return location;
    }
  }

  return "preserve";
}
