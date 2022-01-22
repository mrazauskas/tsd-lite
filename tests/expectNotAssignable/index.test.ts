/* eslint-disable @typescript-eslint/no-explicit-any */

import { expectNotAssignable } from "../../";
import concat from ".";

expectNotAssignable<string | number>(concat("foo", "bar"));
expectNotAssignable<any>(concat("foo", "bar"));

expectNotAssignable<boolean>(concat("unicorn", "rainbow"));
expectNotAssignable<symbol>(concat("unicorn", "rainbow"));

type T2 = { a: { b: 1 } };
expectNotAssignable<T2>({ a: { b: 1 } });
