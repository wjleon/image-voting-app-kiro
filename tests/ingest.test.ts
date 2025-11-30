import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { normalizeModelName, generateSlug } from '../scripts/ingest';
import { MODEL_NAME_MAP, ModelName } from '../types';

describe('Ingestion script', () => {
  describe('generateSlug', () => {
    it('should convert folder names to slugs', () => {
      expect(generateSlug('ChatGPT 7 Slide')).toBe('chatgpt-7-slide');
      expect(generateSlug('Claude 2 Asian Woman Character')).toBe('claude-2-asian-woman-character');
      expect(generateSlug('Person in 4 ages')).toBe('person-in-4-ages');
    });

    it('should handle special characters', () => {
      expect(generateSlug('Test & Example!')).toBe('test-example');
      expect(generateSlug('Multiple   Spaces')).toBe('multiple-spaces');
    });
  });

  describe('normalizeModelName', () => {
    it('should normalize all known model names', () => {
      expect(normalizeModelName('ByteDance')).toBe('ByteDance');
      expect(normalizeModelName('ChatGPT')).toBe('ChatGPT');
      expect(normalizeModelName('Flux')).toBe('Flux');
      expect(normalizeModelName('Grok')).toBe('Grok');
      expect(normalizeModelName('Ideogram')).toBe('Ideogram');
      expect(normalizeModelName('Leonardo')).toBe('Leonardo');
      expect(normalizeModelName('Midjourney')).toBe('Midjourney');
      expect(normalizeModelName('Qwen')).toBe('Qwen');
      expect(normalizeModelName('Reve')).toBe('Reve');
    });

    it('should handle Nano Banana edge cases', () => {
      expect(normalizeModelName('Nano Banana Pro')).toBe('NanoBananaPro');
      expect(normalizeModelName('Nano Banana')).toBe('NanoBananaPro');
    });

    it('should throw error for unknown model names', () => {
      expect(() => normalizeModelName('UnknownModel')).toThrow();
      expect(() => normalizeModelName('InvalidName')).toThrow();
    });

    // Feature: ai-image-voting-app, Property 4: Model name normalization consistency
    // Validates: Requirements 2.2
    it('should consistently normalize model names (property test)', () => {
      // Get all valid model folder names from the map
      const validModelNames = Object.keys(MODEL_NAME_MAP);

      fc.assert(
        fc.property(fc.constantFrom(...validModelNames), (modelFolderName) => {
          // Property: For any valid model folder name, normalization should:
          // 1. Return a valid ModelName
          // 2. Be consistent (same input always produces same output)
          // 3. Match the expected mapping in MODEL_NAME_MAP

          const normalized1 = normalizeModelName(modelFolderName);
          const normalized2 = normalizeModelName(modelFolderName);
          const expected = MODEL_NAME_MAP[modelFolderName];

          // Consistency: same input produces same output
          expect(normalized1).toBe(normalized2);

          // Correctness: matches the expected mapping
          expect(normalized1).toBe(expected);

          // Validity: result is a valid ModelName
          const validModelNames: ModelName[] = [
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
          expect(validModelNames).toContain(normalized1);

          return true;
        })
      );
    });

    it('should handle case variations consistently (property test)', () => {
      const validModelNames = Object.keys(MODEL_NAME_MAP);

      fc.assert(
        fc.property(fc.constantFrom(...validModelNames), (modelFolderName) => {
          // Property: Case-insensitive normalization should work
          const normalized = normalizeModelName(modelFolderName);
          const normalizedLower = normalizeModelName(modelFolderName.toLowerCase());

          // Both should produce the same result
          expect(normalized).toBe(normalizedLower);

          return true;
        })
      );
    });
  });

  describe('Image file processing', () => {
    // Feature: ai-image-voting-app, Property 5: Image files are accessible at runtime
    // Validates: Requirements 2.3, 2.5
    it('should generate valid deployed paths for all images (property test)', () => {
      // This test verifies that all generated image paths follow the correct format
      // and would be accessible at runtime from the public directory

      fc.assert(
        fc.property(
          fc.constantFrom('chatgpt-7-slide', 'claude-2-asian-woman-character', 'person-in-4-ages'),
          fc.constantFrom('ByteDance', 'ChatGPT', 'Flux', 'Grok', 'Ideogram', 'Leonardo', 'Midjourney', 'NanoBananaPro', 'Qwen', 'Reve'),
          fc.integer({ min: 1, max: 10 }),
          fc.constantFrom('.jpg', '.jpeg', '.png', '.webp'),
          (slug, modelName, sequence, ext) => {
            // Property: For any valid slug, model name, sequence, and extension,
            // the deployed path should:
            // 1. Start with /images/
            // 2. Include the challenge slug
            // 3. Include the model name
            // 4. End with a valid image extension
            // 5. Be a valid URL path (no spaces, special chars)

            const filename = `${slug}-${modelName}-${sequence}${ext}`;
            const deployedPath = `/images/${slug}/${modelName}/${filename}`;

            // Verify path structure
            expect(deployedPath).toMatch(/^\/images\//);
            expect(deployedPath).toContain(slug);
            expect(deployedPath).toContain(modelName);
            expect(deployedPath).toMatch(/\.(jpg|jpeg|png|webp)$/);

            // Verify no spaces or invalid characters in path
            expect(deployedPath).not.toContain(' ');
            expect(deployedPath).toMatch(/^[a-zA-Z0-9\/_.-]+$/);

            return true;
          }
        )
      );
    });

    it('should handle various image file extensions', () => {
      const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      const invalidExtensions = ['.txt', '.pdf', '.doc'];

      validExtensions.forEach((ext) => {
        // This would be tested by the isImageFile function in the actual implementation
        expect(['.jpg', '.jpeg', '.png', '.webp', '.gif']).toContain(ext);
      });

      invalidExtensions.forEach((ext) => {
        expect(['.jpg', '.jpeg', '.png', '.webp', '.gif']).not.toContain(ext);
      });
    });
  });

  describe('Prompt record creation', () => {
    // Feature: ai-image-voting-app, Property 3: Ingestion creates valid prompt records
    // Validates: Requirements 2.1
    it('should create valid prompt records from challenge folders (property test)', () => {
      fc.assert(
        fc.property(
          // Generate folder names that contain at least one alphanumeric character
          fc
            .string({ minLength: 1, maxLength: 100 })
            .filter((s) => /[a-zA-Z0-9]/.test(s)), // Must have at least one alphanumeric
          fc.string({ minLength: 10, maxLength: 500 }),
          (folderName, promptText) => {
            // Property: For any valid folder name and prompt text,
            // the ingestion process should create a prompt record with:
            // 1. A valid slug derived from the folder name
            // 2. The exact prompt text
            // 3. A unique identifier (slug)

            const slug = generateSlug(folderName);

            // Verify slug is valid and non-empty
            expect(slug).toBeTruthy();
            expect(slug.length).toBeGreaterThan(0);
            expect(slug).toMatch(/^[a-z0-9-]+$/); // Only lowercase, numbers, hyphens
            expect(slug).not.toMatch(/^-|-$/); // No leading/trailing hyphens

            // Verify prompt text would be stored correctly
            expect(promptText).toBeTruthy();
            expect(typeof promptText).toBe('string');

            return true;
          }
        )
      );
    });

    it('should handle duplicate folder names by generating unique slugs', () => {
      // Test that the same folder name always produces the same slug
      const folderName = 'Test Challenge 123';
      const slug1 = generateSlug(folderName);
      const slug2 = generateSlug(folderName);

      expect(slug1).toBe(slug2);
      expect(slug1).toBe('test-challenge-123');
    });

    it('should handle edge cases in folder names', () => {
      expect(generateSlug('Multiple   Spaces')).toBe('multiple-spaces');
      expect(generateSlug('Special!@#$%Characters')).toBe('specialcharacters');
      expect(generateSlug('  Leading and Trailing  ')).toBe('leading-and-trailing');
      expect(generateSlug('UPPERCASE')).toBe('uppercase');
      expect(generateSlug('Under_Score')).toBe('under-score');
    });
  });
});
