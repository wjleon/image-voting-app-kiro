#!/usr/bin/env tsx

/**
 * Backfill English Translations Script
 * Creates English translations for all prompts that don't have them
 */

import prisma from '../lib/prisma';
import { upsertTranslation } from '../lib/translations';

/**
 * Main backfill function
 */
async function main() {
  console.log('🔄 Starting English translation backfill...\n');

  // Find all prompts without English translations
  const prompts = await prisma.prompt.findMany({
    where: {
      translations: {
        none: {
          language: 'en',
        },
      },
    },
    select: {
      id: true,
      text: true,
      slug: true,
    },
  });

  console.log(`Found ${prompts.length} prompts without English translations\n`);

  if (prompts.length === 0) {
    console.log('✅ All prompts already have English translations!');
    await prisma.$disconnect();
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  // Process each prompt
  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];
    const progress = `[${i + 1}/${prompts.length}]`;

    console.log(`${progress} Creating English translation for prompt ${prompt.id.substring(0, 8)}...`);
    console.log(`  Slug: ${prompt.slug}`);
    console.log(`  Text: ${prompt.text.substring(0, 80)}${prompt.text.length > 80 ? '...' : ''}`);

    try {
      // Create English translation with the same text as the original prompt
      await upsertTranslation(prompt.id, 'en', prompt.text);

      successCount++;
      console.log(`  ✅ Success\n`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`  ❌ Error: ${errorMessage}\n`);
      errorCount++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Backfill Summary');
  console.log('='.repeat(60));
  console.log(`Total prompts processed: ${prompts.length}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log('\n✨ Backfill completed!');

  await prisma.$disconnect();

  // Exit with error code if there were failures
  if (errorCount > 0) {
    process.exit(1);
  }
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
