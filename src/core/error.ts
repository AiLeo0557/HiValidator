export class ValidationError extends Error {
  readonly path: Array<string | number>;
  readonly value: unknown;

  constructor(
    message: string,
    options: {
      path?: Array<string | number>;
      value?: unknown;
    } = {}
  ) {
    super(message);
    this.name = 'ValidationError';
    this.path = options.path || [];
    this.value = options.value;
  }
}