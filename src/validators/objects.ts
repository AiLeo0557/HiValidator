import { createValidator } from "../core/validator";

interface ObjectValidationSchema {
  [key: string]: ReturnType<typeof createValidator<any>>;
}

export function validateObject<T extends object>(
  schema: ObjectValidationSchema
) {
  return createValidator<T>((value, context): value is T => {
    if (typeof value !== 'object' || value === null) return false;

    return Object.entries(schema).every(([key, validator]) => {
      context.path.push(key);
      const result = validator((value as any)[key], context);
      context.path.pop();
      return result;
    });
  });
}