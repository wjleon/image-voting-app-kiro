#!/usr/bin/env tsx

/**
 * Anonymize Prompt Slugs Script
 * Removes model names from prompt slugs
 */

import { createHash } from 'crypto';
import prisma from '../lib/prisma';

/**
 * Generate anonymous slug from prompt ID
 */
function generateAnonymousSlug(promptId: string): string {
  // Create a short hash from the prompt ID
  const hash = createHash('md5').update(promptId).digest('hex').substring(0, 12);
  return `prompt-${hash}`;
}

/**
 * Main anonymization function
 */
async function main() {
  console.log('🔒 Starting prompt slug anonymization...\n');

  // Get all prompts from database
  const prompts = await prisma.prompt.findMany({
    select: {
      id: true,
      slug: true,
      text: true,
    },
  });

  console.log(`Found ${prompts.length} prompts to process\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const prompt of prompts) {
    try {
      const oldSlug = prompt.slug;
      const newSlug = generateAnonymousSlug(prompt.id);

      // Update the prompt slug
      await prisma.prompt.update({
        where: { id: prompt.id },
        data: { slug: newSlug },
      });

      console.log(`✓ ${oldSlug} → ${newSlug}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error processing prompt ${prompt.id}:`, error);
      errorCount++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Anonymization Summary');
  console.log('='.repeat(60));
  console.log(`Total prompts: ${prompts.length}`);
  console.log(`✅ Successfully anonymized: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('\n✨ Prompt slug anonymization completed!');

  await prisma.$disconnect();
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
