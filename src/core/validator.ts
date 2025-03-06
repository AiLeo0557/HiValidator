import { ValidationError } from "./error";

type ErrorMessage<T> = string | ((value: unknown, context: ValidationContext) => string);

export interface ValidationContext {
  path: Array<string | number>;
  errors: ValidationError[];
}

export interface EnhancedValidator<T> {
  (value: unknown, context?: ValidationContext): value is T;
  withMessage(message: ErrorMessage<T>): EnhancedValidator<T>;
  optional(): EnhancedValidator<T | undefined>;
}

export function createValidator<T>(
  condition: (value: unknown, context?: ValidationContext) => value is T,
  defaultMessage?: ErrorMessage<T>
): EnhancedValidator<T> {
  // 基础验证函数
  const validator = ((
    value: unknown,
    context?: ValidationContext
  ) => {
    const isValid = condition(value, context);

    if (!isValid && context) {
      // if (typeof defaultMessage === "string") {
      //   context.errors.push(new ValidationError(
      //     defaultMessage || `Validation failed for value: ${JSON.stringify(value)}`,
      //     { path: [...context.path] }
      //   ));
      // }
      const message = typeof defaultMessage === 'function'
        ? defaultMessage(value, context)
        : defaultMessage || `Validation failed at path: ${context.path.join('.')}`;
      context.errors.push(new ValidationError(message, { path: [...context.path], value }));
      throw new ValidationError(message, {
        path: [...context.path],
        value
      });
    }
    return isValid;
  }) as EnhancedValidator<T>;

  // 添加方法链支持
  validator.withMessage = (message: string) => {
    return createValidator<T>(condition, message);
  };

  validator.optional = () => {
    return createValidator<T | undefined>(
      (v): v is T | undefined => v === undefined || condition(v),
      defaultMessage
    );
  };

  return validator;
}