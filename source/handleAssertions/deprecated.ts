import * as ts from "@tsd/typescript";
import type { AssertionResult } from "../types";
import { type Handler, toAssertionResult } from "./";

export function expressionToString(
  checker: ts.TypeChecker,
  expression: ts.Expression
): string | undefined {
  if (ts.isCallLikeExpression(expression)) {
    const signature = checker.getResolvedSignature(expression);

    if (!signature) {
      return;
    }

    return checker.signatureToString(signature);
  }

  const symbol = checker.getSymbolAtLocation(expression);

  if (!symbol) {
    return;
  }

  return checker.symbolToString(symbol, expression);
}

export function resolveJSDocTags(
  checker: ts.TypeChecker,
  expression: ts.Expression
): Map<string, ts.JSDocTagInfo> | undefined {
  const ref = ts.isCallLikeExpression(expression)
    ? checker.getResolvedSignature(expression)
    : checker.getSymbolAtLocation(expression);

  if (!ref) {
    return;
  }

  return new Map<string, ts.JSDocTagInfo>(
    ref.getJsDocTags().map((tag) => [tag.name, tag])
  );
}

type Options = {
  filter(tags: Map<string, ts.JSDocTagInfo>): boolean;
  message(signature: string): string;
};

function expectDeprecatedHelper(options: Options): Handler {
  return (checker, nodes) => {
    const tsdResults: Array<AssertionResult> = [];

    if (!nodes) {
      return tsdResults;
    }

    for (const node of nodes) {
      const argument = node.arguments[0];

      const tags = resolveJSDocTags(checker, argument);

      if (!tags || !options.filter(tags)) {
        continue;
      }

      const message = expressionToString(checker, argument);

      tsdResults.push(toAssertionResult(node, options.message(message ?? "?")));
    }

    return tsdResults;
  };
}

export const expectDeprecated = expectDeprecatedHelper({
  filter: (tags) => !tags.has("deprecated"),
  message: (signature) => `Expected '${signature}' to be marked deprecated`,
});

export const expectNotDeprecated = expectDeprecatedHelper({
  filter: (tags) => tags.has("deprecated"),
  message: (signature) => `Expected '${signature}' to not be marked deprecated`,
});
