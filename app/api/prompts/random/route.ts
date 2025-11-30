import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { selectFairImages } from '@/lib/fairness';

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
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const excludeSlug = searchParams.get('exclude');

    // Build where clause
    const whereClause = excludeSlug
      ? {
          slug: {
            not: excludeSlug,
          },
        }
      : {};

    // Get count of available prompts
    const promptCount = await prisma.prompt.count({
      where: whereClause,
    });

    if (promptCount === 0) {
      return NextResponse.json(
        { success: false, error: 'No prompts available' },
        { status: 404 }
      );
    }

    // Select a random prompt using random skip
    const randomSkip = Math.floor(Math.random() * promptCount);
    const randomPrompt = await prisma.prompt.findFirst({
      where: whereClause,
      skip: randomSkip,
    });

    if (!randomPrompt) {
      return NextResponse.json(
        { success: false, error: 'Failed to select random prompt' },
        { status: 500 }
      );
    }

    // Check if prompt has enough images
    const imageCount = await prisma.image.count({
      where: { promptId: randomPrompt.id },
    });

    if (imageCount < 4) {
      // If this prompt doesn't have enough images, try to find another one
      // This is a fallback - in production, prompts with < 4 images should be filtered
      return NextResponse.json(
        { success: false, error: 'Selected prompt has insufficient images' },
        { status: 500 }
      );
    }

    // Use fairness algorithm to select 4 images
    const selectedImages = await selectFairImages(prisma, randomPrompt.id, 4);

    // Anonymize image URLs (don't expose model names)
    const candidates = selectedImages.map((image) => ({
      imageId: image.id,
      imageUrl: image.imagePath, // Path is already anonymized in the database
    }));

    const response: RandomPromptResponse = {
      promptId: randomPrompt.id,
      promptSlug: randomPrompt.slug,
      promptText: randomPrompt.text,
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
