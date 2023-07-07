# tsd-lite

> Test your TypeScript types easily.

[![version](https://img.shields.io/npm/v/tsd-lite)](https://npmjs.com/package/tsd-lite)
[![license](https://img.shields.io/github/license/mrazauskas/tsd-lite)](https://github.com/mrazauskas/tsd-lite/blob/main/LICENSE.md)
[![node-ci](https://img.shields.io/github/actions/workflow/status/mrazauskas/tsd-lite/node-ci.yml?label=CI)](https://github.com/mrazauskas/tsd-lite/actions/workflows/node-ci.yml)

This is a lighter version of [`tsd`](https://npmjs.com/package/tsd). Slightly reworked codebase allows `tsd-lite` to be a tool which simply tests your types.

## Motivation

While `tsd` suites perfectly for JavaScript libraries which declare their types in `.d.ts` files, its usage with monorepos written in TypeScript may become [cumbersome](https://github.com/SamVerschueren/tsd/issues/32). `tsd-lite` is an attempt to address these and similar issues.

## Differences from `tsd`

- `tsd-lite` performs only type testing without any additional checks or rules.
- Exposes only general type related assertions: `expectAssignable`, `expectNotAssignable`, `expectError`, `expectType` and `expectNotType`. All other APIs (like `expectNever`, `expectDeprecated`, `expectDocCommentIncludes` and `printType`) are not implement.
- Comes with no default compiler options.
- Reads TypeScript compiler options from the nearest `tsconfig.json` for each test file (does not read options from `package.json`).
- `tsd-lite` is optionally `strict`. You should add `"strict": true` to the nearest `tsconfig.json` (it can be project or test specific) to use strict assertions.
- [`@tsd/typescript`](https://npmjs.com/package/@tsd/typescript) package is moved to peer dependencies.
- `tsd-lite` allows only programmatic usage. For an integration with Jest see [`jest-runner-tsd`](https://github.com/jest-community/jest-runner-tsd), if you prefer standalone CLI implementation check [`tsd-lite-cli`](https://github.com/asd-xiv/tsd-lite-cli).

## Install

```bash
yarn add -D tsd-lite @tsd/typescript
# or
npm install -D tsd-lite @tsd/typescript
```

Remember to install `@tsd/typescript`. It is a required peer dependency.

## Assertions

The library provides the following type testing assertions.

### expectAssignable&lt;T&gt;(expression)

Asserts that the type of `expression` is assignable to type `T`.

### expectNotAssignable&lt;T&gt;(expression)

Asserts that the type of `expression` is not assignable to type `T`.

```ts
// JsonObject.ts
type JsonValue = string | number | boolean | JsonObject | Array<JsonValue>;

export interface JsonObject {
  [key: string]: JsonValue;
}
```

```ts
// __typetests__/JsonObject.test.ts
import { expectAssignable, expectNotAssignable } from "tsd-lite";
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
```

### expectType&lt;T&gt;(expression)

Asserts that the type of `expression` is identical to type `T`.

### expectNotType&lt;T&gt;(expression)

Asserts that the type of `expression` is not identical to type `T`.

```ts
// MethodLikeKeys.ts
type FunctionLike = (...args: any) => any;

export type MethodLikeKeys<T> = keyof {
  [K in keyof T as Required<T>[K] extends FunctionLike ? K : never]: T[K];
};
```

```ts
// __typetests__/MethodLikeKeys.test.ts
import { expectType, expectNotType } from "tsd-lite";
import type { MethodLikeKeys } from "../MethodLikeKeys.js";

interface FixtureInterface {
  methodA?: ((a: boolean) => void) | undefined;
  methodB: (b: string) => boolean;

  propertyA?: number | undefined;
  propertyB?: number;
  propertyC: number | undefined;
  propertyD: string;
}

declare const interfaceMethods: MethodLikeKeys<FixtureInterface>;

expectType<"methodA" | "methodB">(interfaceMethods);
expectNotType<"methodA" | "methodB" | "propertyA">(interfaceMethods);
```

### expectError(expression)

Asserts the `expression` has a type error.

```ts
// __typetests__/require-resolve.test.ts
import { expectError, expectType } from "tsd-lite";

// Expected 1-2 arguments
expectError(require.resolve());

// Returns a value of type 'string'
expectType<string>(require.resolve("tsd-lite"));
```

## API Reference

The default export of the library is a function which takes fully resolved path to a test file as an argument:

```ts
import tsdLite from "tsd-lite";

const { assertionsCount, tsdResults } = tsdLite(
  "/absolute/path/to/testFile.test.ts",
);
```

It returns an object with `assertionsCount` and `tsdResults` properties:

```ts
{
  assertionsCount: number;
  tsdResults: Array<{
    messageText: string | ts.DiagnosticMessageChain;
    file?: ts.SourceFile;
    start?: number;
  }>;
}
```

`tsd-lite` will throw if the TypeScript compiler encounters an error while parsing `tsconfig.json` or finds a syntax error in the code.

## License

[MIT](https://github.com/mrazauskas/tsd-lite/blob/main/LICENSE.md)
