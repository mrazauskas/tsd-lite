# tsd-lite

> Test your TypeScript types easily.

[![version](https://img.shields.io/npm/v/tsd-lite.svg)](https://npmjs.com/package/tsd-lite)
[![license](https://img.shields.io/github/license/mrazauskas/tsd-lite.svg)](https://github.com/mrazauskas/tsd-lite/blob/main/LICENSE.md)

This is a lighter version of [tsd](https://npmjs.com/package/tsd). Slightly reworked codebase allows `tsd-lite` to be a tool which simply tests your types.

## Motivation

While `tsd` suites perfectly for JavaScript libraries which declare their types in `.d.ts` files, its usage with monorepos written in TypeScript may become [cumbersome](https://github.com/SamVerschueren/tsd/issues/32). `tsd-light` is an attempt to address these and similar issues.

## Differences from `tsd`

- `tsd-lite` performs only type testing without any additional checks or rules.
- Includes only type related assertions: `expectAssignable`, `expectDeprecated`, `expectType` and their counterparts. The `printType` helper is removed.
- Comes with no default compiler options.
- Reads TypeScript compiler options from the nearest `tsconfig.json` for each test file (does not read options from `package.json`).
- `tsd-lite` is optionally `strict`. You should add `"strict": true` to the nearest `tsconfig.json` (it can be project or test specific) to use strict assertions.
- [`@tsd/typescript`](https://npmjs.com/package/@tsd/typescript) package is moved to peer dependencies.
- `tsd-lite` allows only programmatic [usage](#usage).

## Install

```bash
yarn add -D tsd-lite @tsd/typescript
```

Remember to install `@tsd/typescript`. It is a required peer dependency.

## Usage

This library is intended for programmatic use only.

```ts
import tsdLite from "tsd-lite";

const { assertionCount, diagnostics } = tsdLite(
  "/absolute/path/to/testFile.test.ts"
);
```

## API Reference

### `tsdLite(testPath: string)`

The exported function takes fully resolved path to a test file as an argument and returns an object:

```ts
assertionCount: number;
diagnostics: {
  file: ts.SourceFile;
  messageText: string | ts.DiagnosticMessageChain;
  start: number;
}
```

## License

MIT © Sam Verschueren
