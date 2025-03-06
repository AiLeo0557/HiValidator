import { describe, expect, test } from 'vitest';
import { validateObject } from '../src/validators/objects';
import { ValidationError } from '../src/core/error';
import { checkString } from '../src/validators/primitives';
import { checkNumber } from '../src/validators/primitives';

describe('objects', () => {
  test('validateObject', () => {
    const userSchema = validateObject({
      name: checkString.withMessage('Name must be a string'),
      age: checkNumber.withMessage(v => `Age must be number, got ${typeof v}`)
    });
    const context = { path: [], errors: [] }
    const validateUser = (data: unknown) => {
      try {
        return userSchema(data, context);
      } catch (error) {
        if (error instanceof ValidationError) {
          console.error(`Validation error at ${error.path.join('.')}: ${error.message}`);
        }
        return false;
      }
    };
    expect(validateUser({ name: 'John', age: '30' })).toBe(false);
  });
})