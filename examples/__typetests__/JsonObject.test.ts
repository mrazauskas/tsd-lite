import { expectAssignable, expectNotAssignable } from "../../";
import type { JsonObject } from "../JsonObject.js";

expectAssignable<JsonObject>({
  caption: "test",
  count: 100,
  isTest: true,
  location: { name: "test", start: [1, 2], valid: false, x: 10, y: 20 },
  values: [0, 10, 20, { x: 1, y: 2 }, true, "test", ["a", "b"]],
});

expectNotAssignable<JsonObject>({
  filter: () => {},
});
