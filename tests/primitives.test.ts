import { describe, expect, test } from 'vitest';
import { checkString, checkEmail } from '../src/validators/primitives';
import { ValidationError } from '../src/core/error';

describe('primitives', () => {
  test('checkString', () => {
    // expect(checkString(123)).toBe(false);
    // expect(checkString(null)).toBe(false);
    // expect(checkString(undefined)).toBe(false);
    // expect(checkString({})).toBe(false);
    // expect(checkString([])).toBe(false);
    // expect(checkString(new Date())).toBe(false);
    const validateEmail = (input: unknown) => {
      try {
        return checkEmail(input);
      } catch (error) {
        if (error instanceof ValidationError) {
          console.error(`Error: ${error.message}`);
        }
        return false;
      }
    };
    // expect(validateEmail('hello')).toBe(false);
    // expect(validateEmail('hello@world.com')).toBe(true);
    // expect(validateEmail('hello@world')).toBe(false);
  });
})
