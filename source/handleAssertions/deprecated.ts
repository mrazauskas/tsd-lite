import * as ts from "@tsd/typescript";
import { makeDiagnostic } from "./makeDiagnostic";
import type { Diagnostic, Handler } from "../types";

/**
 * Convert a TypeScript expression to a string.
 *
 * @param checker - The TypeScript type checker.
 * @param expression - The expression to convert.
 * @return The string representation of the expression or `undefined` if it couldn't be resolved.
 */
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

/**
 * Resolve the JSDoc tags from the expression. If these tags couldn't be found, it will return `undefined`.
 *
 * @param checker - The TypeScript type checker.
 * @param expression - The expression to resolve the JSDoc tags for.
 * @return A unique Set of JSDoc tags or `undefined` if they couldn't be resolved.
 */
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
    const diagnostics: Diagnostic[] = [];

    if (!nodes) {
      // Bail out if we don't have any nodes
      return diagnostics;
    }

    for (const node of nodes) {
      const argument = node.arguments[0];

      const tags = resolveJSDocTags(checker, argument);

      if (!tags || !options.filter(tags)) {
        // Bail out if not tags couldn't be resolved or when the node matches the filter expression
        continue;
      }

      const message = expressionToString(checker, argument);

      diagnostics.push(makeDiagnostic(node, options.message(message ?? "?")));
    }

    return diagnostics;
  };
}

/**
 * Assert that the argument from the `expectDeprecated` statement is marked as `@deprecated`.
 * If it's not marked as `@deprecated`, an error diagnostic is returned.
 *
 * @param checker - The TypeScript type checker.
 * @param nodes - The `expectDeprecated` AST nodes.
 * @return List of diagnostics.
 */
export const expectDeprecated = expectDeprecatedHelper({
  filter: (tags) => !tags.has("deprecated"),
  message: (signature) => `Expected '${signature}' to be marked deprecated`,
});

/**
 * Assert that the argument from the `expectNotDeprecated` statement is not marked as `@deprecated`.
 * If it's marked as `@deprecated`, an error diagnostic is returned.
 *
 * @param checker - The TypeScript type checker.
 * @param nodes - The `expectNotDeprecated` AST nodes.
 * @return List of diagnostics.
 */
export const expectNotDeprecated = expectDeprecatedHelper({
  filter: (tags) => tags.has("deprecated"),
  message: (signature) => `Expected '${signature}' to not be marked deprecated`,
});
