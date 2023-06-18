import { expectType, expectNotType } from "../../";
import type { MethodLikeKeys } from "../MethodLikeKeys.js";

interface SomeInterface {
  propertyA?: number | undefined;
  propertyB?: number;
  propertyC: number | undefined;
  propertyD: string;

  methodA?: ((a: boolean) => void) | undefined;
  methodB: (b: string) => boolean;
}

declare const interfaceMethods: MethodLikeKeys<SomeInterface>;

expectType<"methodA" | "methodB">(interfaceMethods);
expectNotType<"methodA" | "methodB" | "propertyA">(interfaceMethods);
