/**
 * Environment Variable Validation
 * 
 * This module validates that all required environment variables are present
 * and properly formatted. It should be imported early in the application
 * lifecycle to catch configuration errors before they cause runtime issues.
 */

/**
 * Required environment variables
 */
const requiredEnvVars = [
  'DATABASE_URL',
  'ADMIN_PASSWORD',
] as const;

/**
 * Optional environment variables with defaults
 */
const optionalEnvVars = {
  NODE_ENV: 'development',
} as const;

/**
 * Validates that all required environment variables are present
 * @throws Error if any required environment variable is missing
 */
export function validateEnv(): void {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((v) => `  - ${v}`).join('\n')}\n\n` +
        'Please check your .env file and ensure all required variables are set.\n' +
        'See .env.example for reference.'
    );
  }

  // Validate DATABASE_URL format
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && !dbUrl.startsWith('postgres://') && !dbUrl.startsWith('postgresql://')) {
    console.warn(
      'Warning: DATABASE_URL does not appear to be a valid PostgreSQL connection string'
    );
  }

  // Validate ADMIN_PASSWORD strength
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword && adminPassword.length < 8) {
    console.warn(
      'Warning: ADMIN_PASSWORD is less than 8 characters. Consider using a stronger password.'
    );
  }

  if (adminPassword === 'your-secure-password-here') {
    console.warn(
      'Warning: ADMIN_PASSWORD is set to the default value. Please change it to a secure password.'
    );
  }
}

/**
 * Gets an environment variable value with type safety
 * @param key - The environment variable key
 * @returns The environment variable value
 */
export function getEnv(key: keyof typeof requiredEnvVars | keyof typeof optionalEnvVars): string {
  const value = process.env[key as string];
  
  if (!value) {
    // Check if it's an optional var with a default
    if (key in optionalEnvVars) {
      return optionalEnvVars[key as keyof typeof optionalEnvVars];
    }
    throw new Error(`Environment variable ${String(key)} is not set`);
  }
  
  return value;
}

/**
 * Type-safe environment variables object
 */
export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
} as const;

// Validate environment variables on module load (only in Node.js environment and not in test)
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
  validateEnv();
}
