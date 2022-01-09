import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("expectAssignable", () => {
  const { diagnostics } = tsd(fixturePath("expectAssignable"));

  const normalizedDiagnostics = diagnostics.map((diagnostic) => {
    const { character, line } = diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start
    );
    return {
      character: character + 1,
      line: line + 1,
      message: diagnostic.messageText,
    };
  });

  expect(normalizedDiagnostics).toMatchObject([
    {
      message:
        "Argument of type 'string' is not assignable to parameter of type 'boolean'.",
      line: 10,
      character: 27,
    },
  ]);
});

test("expectNotAssignable", () => {
  const { diagnostics } = tsd(fixturePath("expectNotAssignable"));

  const normalizedDiagnostics = diagnostics.map((diagnostic) => {
    const { character, line } = diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start
    );
    return {
      character: character + 1,
      line: line + 1,
      message: diagnostic.messageText,
    };
  });

  expect(normalizedDiagnostics).toMatchObject([
    {
      message:
        "Argument of type 'string' is assignable to parameter of type 'string | number'.",
      line: 6,
      character: 1,
    },
    {
      message:
        "Argument of type 'string' is assignable to parameter of type 'any'.",
      line: 7,
      character: 1,
    },
  ]);
});
