import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { validateEnv, getEnv } from '../lib/env';

/**
 * Property-Based Tests for Environment Variable Reading
 * 
 * **Feature: ai-image-voting-app, Property 22: Environment variables are read correctly**
 * **Validates: Requirements 9.4**
 * 
 * These tests verify that environment variable validation and reading
 * works correctly across various inputs and configurations.
 */

describe('Environment Variable Validation', () => {
  // Store original env vars
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original environment
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('Property 22: Environment variables are read correctly', () => {
    it('should validate that DATABASE_URL is required', () => {
      // Remove DATABASE_URL
      delete process.env.DATABASE_URL;
      process.env.ADMIN_PASSWORD = 'test-password';

      // Should throw when validating
      expect(() => {
        validateEnv();
      }).toThrow(/DATABASE_URL/);
    });

    it('should validate that ADMIN_PASSWORD is required', () => {
      // Remove ADMIN_PASSWORD
      process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
      delete process.env.ADMIN_PASSWORD;

      // Should throw when validating
      expect(() => {
        validateEnv();
      }).toThrow(/ADMIN_PASSWORD/);
    });

    it('should accept valid PostgreSQL connection strings', () => {
      fc.assert(
        fc.property(
          fc.record({
            user: fc.stringMatching(/^[a-z0-9_]+$/),
            password: fc.stringMatching(/^[a-zA-Z0-9_!@#$%^&*]+$/),
            host: fc.oneof(fc.constant('localhost'), fc.domain()),
            port: fc.integer({ min: 1024, max: 65535 }),
            database: fc.stringMatching(/^[a-z0-9_]+$/),
          }),
          fc.string({ minLength: 8, maxLength: 32 }),
          ({ user, password, host, port, database }, adminPassword) => {
            // Set valid environment variables
            process.env.DATABASE_URL = `postgresql://${user}:${password}@${host}:${port}/${database}`;
            process.env.ADMIN_PASSWORD = adminPassword;

            // Should not throw
            expect(() => {
              validateEnv();
            }).not.toThrow();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle postgres:// and postgresql:// prefixes', () => {
      fc.assert(
        fc.property(
          fc.oneof(fc.constant('postgres://'), fc.constant('postgresql://')),
          fc.string({ minLength: 8 }),
          (prefix, adminPassword) => {
            process.env.DATABASE_URL = `${prefix}user:pass@localhost:5432/db`;
            process.env.ADMIN_PASSWORD = adminPassword;

            // Should not throw
            expect(() => {
              validateEnv();
            }).not.toThrow();
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should provide default for NODE_ENV when not set', () => {
      process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
      process.env.ADMIN_PASSWORD = 'test-password';
      delete process.env.NODE_ENV;

      // Should return default
      expect(getEnv('NODE_ENV')).toBe('development');
    });

    it('should preserve NODE_ENV when set', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.constant('development'),
            fc.constant('production'),
            fc.constant('test')
          ),
          (nodeEnv) => {
            process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
            process.env.ADMIN_PASSWORD = 'test-password';
            process.env.NODE_ENV = nodeEnv;

            // Should return the set value
            expect(getEnv('NODE_ENV')).toBe(nodeEnv);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle multiple missing required variables', () => {
      // Remove all required variables
      delete process.env.DATABASE_URL;
      delete process.env.ADMIN_PASSWORD;

      // Should throw
      expect(() => {
        validateEnv();
      }).toThrow(/Missing required environment variables/);
    });

    it('should validate getEnv function returns correct values', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 8, maxLength: 32 }),
          (adminPassword) => {
            process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
            process.env.ADMIN_PASSWORD = adminPassword;
            
            // Should return the correct values
            expect(getEnv('DATABASE_URL')).toBe('postgresql://localhost:5432/test');
            expect(getEnv('ADMIN_PASSWORD')).toBe(adminPassword);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle optional variables correctly', () => {
      process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
      process.env.ADMIN_PASSWORD = 'test-password';
      delete process.env.NODE_ENV;
      
      // Should return default for NODE_ENV
      expect(getEnv('NODE_ENV')).toBe('development');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string values as missing', () => {
      process.env.DATABASE_URL = '';
      process.env.ADMIN_PASSWORD = 'test-password';

      expect(() => {
        validateEnv();
      }).toThrow(/DATABASE_URL/);
    });

    it('should handle whitespace-only values as valid (trimming is caller responsibility)', () => {
      process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
      process.env.ADMIN_PASSWORD = '   ';

      // Should not throw (validation doesn't trim)
      expect(() => {
        validateEnv();
      }).not.toThrow();
    });

    it('should handle very long passwords', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 100, maxLength: 500 }),
          (longPassword) => {
            process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
            process.env.ADMIN_PASSWORD = longPassword;

            expect(() => {
              validateEnv();
            }).not.toThrow();
          }
        ),
        { numRuns: 50 }
      );
    });
  });
});
