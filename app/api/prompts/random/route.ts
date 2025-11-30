import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { selectFairImages } from '@/lib/fairness';
import { getPromptTranslation } from '@/lib/translations';

/**
 * Response schema for random prompt endpoint
 */
interface RandomPromptResponse {
  promptId: string;
  promptSlug: string;
  promptText: string;
  candidates: Array<{
    imageId: string;
    imageUrl: string;
  }>;
}

/**
 * GET /api/prompts/random
 * Returns a random prompt with 4 fairly-selected images
 * 
 * Query parameters:
 * - exclude: Optional slug to exclude from selection
 * - locale: Optional locale for translated prompt text (defaults to 'en')
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const excludeSlug = searchParams.get('exclude');
    const locale = searchParams.get('locale') || 'en';

    // Build where clause - only select prompts with at least 4 images
    const whereClause = excludeSlug
      ? {
          slug: {
            not: excludeSlug,
          },
          images: {
            some: {}, // Has at least one image
          },
        }
      : {
          images: {
            some: {}, // Has at least one image
          },
        };

    // Get prompts with image counts
    const validPrompts = await prisma.prompt.findMany({
      where: whereClause,
      include: {
        _count: {
          select: { images: true },
        },
      },
    });

    // Filter to only prompts with 4+ images
    const promptsWithEnoughImages = validPrompts.filter((p) => p._count.images >= 4);

    if (promptsWithEnoughImages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No prompts with sufficient images available' },
        { status: 404 }
      );
    }

    // Select a random prompt from valid ones
    const randomIndex = Math.floor(Math.random() * promptsWithEnoughImages.length);
    const randomPrompt = promptsWithEnoughImages[randomIndex];

    if (!randomPrompt) {
      return NextResponse.json(
        { success: false, error: 'Failed to select random prompt' },
        { status: 500 }
      );
    }

    // Get translated prompt text
    const translatedText = await getPromptTranslation(randomPrompt.id, locale);

    // Use fairness algorithm to select 4 images
    const selectedImages = await selectFairImages(prisma, randomPrompt.id, 4);

    // Anonymize image URLs (use API endpoint to hide model names)
    const candidates = selectedImages.map((image) => ({
      imageId: image.id,
      imageUrl: `/api/image/${image.id}`,
    }));

    const response: RandomPromptResponse = {
      promptId: randomPrompt.id,
      promptSlug: randomPrompt.slug,
      promptText: translatedText,
      candidates,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching random prompt:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch random prompt' },
      { status: 500 }
    );
  }
}
