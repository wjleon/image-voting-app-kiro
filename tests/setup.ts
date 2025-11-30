import { beforeAll } from 'vitest';
import fc from 'fast-check';

// Configure fast-check to run 100 iterations minimum
beforeAll(() => {
  fc.configureGlobal({ numRuns: 100 });
});
