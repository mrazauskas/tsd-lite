/**
 * Check that the type of `value` is identical to type `T`.
 *
 * @param value - Value that should be identical to type `T`.
 */
export declare function expectType<T>(value: unknown): void;

/**
 * Check that the type of `value` is not identical to type `T`.
 *
 * @param value - Value that should be identical to type `T`.
 */
export declare function expectNotType<T>(value: unknown): void;

/**
 * Check that the type of `value` is assignable to type `T`.
 *
 * @param value - Value that should be assignable to type `T`.
 */
export declare function expectAssignable<T>(value: unknown): void;

/**
 * Check that the type of `value` is not assignable to type `T`.
 *
 * @param value - Value that should not be assignable to type `T`.
 */
export declare function expectNotAssignable<T>(value: unknown): void;

/**
 * Assert the value to throw an argument error.
 *
 * @param value - Value that should be checked.
 */
export declare function expectError<T = unknown>(value: T): void;

/**
 * Assert that the `expression` provided is marked as `@deprecated`.
 *
 * @param expression - Expression that should be marked as `@deprecated`.
 */
export declare function expectDeprecated(expression: unknown): void;

/**
 * Assert that the `expression` provided is not marked as `@deprecated`.
 *
 * @param expression - Expression that should not be marked as `@deprecated`.
 */
export declare function expectNotDeprecated(expression: unknown): void;
