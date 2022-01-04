import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("expectDeprecated", () => {
  const { diagnostics } = tsd(fixturePath("expectDeprecated"));

  expect(diagnostics).toMatchObject([
    {
      message:
        "Expected '(foo: number, bar: number): number' to be marked deprecated",
      line: 6,
      column: 1,
    },
    {
      message: "Expected 'Options.delimiter' to be marked deprecated",
      line: 15,
      column: 1,
    },
    {
      message: "Expected 'Unicorn.RAINBOW' to be marked deprecated",
      line: 19,
      column: 1,
    },
    {
      message: "Expected 'RainbowClass' to be marked deprecated",
      line: 34,
      column: 1,
    },
  ]);
});

test("expectNotDeprecated", () => {
  const { diagnostics } = tsd(fixturePath("expectNotDeprecated"));

  expect(diagnostics).toMatchObject([
    {
      message:
        "Expected '(foo: string, bar: string): string' to not be marked deprecated",
      line: 5,
      column: 1,
    },
    {
      message: "Expected 'Options.separator' to not be marked deprecated",
      line: 14,
      column: 1,
    },
    {
      message: "Expected 'Unicorn.UNICORN' to not be marked deprecated",
      line: 18,
      column: 1,
    },
    {
      message: "Expected 'UnicornClass' to not be marked deprecated",
      line: 33,
      column: 1,
    },
  ]);
});
