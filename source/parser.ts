import * as ts from "@tsd/typescript";
import { Assertion } from "./handleAssertions";
import type { ExpectedError, Location } from "./types";

const assertionFnNames = new Set<string>(Object.values(Assertion));

/**
 * Extract all assertions.
 *
 * @param program - TypeScript program.
 */
export function extractAssertions(program: ts.Program): {
  assertions: Map<Assertion, Set<ts.CallExpression>>;
  assertionCount: number;
} {
  const assertions = new Map<Assertion, Set<ts.CallExpression>>();

  /**
   * Recursively loop over all the nodes and extract all the assertions out of the source files.
   */
  function walkNodes(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      const identifier = (node.expression as ts.Identifier).getText();

      // Check if the call type is a valid assertion
      if (assertionFnNames.has(identifier)) {
        const assertion = identifier as Assertion;

        const nodes = assertions.get(assertion) ?? new Set<ts.CallExpression>();

        nodes.add(node);

        assertions.set(assertion, nodes);
      }
    }

    ts.forEachChild(node, walkNodes);
  }

  for (const sourceFile of program.getSourceFiles()) {
    walkNodes(sourceFile);
  }

  let assertionCount = 0;
  assertions.forEach((nodes) => {
    assertionCount += nodes.size;
  });

  return { assertions, assertionCount };
}

/**
 * Loop over all the error assertion nodes and convert them to a location map.
 *
 * @param assertions - Assertion map.
 */
export function parseErrorAssertionToLocation(
  assertions: Map<Assertion, Set<ts.CallExpression>>
): Map<Location, ExpectedError> {
  const nodes = assertions.get(Assertion.EXPECT_ERROR);

  const expectedErrors = new Map<Location, ExpectedError>();

  if (!nodes) {
    // Bail out if we don't have any error nodes
    return expectedErrors;
  }

  // Iterate over the nodes and add the node range to the map
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
