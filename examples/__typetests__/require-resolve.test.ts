import { expectError, expectType } from "../../";

// Expected 1-2 arguments
expectError(require.resolve());

// Returns a value of type 'string'
expectType<string>(require.resolve("tsd-lite"));
