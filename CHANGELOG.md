# Changelog

## [0.5.6] - 2022-06-30

_Maintenance release: update `CHANGELOG.md`, `README.md` and `package.json`._

## [0.5.5] - 2022-06-30

_Deprecated: missing build files._

## [0.5.4] - 2022-05-16

### Fixed

- Expose `TsdResult` type ([#47](https://github.com/mrazauskas/tsd-lite/pull/47))

## [0.5.3] - 2022-02-12

### Fixed

- Add `ts2366` to the list of expected errors ([#24](https://github.com/mrazauskas/tsd-lite/pull/24))

## [0.5.2] - 2022-02-09

### Fixed

- Add `ts2542` to the list of expected errors ([#23](https://github.com/mrazauskas/tsd-lite/pull/23))

## [0.5.1] - 2022-02-05

### Fixed

- Add `ts2707` to the list of expected errors ([#20](https://github.com/mrazauskas/tsd-lite/pull/20))

## [0.5.0] - 2022-02-04

### Fixed

- **Breaking:** Add assertion logic for `expectAssignable` and `expectType` assertions ([#17](https://github.com/mrazauskas/tsd-lite/pull/17))

## [0.4.1] - 2022-01-17

### Fixed

- Resolve compiler options correctly if `tsconfig.json` is not found ([#16](https://github.com/mrazauskas/tsd-lite/pull/16))

## [0.4.0] - 2022-01-17

### Changed

- **Breaking:** Do not add flattened `message` to `tsdResults` object ([#14](https://github.com/mrazauskas/tsd-lite/pull/14))
- **Breaking:** Throw error (instead of returning `tsdErrors`) ([#13](https://github.com/mrazauskas/tsd-lite/pull/13))

### Fixed

- Skip declaration files while extracting assertions ([#15](https://github.com/mrazauskas/tsd-lite/pull/15))

## [0.3.0] - 2022-01-14

### Changed

- **Breaking:** Do not silence diagnostics without location
- **Breaking:** Do not silence diagnostics for files from `node_modules` directories

## [0.2.0] - 2022-01-12

### Changed

- **Breaking:** Reshape members of the returned object ([#11](https://github.com/mrazauskas/tsd-lite/pull/11))
- **Breaking:** Return `configDiagnostics` alongside with `tsdResults` ([#7](https://github.com/mrazauskas/tsd-lite/pull/7))
- **Breaking:** Return `tsdResult` instead of `diagnostics` ([#6](https://github.com/mrazauskas/tsd-lite/pull/6), [#5](https://github.com/mrazauskas/tsd-lite/pull/5))

### Fixed

- Fail early if syntax errors are found ([#10](https://github.com/mrazauskas/tsd-lite/pull/10))

## [0.1.0] - 2022-01-04

_First release._

[0.5.6]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.5.6
[0.5.5]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.5.5
[0.5.4]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.5.4
[0.5.3]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.5.3
[0.5.2]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.5.2
[0.5.1]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.5.1
[0.5.0]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.5.0
[0.4.1]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.4.1
[0.4.0]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.4.0
[0.3.0]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.3.0
[0.2.0]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.2.0
[0.1.0]: https://github.com/mrazauskas/tsd-lite/releases/tag/v0.1.0
