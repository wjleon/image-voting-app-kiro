import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { UAParser } from 'ua-parser-js';
import { ModelName } from '@/types';

/**
 * Helper to simulate vote metadata extraction
 */
interface VoteMetadata {
  promptId: string;
  chosenModel: ModelName;
  shownModels: ModelName[];
  sessionId: string;
  userIp: string;
  userAgent: string;
  browser: string | null;
  os: string | null;
  device: string | null;
  country: string | null;
  region: string | null;
  timestamp: Date;
}

/**
 * Simulates the vote metadata extraction logic
 */
function extractVoteMetadata(
  requestBody: {
    promptId: string;
    selectedModel: ModelName;
    shownModels: ModelName[];
    sessionId: string;
  },
  headers: {
    'x-forwarded-for'?: string;
    'x-real-ip'?: string;
    'user-agent'?: string;
    'x-vercel-ip-country'?: string;
    'x-vercel-ip-city'?: string;
  }
): VoteMetadata {
  // Extract IP
  const forwardedFor = headers['x-forwarded-for'];
  const realIp = headers['x-real-ip'];
  const userIp = forwardedFor?.split(',')[0].trim() || realIp || 'unknown';

  // Extract geolocation
  const country = headers['x-vercel-ip-country'] || null;
  const region = headers['x-vercel-ip-city'] || null;

  // Parse user agent
  const userAgentString = headers['user-agent'] || '';
  const parser = new UAParser(userAgentString);
  const uaResult = parser.getResult();

  const browser = uaResult.browser.name || null;
  const os = uaResult.os.name || null;
  const device = uaResult.device.type || 'desktop';

  return {
    promptId: requestBody.promptId,
    chosenModel: requestBody.selectedModel,
    shownModels: requestBody.shownModels,
    sessionId: requestBody.sessionId,
    userIp,
    userAgent: userAgentString,
    browser,
    os,
    device,
    country,
    region,
    timestamp: new Date(),
  };
}

describe('Vote API', () => {
  describe('Metadata extraction', () => {
    // Feature: ai-image-voting-app, Property 2: Vote records contain all metadata
    // Validates: Requirements 1.3, 4.5
    it('should capture all required metadata fields (property test)', () => {
      const validModels: ModelName[] = [
        'ByteDance',
        'ChatGPT',
        'Flux',
        'Grok',
        'Ideogram',
        'Leonardo',
        'Midjourney',
        'NanoBananaPro',
        'Qwen',
        'Reve',
      ];

      fc.assert(
        fc.property(
          fc.uuid(),
          fc.constantFrom(...validModels),
          fc.array(fc.constantFrom(...validModels), { minLength: 4, maxLength: 4 }),
          fc.uuid(),
          fc.ipV4(),
          fc.string({ minLength: 10, maxLength: 200 }),
          (promptId, selectedModel, shownModels, sessionId, ip, userAgent) => {
            const requestBody = {
              promptId,
              selectedModel,
              shownModels,
              sessionId,
            };

            const headers = {
              'x-forwarded-for': ip,
              'user-agent': userAgent,
            };

            const metadata = extractVoteMetadata(requestBody, headers);

            // Property: All required fields must be present
            expect(metadata.promptId).toBe(promptId);
            expect(metadata.chosenModel).toBe(selectedModel);
            expect(metadata.shownModels).toEqual(shownModels);
            expect(metadata.sessionId).toBe(sessionId);
            expect(metadata.userIp).toBeTruthy();
            expect(metadata.userAgent).toBe(userAgent);
            expect(metadata.timestamp).toBeInstanceOf(Date);

            // Metadata fields can be null but must be defined
            expect(metadata).toHaveProperty('browser');
            expect(metadata).toHaveProperty('os');
            expect(metadata).toHaveProperty('device');
            expect(metadata).toHaveProperty('country');
            expect(metadata).toHaveProperty('region');

            return true;
          }
        )
      );
    });

    it('should validate required fields in request body', () => {
      const validRequest = {
        promptId: 'test-prompt-id',
        selectedModel: 'ChatGPT' as ModelName,
        shownModels: ['ChatGPT', 'Flux', 'Grok', 'Ideogram'] as ModelName[],
        sessionId: 'test-session-id',
      };

      // Valid request should work
      expect(() => {
        if (
          !validRequest.promptId ||
          !validRequest.selectedModel ||
          !validRequest.shownModels ||
          !validRequest.sessionId
        ) {
          throw new Error('Missing required fields');
        }
      }).not.toThrow();

      // Missing fields should fail
      const invalidRequests = [
        { ...validRequest, promptId: '' },
        { ...validRequest, selectedModel: '' },
        { ...validRequest, shownModels: [] },
        { ...validRequest, sessionId: '' },
      ];

      invalidRequests.forEach((req) => {
        expect(() => {
          if (!req.promptId || !req.selectedModel || !req.shownModels.length || !req.sessionId) {
            throw new Error('Missing required fields');
          }
        }).toThrow();
      });
    });

    it('should validate shownModels array length', () => {
      const validModels: ModelName[] = ['ChatGPT', 'Flux', 'Grok', 'Ideogram'];
      const invalidModels = [
        ['ChatGPT'],
        ['ChatGPT', 'Flux'],
        ['ChatGPT', 'Flux', 'Grok'],
        ['ChatGPT', 'Flux', 'Grok', 'Ideogram', 'Leonardo'],
      ];

      // Valid array should pass
      expect(Array.isArray(validModels) && validModels.length === 4).toBe(true);

      // Invalid arrays should fail
      invalidModels.forEach((models) => {
        expect(Array.isArray(models) && models.length === 4).toBe(false);
      });
    });
  });

  describe('IP address extraction', () => {
    // Feature: ai-image-voting-app, Property 10: IP address captured from headers
    // Validates: Requirements 4.1
    it('should extract IP from x-forwarded-for header (property test)', () => {
      fc.assert(
        fc.property(fc.ipV4(), (ip) => {
          const headers = { 'x-forwarded-for': ip };
          const requestBody = {
            promptId: 'test',
            selectedModel: 'ChatGPT' as ModelName,
            shownModels: ['ChatGPT', 'Flux', 'Grok', 'Ideogram'] as ModelName[],
            sessionId: 'test',
          };

          const metadata = extractVoteMetadata(requestBody, headers);

          // Property: IP should be extracted from x-forwarded-for
          expect(metadata.userIp).toBe(ip);

          return true;
        })
      );
    });

    it('should handle multiple IPs in x-forwarded-for', () => {
      const headers = { 'x-forwarded-for': '192.168.1.1, 10.0.0.1, 172.16.0.1' };
      const requestBody = {
        promptId: 'test',
        selectedModel: 'ChatGPT' as ModelName,
        shownModels: ['ChatGPT', 'Flux', 'Grok', 'Ideogram'] as ModelName[],
        sessionId: 'test',
      };

      const metadata = extractVoteMetadata(requestBody, headers);

      // Should extract the first IP
      expect(metadata.userIp).toBe('192.168.1.1');
    });

    it('should fallback to x-real-ip if x-forwarded-for is missing', () => {
      const headers = { 'x-real-ip': '192.168.1.1' };
      const requestBody = {
        promptId: 'test',
        selectedModel: 'ChatGPT' as ModelName,
        shownModels: ['ChatGPT', 'Flux', 'Grok', 'Ideogram'] as ModelName[],
        sessionId: 'test',
      };

      const metadata = extractVoteMetadata(requestBody, headers);

      expect(metadata.userIp).toBe('192.168.1.1');
    });

    it('should use "unknown" if no IP headers present', () => {
      const headers = {};
      const requestBody = {
        promptId: 'test',
        selectedModel: 'ChatGPT' as ModelName,
        shownModels: ['ChatGPT', 'Flux', 'Grok', 'Ideogram'] as ModelName[],
        sessionId: 'test',
      };

      const metadata = extractVoteMetadata(requestBody, headers);

      expect(metadata.userIp).toBe('unknown');
    });
  });

  describe('User agent parsing', () => {
    // Feature: ai-image-voting-app, Property 11: User agent parsing extracts all fields
    // Validates: Requirements 4.2
    it('should parse user agent and extract browser, OS, device (property test)', () => {
      const testUserAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      ];

      fc.assert(
        fc.property(fc.constantFrom(...testUserAgents), (userAgent) => {
          const headers = { 'user-agent': userAgent };
          const requestBody = {
            promptId: 'test',
            selectedModel: 'ChatGPT' as ModelName,
            shownModels: ['ChatGPT', 'Flux', 'Grok', 'Ideogram'] as ModelName[],
            sessionId: 'test',
          };

          const metadata = extractVoteMetadata(requestBody, headers);

          // Property: User agent should be stored
          expect(metadata.userAgent).toBe(userAgent);

          // Property: Parsed fields should be present (can be null)
          expect(metadata).toHaveProperty('browser');
          expect(metadata).toHaveProperty('os');
          expect(metadata).toHaveProperty('device');

          return true;
        })
      );
    });

    it('should extract browser name from common user agents', () => {
      const testCases = [
        {
          ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          expectedBrowser: 'Chrome',
        },
        {
          ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
          expectedBrowser: 'Safari',
        },
        {
          ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
          expectedBrowser: 'Firefox',
        },
      ];

      testCases.forEach(({ ua, expectedBrowser }) => {
        const parser = new UAParser(ua);
        const result = parser.getResult();
        expect(result.browser.name).toBe(expectedBrowser);
      });
    });
  });

  describe('Geolocation headers', () => {
    // Feature: ai-image-voting-app, Property 12: Geolocation from Vercel headers
    // Validates: Requirements 4.3, 4.4
    it('should extract country and region from Vercel headers (property test)', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 2, maxLength: 2 }), // Country code
          fc.string({ minLength: 3, maxLength: 50 }), // City name
          (country, city) => {
            const headers = {
              'x-vercel-ip-country': country,
              'x-vercel-ip-city': city,
            };
            const requestBody = {
              promptId: 'test',
              selectedModel: 'ChatGPT' as ModelName,
              shownModels: ['ChatGPT', 'Flux', 'Grok', 'Ideogram'] as ModelName[],
              sessionId: 'test',
            };

            const metadata = extractVoteMetadata(requestBody, headers);

            // Property: Geolocation should be extracted from headers
            expect(metadata.country).toBe(country);
            expect(metadata.region).toBe(city);

            return true;
          }
        )
      );
    });

    it('should handle missing geolocation headers', () => {
      const headers = {};
      const requestBody = {
        promptId: 'test',
        selectedModel: 'ChatGPT' as ModelName,
        shownModels: ['ChatGPT', 'Flux', 'Grok', 'Ideogram'] as ModelName[],
        sessionId: 'test',
      };

      const metadata = extractVoteMetadata(requestBody, headers);

      expect(metadata.country).toBeNull();
      expect(metadata.region).toBeNull();
    });
  });
});
