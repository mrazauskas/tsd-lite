/**
 * Asserts that the type of `expression` is assignable to type `T`.
 */
export declare function expectAssignable<T>(expression: unknown): void;

/**
 * Asserts that the type of `expression` is not assignable to type `T`.
 */
export declare function expectNotAssignable<T>(expression: unknown): void;

/**
 * Asserts that the type of `expression` is identical to type `T`.
 */
export declare function expectType<T>(expression: unknown): void;

/**
 * Asserts that the type of `expression` is not identical to type `T`.
 */
export declare function expectNotType<T>(expression: unknown): void;

/**
 * Asserts the `expression` has a type error.
 */
export declare function expectError(value: unknown): void;
