import { ValidationError } from "./error";

type ErrorMessage<T> = string | ((value: unknown, context: ValidationContext) => string);

interface ValidationContext {
  path: Array<string | number>;
  errors: ValidationError[];
}

export function createValidator<T>(
  condition: (value: unknown, context: ValidationContext) => value is T,
  errorMessage?: ErrorMessage<T>
) {
  return function validate(
    value: unknown,
    context: ValidationContext = { path: [], errors: [] }
  ): value is T {
    try {
      if (condition(value, context)) return true;

      const message = typeof errorMessage === 'function'
        ? errorMessage(value, context)
        : errorMessage || `Validation failed at path: ${context.path.join('.')}`;

      throw new ValidationError(message, {
        path: [...context.path],
        value
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        context.errors.push(error);
      }
      throw error;
    }
  };
}