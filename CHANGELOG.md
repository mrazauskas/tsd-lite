# Changelog

All notable changes to this project will be documented in this file.

### ⚠ BREAKING CHANGES

- throw error (instead of returning `tsdErrors`) if: TS compiler encountered an error while parsing `tsconfig.json`; or found a syntax error while compiling the code.

## [0.3.0](https://github.com/mrazauskas/tsd-lite/compare/v0.2.0...v0.3.0) (2022-01-14)

### ⚠ BREAKING CHANGES

- do not silence diagnostics without location
- do not silence diagnostics for files from `node_modules` directories

## [0.2.0](https://github.com/mrazauskas/tsd-lite/compare/v0.1.0...v0.2.0) (2022-01-12)

### ⚠ BREAKING CHANGES

- reshape members of the returned object (#11)
- fail early if syntax errors are found (#10)
- return `configDiagnostics` alongside with `tsdResults` (#7)
- return `tsdResult` instead of `diagnostics` (#6)
- return ts-style diagnostics (#5)

### Features

- reshape members of the returned object ([#11](https://github.com/mrazauskas/tsd-lite/issues/11)) ([46880f9](https://github.com/mrazauskas/tsd-lite/commit/46880f9bbf2c451b735284332fd32cd0cfe666e3))
- fail early if syntax errors are found ([#10](https://github.com/mrazauskas/tsd-lite/issues/10)) ([53928a7](https://github.com/mrazauskas/tsd-lite/commit/53928a77caa776258864761b1c6cc43b601cf5ae))
- return `configDiagnostics` alongside with `tsdResults` ([#7](https://github.com/mrazauskas/tsd-lite/issues/7)) ([6ab9ec2](https://github.com/mrazauskas/tsd-lite/commit/6ab9ec232e3636450168eb5b9a88c0224b5e3d94))
- return `tsdResult` instead of `diagnostics` ([#6](https://github.com/mrazauskas/tsd-lite/issues/6)) ([28c0ceb](https://github.com/mrazauskas/tsd-lite/commit/28c0ceb85c5b5399e0f24e2c58e494d932081abd))
- return ts-style diagnostics ([#5](https://github.com/mrazauskas/tsd-lite/issues/5)) ([11d60f2](https://github.com/mrazauskas/tsd-lite/commit/11d60f23e829e1cea542eb4660965c22396fbf60))

## 0.1.0 (2022-01-04)
