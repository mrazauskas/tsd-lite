import type * as ts from "@tsd/typescript";
import { makeDiagnostic } from "./makeDiagnostic";
import type { Diagnostic } from "../types";

/**
 * Verifies that the argument of the assertion is not assignable to the generic type of the assertion.
 *
 * @param checker - The TypeScript type checker.
 * @param nodes - The `expectType` AST nodes.
 * @return List of custom diagnostics.
 */
export function isNotAssignable(
  checker: ts.TypeChecker,
  nodes: Set<ts.CallExpression>
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  if (!nodes) {
    return diagnostics;
  }

  for (const node of nodes) {
    if (!node.typeArguments) {
      // Skip if the node does not have generics
      continue;
    }

    // Retrieve the type to be expected. This is the type inside the generic.
    const expectedType = checker.getTypeFromTypeNode(node.typeArguments[0]);
    const argumentType = checker.getTypeAtLocation(node.arguments[0]);

    if (checker.isTypeAssignableTo(argumentType, expectedType)) {
      /**
       * The argument type is assignable to the expected type, we don't want this so add a diagnostic.
       */
      diagnostics.push(
        makeDiagnostic(
          node,
          `Argument of type '${checker.typeToString(
            argumentType
          )}' is assignable to parameter of type '${checker.typeToString(
            expectedType
          )}'.`
        )
      );
    }
  }

  return diagnostics;
}
