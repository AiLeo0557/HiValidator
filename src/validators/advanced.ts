import { ValidationError } from "../core/error";

export class ValidationChain<T> {
  private validators: Array<(value: unknown) => boolean> = [];

  constructor(private value: unknown) { }

  check(validator: (value: unknown) => boolean, message?: string) {
    this.validators.push(v => {
      if (!validator(v)) throw new ValidationError(message || "Validation failed");
      return true;
    });
    return this;
  }

  validate(): T {
    for (const validator of this.validators) {
      validator(this.value);
    }
    return this.value as T;
  }
}

export const chain = <T>(value: unknown) => new ValidationChain<T>(value);