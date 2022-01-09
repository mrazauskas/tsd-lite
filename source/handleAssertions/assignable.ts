import type * as ts from "@tsd/typescript";
import { makeTsdResult } from "./makeTsdResult";
import type { TsdResult } from "../types";

export function expectNotAssignable(
  checker: ts.TypeChecker,
  nodes: Set<ts.CallExpression>
): TsdResult[] {
  const tsdResults: TsdResult[] = [];

  if (!nodes) {
    return tsdResults;
  }

  for (const node of nodes) {
    if (!node.typeArguments) {
      continue;
    }

    const expectedType = checker.getTypeFromTypeNode(node.typeArguments[0]);
    const argumentType = checker.getTypeAtLocation(node.arguments[0]);

    if (checker.isTypeAssignableTo(argumentType, expectedType)) {
      tsdResults.push(
        makeTsdResult(
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

  return tsdResults;
}
