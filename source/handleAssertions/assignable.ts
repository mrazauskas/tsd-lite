import type * as ts from "@tsd/typescript";
import { makeDiagnostic } from "./makeDiagnostic";
import type { Diagnostic } from "../types";

export function expectNotAssignable(
  checker: ts.TypeChecker,
  nodes: Set<ts.CallExpression>
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  if (!nodes) {
    return diagnostics;
  }

  for (const node of nodes) {
    if (!node.typeArguments) {
      continue;
    }

    const expectedType = checker.getTypeFromTypeNode(node.typeArguments[0]);
    const argumentType = checker.getTypeAtLocation(node.arguments[0]);

    if (checker.isTypeAssignableTo(argumentType, expectedType)) {
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
