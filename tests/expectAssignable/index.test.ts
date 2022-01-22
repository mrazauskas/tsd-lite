/* eslint-disable @typescript-eslint/no-explicit-any */

import { expectAssignable } from "../../";
import concat from ".";

expectAssignable<string | number>(concat("foo", "bar"));
expectAssignable<string | number>(concat(1, 2));
expectAssignable<any>(concat(1, 2));

expectAssignable<boolean>(concat("unicorn", "rainbow"));

type T2 = { a: { b: 1 } };
expectAssignable<T2>({ a: { b: 1 } });
