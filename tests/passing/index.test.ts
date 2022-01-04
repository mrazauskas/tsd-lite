import { expectError, expectType } from "../../";

interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  expectError((obj.prop = "hello"));
  return obj.prop;
}

expectType<string>(doSomething({ prop: "val" }));
