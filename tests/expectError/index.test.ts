import { expectError } from "../../";
import {
  default as one,
  atLeastOne,
  foo,
  getFoo,
  HasKey,
  hasProperty,
  MyClass,
  Options,
  triggerSuggestion,
} from ".";
import { Foo } from "./classes";
import gOne, { two as gTwo } from "./generics";
import fOne, { fTwo, fThree } from "./functions";

expectError<string>(1);
expectError<string>("fo");

expectError((foo.bar = "quux"));
expectError(foo.quux);

// Ignore errors in deeply nested blocks too
try {
  if (one(1, 2)) {
    expectError((foo.bar = "quux"));
    expectError(foo.quux);
  }
} catch {
  throw new Error("Err");
}

expectError(hasProperty({ name: 1 }));

expectError(one(1));
expectError(one(1, 2, 3));
expectError({} as Options);

expectError(atLeastOne());

expectError(getFoo({ bar: 1 } as HasKey<"bar">));

const bar = 1;
expectError(bar());
expectError(new bar());

expectError(MyClass());

// 'new' expression, whose target lacks a construct signature, implicitly has an 'any' type.
expectError(new hasProperty({ name: "foo" }));

expectError(() => {
  triggerSuggestion.fooOrBar = "fOoo";
});

// classes

const numberFoo = new Foo<number>();

expectError(numberFoo.bar());

expectError(
  class extends Foo<string> {
    bar(): void {
      return;
    }
  }
);

expectError(
  class extends Foo<string> {
    override foo(): void {
      return;
    }
  }
);

// generics

expectError(gOne(true, true));

expectError(gOne<number>(1, 2));

expectError(gTwo<number, string>(1, "bar"));

// functions

expectError(fOne(true, true));
expectError(fOne("foo", "bar"));

expectError(fTwo("foo", "bar"));

// Produces multiple type checker errors in a single `expectError` assertion
expectError(fThree(["a", "bad"]));
