import * as ts from "@tsd/typescript";
import { Assertion } from "./handleAssertions";
import type { ExpectedError, Location } from "./types";

const assertionFnNames = new Set<string>(Object.values(Assertion));

export function extractAssertions(program: ts.Program): {
  assertions: Map<Assertion, Set<ts.CallExpression>>;
  assertionCount: number;
} {
  const assertions = new Map<Assertion, Set<ts.CallExpression>>();

  function visit(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      const identifier = node.expression.getText();

      if (assertionFnNames.has(identifier)) {
        const assertion = identifier as Assertion;

        const nodes = assertions.get(assertion) ?? new Set<ts.CallExpression>();

        nodes.add(node);

        assertions.set(assertion, nodes);
      }
    }

    ts.forEachChild(node, visit);
  }

  for (const sourceFile of program.getSourceFiles()) {
    visit(sourceFile);
  }

  let assertionCount = 0;
  assertions.forEach((nodes) => {
    assertionCount += nodes.size;
  });

  return { assertions, assertionCount };
}

export function parseErrorAssertionToLocation(
  assertions: Map<Assertion, Set<ts.CallExpression>>
): Map<Location, ExpectedError> {
  const nodes = assertions.get(Assertion.EXPECT_ERROR);

  const expectedErrors = new Map<Location, ExpectedError>();

  if (!nodes) {
    return expectedErrors;
  }

  for (const node of nodes) {
    const { fileName, text: fileText } = node.getSourceFile();

    const location = {
      fileName,
      fileText,
      start: node.getStart(),
      end: node.getEnd(),
    };

    const pos = node
      .getSourceFile()
      .getLineAndCharacterOfPosition(node.getStart());

    expectedErrors.set(location, {
      fileName: location.fileName,
      fileText: location.fileText,
      line: pos.line + 1,
      column: pos.character + 1,
    });
  }

  return expectedErrors;
}
