import { PrismaClient, Image } from '@prisma/client';

/**
 * Selects images fairly based on impression counts
 * Prioritizes images with the lowest impression counts
 * Breaks ties randomly and randomizes final positions
 * 
 * @param prisma - Prisma client instance
 * @param promptId - The prompt ID to select images for
 * @param count - Number of images to select (default: 4)
 * @returns Array of selected images
 */
export async function selectFairImages(
  prisma: PrismaClient,
  promptId: string,
  count: number = 4
): Promise<Image[]> {
  // Step 1: Fetch all images for this prompt, ordered by impression count (ascending)
  const allImages = await prisma.image.findMany({
    where: { promptId },
    orderBy: { impressionCount: 'asc' },
  });

  // If we don't have enough images, return what we have
  if (allImages.length <= count) {
    return allImages;
  }

  // Step 2: Group images by impression count
  const grouped = new Map<number, Image[]>();
  for (const image of allImages) {
    const impressionCount = image.impressionCount;
    if (!grouped.has(impressionCount)) {
      grouped.set(impressionCount, []);
    }
    grouped.get(impressionCount)!.push(image);
  }

  // Step 3: Select images with lowest counts, breaking ties randomly
  const selected: Image[] = [];
  const sortedCounts = Array.from(grouped.keys()).sort((a, b) => a - b);

  for (const impressionCount of sortedCounts) {
    const imagesAtThisCount = grouped.get(impressionCount)!;

    // Shuffle images at this count level to break ties randomly
    const shuffled = shuffleArray([...imagesAtThisCount]);

    // Take as many as we need
    const needed = count - selected.length;
    selected.push(...shuffled.slice(0, needed));

    if (selected.length >= count) break;
  }

  // Step 4: Shuffle final positions to avoid position bias
  const finalSelection = shuffleArray(selected);

  // Step 5 & 6: Increment impression counts and log impressions in a transaction
  await prisma.$transaction(async (tx) => {
    // Increment impression counts
    await tx.image.updateMany({
      where: { id: { in: finalSelection.map((img) => img.id) } },
      data: { impressionCount: { increment: 1 } },
    });

    // Optionally log impressions (for detailed tracking)
    await tx.imageImpression.createMany({
      data: finalSelection.map((img) => ({
        promptId,
        imageId: img.id,
        modelName: img.modelName,
        timestamp: new Date(),
      })),
    });
  });

  return finalSelection;
}

/**
 * Fisher-Yates shuffle algorithm
 * Randomly shuffles an array in place
 * 
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Gets the current impression counts for all images of a prompt
 * Useful for testing and debugging
 * 
 * @param prisma - Prisma client instance
 * @param promptId - The prompt ID
 * @returns Map of image ID to impression count
 */
export async function getImpressionCounts(
  prisma: PrismaClient,
  promptId: string
): Promise<Map<string, number>> {
  const images = await prisma.image.findMany({
    where: { promptId },
    select: { id: true, impressionCount: true },
  });

  const counts = new Map<string, number>();
  for (const image of images) {
    counts.set(image.id, image.impressionCount);
  }
  return counts;
}
