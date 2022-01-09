import { expect, test } from "@jest/globals";
import tsd from "../";
import { fixturePath } from "./utils";

test("expectDeprecated", () => {
  const { diagnostics } = tsd(fixturePath("expectDeprecated"));

  expect(diagnostics).toMatchObject([
    {
      messageText:
        "Expected '(foo: number, bar: number): number' to be marked deprecated",
      start: 141,
    },
    {
      messageText: "Expected 'Options.delimiter' to be marked deprecated",
      start: 292,
    },
    {
      messageText: "Expected 'Unicorn.RAINBOW' to be marked deprecated",
      start: 373,
    },
    {
      messageText: "Expected 'RainbowClass' to be marked deprecated",
      start: 569,
    },
  ]);
});

test("expectNotDeprecated", () => {
  const { diagnostics } = tsd(fixturePath("expectNotDeprecated"));

  expect(diagnostics).toMatchObject([
    {
      messageText:
        "Expected '(foo: string, bar: string): string' to not be marked deprecated",
      start: 104,
    },
    {
      messageText: "Expected 'Options.separator' to not be marked deprecated",
      start: 264,
    },
    {
      messageText: "Expected 'Unicorn.UNICORN' to not be marked deprecated",
      start: 353,
    },
    {
      messageText: "Expected 'UnicornClass' to not be marked deprecated",
      start: 558,
    },
  ]);
});
