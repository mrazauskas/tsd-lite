import { expectType } from "../../";
import one from ".";
import "./nested";

expectType<string>(one("foo", "bar"));
expectType<string>(one(1, 2));
