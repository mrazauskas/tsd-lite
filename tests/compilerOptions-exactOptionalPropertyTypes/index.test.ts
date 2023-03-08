import { expectError } from "../../";
import { OptionalProperty, setWithOptionalProperty } from ".";

expectError(() => {
  const obj: OptionalProperty = {
    requiredProp: "required",
    optionalProp: undefined,
  };

  console.log(obj);
});

expectError(
  setWithOptionalProperty({
    requiredProp: "required",
    optionalProp: undefined,
  })
);

const obj: OptionalProperty = { requiredProp: "required" };

expectError((obj.optionalProp = undefined));
