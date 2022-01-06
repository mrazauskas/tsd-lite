import type * as ts from "@tsd/typescript";
import type { Diagnostic, Handler } from "../types";
import { expectNotAssignable } from "./assignable";
import { expectDeprecated, expectNotDeprecated } from "./deprecated";
import { expectType, expectNotType } from "./identical";

export enum Assertion {
  EXPECT_TYPE = "expectType",
  EXPECT_NOT_TYPE = "expectNotType",
  EXPECT_ERROR = "expectError",
  EXPECT_ASSIGNABLE = "expectAssignable",
  EXPECT_NOT_ASSIGNABLE = "expectNotAssignable",
  EXPECT_DEPRECATED = "expectDeprecated",
  EXPECT_NOT_DEPRECATED = "expectNotDeprecated",
}

const assertionHandlers = new Map<Assertion, Handler>([
  [Assertion.EXPECT_TYPE, expectType],
  [Assertion.EXPECT_NOT_TYPE, expectNotType],
  [Assertion.EXPECT_NOT_ASSIGNABLE, expectNotAssignable],
  [Assertion.EXPECT_DEPRECATED, expectDeprecated],
  [Assertion.EXPECT_NOT_DEPRECATED, expectNotDeprecated],
]);

export function handleAssertions(
  typeChecker: ts.TypeChecker,
  assertions: Map<Assertion, Set<ts.CallExpression>>
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  for (const [assertion, nodes] of assertions) {
    const handler = assertionHandlers.get(assertion);

    if (!handler) {
      continue;
    }

    diagnostics.push(...handler(typeChecker, nodes));
  }

  return diagnostics;
}
