import prisma from '../lib/prisma';
import { createHash } from 'crypto';

/**
 * Generate a short, anonymous slug from a prompt ID
 * Uses first 8 characters of SHA-256 hash for consistency
 */
function generateAnonymousSlug(promptId: string): string {
  const hash = createHash('sha256').update(promptId).digest('hex');
  return `p-${hash.substring(0, 8)}`;
}

async function main() {
  console.log('Starting slug anonymization...\n');

  // Get all prompts
  const prompts = await prisma.prompt.findMany({
    select: { id: true, slug: true },
  });

  console.log(`Found ${prompts.length} prompts to update\n`);

  let updated = 0;
  let skipped = 0;

  for (const prompt of prompts) {
    const newSlug = generateAnonymousSlug(prompt.id);
    
    // Check if slug already looks anonymous (starts with 'p-')
    if (prompt.slug.startsWith('p-') && prompt.slug.length === 10) {
      console.log(`⏭️  Skipping ${prompt.slug} (already anonymous)`);
      skipped++;
      continue;
    }

    try {
      await prisma.prompt.update({
        where: { id: prompt.id },
        data: { slug: newSlug },
      });
      console.log(`✓ Updated: ${prompt.slug} → ${newSlug}`);
      updated++;
    } catch (error) {
      console.error(`✗ Failed to update ${prompt.slug}:`, error);
    }
  }

  console.log(`\n✅ Complete! Updated ${updated} slugs, skipped ${skipped}`);
}

main()
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
