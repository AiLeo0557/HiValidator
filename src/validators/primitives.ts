import { createValidator } from "../core/validator";
import { isString, isNumber } from "hi-datatype-operation"
export const checkString = createValidator<string>(
  isString,
  (v) => `Expected string, got ${typeof v}`
);

export const checkNumber = createValidator<number>(
  isNumber,
  (v) => `Expected number, got ${typeof v}`
);

export const checkEmail = createValidator<string>(
  (v): v is string => checkString(v) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  "Invalid email format"
);