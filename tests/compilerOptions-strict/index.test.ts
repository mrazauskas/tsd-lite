import { expectType } from "../../";
import aboveZero from ".";

expectType<number>(aboveZero(1));

declare const loggedInUsername: string;

const users = [
  { name: "Oby", age: 12 },
  { name: "Heera", age: 32 },
];

const loggedInUser = users.find((u) => u.name === loggedInUsername);

expectType<number>(loggedInUser.age);
