import { expectError, expectType } from "../../";
import one from ".";

expectType<string>(await one("foo", "bar"));
expectType<Promise<string>>(one("foo", "bar"));

expectType<number>(await one(1, 2));
expectType<Promise<number>>(one(1, 2));

expectError(await one(true, false));
