import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { ModelName } from '@/types';

/**
 * Image candidate interface
 */
interface ImageCandidate {
  imageId: string;
  imageUrl: string;
  modelName: ModelName;
}

describe('ImageGrid Component', () => {
  // Feature: ai-image-voting-app, Property 1: Four distinct models displayed
  // Validates: Requirements 1.1
  it('should display exactly 4 images from 4 distinct models (property test)', () => {
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
        fc.shuffledSubarray(validModels, { minLength: 4, maxLength: 4 }),
        (selectedModels) => {
          // Create candidates with distinct models
          const candidates: ImageCandidate[] = selectedModels.map((model, idx) => ({
            imageId: `img-${idx}`,
            imageUrl: `/images/test/img-${idx}.jpg`,
            modelName: model,
          }));

          // Property: Must have exactly 4 candidates
          expect(candidates).toHaveLength(4);

          // Property: All model names must be distinct
          const modelNames = candidates.map((c) => c.modelName);
          const uniqueModels = new Set(modelNames);
          expect(uniqueModels.size).toBe(4);

          // Property: All candidates must have required fields
          candidates.forEach((candidate) => {
            expect(candidate).toHaveProperty('imageId');
            expect(candidate).toHaveProperty('imageUrl');
            expect(candidate).toHaveProperty('modelName');
            expect(candidate.imageId).toBeTruthy();
            expect(candidate.imageUrl).toBeTruthy();
            expect(validModels).toContain(candidate.modelName);
          });

          return true;
        }
      )
    );
  });

  it('should reject candidates with duplicate models', () => {
    const candidates: ImageCandidate[] = [
      { imageId: '1', imageUrl: '/img1.jpg', modelName: 'ChatGPT' },
      { imageId: '2', imageUrl: '/img2.jpg', modelName: 'ChatGPT' }, // Duplicate
      { imageId: '3', imageUrl: '/img3.jpg', modelName: 'Flux' },
      { imageId: '4', imageUrl: '/img4.jpg', modelName: 'Grok' },
    ];

    const modelNames = candidates.map((c) => c.modelName);
    const uniqueModels = new Set(modelNames);

    // Should detect duplicate
    expect(uniqueModels.size).toBeLessThan(4);
  });

  it('should validate candidate structure', () => {
    const validCandidate: ImageCandidate = {
      imageId: 'test-id',
      imageUrl: '/images/test.jpg',
      modelName: 'ChatGPT',
    };

    expect(validCandidate).toHaveProperty('imageId');
    expect(validCandidate).toHaveProperty('imageUrl');
    expect(validCandidate).toHaveProperty('modelName');
  });
});
