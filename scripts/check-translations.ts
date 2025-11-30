#!/usr/bin/env tsx

/**
 * Translation Verification Script
 * Checks translation coverage and lists missing translations
 */

import prisma from '../lib/prisma';

const TARGET_LOCALE = 'es';

interface TranslationStats {
  totalPrompts: number;
  translatedPrompts: number;
  missingPrompts: number;
  coveragePercentage: number;
}

/**
 * Main verification function
 */
async function main() {
  console.log('🔍 Checking translation coverage...\n');

  // Get total prompt count
  const totalPrompts = await prisma.prompt.count();

  // Get prompts with Spanish translations
  const translatedPrompts = await prisma.prompt.count({
    where: {
      translations: {
        some: {
          language: TARGET_LOCALE,
        },
      },
    },
  });

  // Calculate stats
  const missingPrompts = totalPrompts - translatedPrompts;
  const coveragePercentage =
    totalPrompts > 0 ? (translatedPrompts / totalPrompts) * 100 : 0;

  const stats: TranslationStats = {
    totalPrompts,
    translatedPrompts,
    missingPrompts,
    coveragePercentage,
  };

  // Display summary
  console.log('='.repeat(60));
  console.log('📊 Translation Coverage Report');
  console.log('='.repeat(60));
  console.log(`Target locale: ${TARGET_LOCALE}`);
  console.log(`Total prompts: ${stats.totalPrompts}`);
  console.log(`Translated prompts: ${stats.translatedPrompts}`);
  console.log(`Missing translations: ${stats.missingPrompts}`);
  console.log(`Coverage: ${stats.coveragePercentage.toFixed(2)}%`);
  console.log('='.repeat(60));

  // List missing translations if any
  if (stats.missingPrompts > 0) {
    console.log(`\n❌ Prompts missing ${TARGET_LOCALE} translations:\n`);

    const promptsWithoutTranslations = await prisma.prompt.findMany({
      where: {
        translations: {
          none: {
            language: TARGET_LOCALE,
          },
        },
      },
      select: {
        id: true,
        slug: true,
        text: true,
      },
      take: 20, // Limit to first 20 for readability
    });

    promptsWithoutTranslations.forEach((prompt, index) => {
      console.log(`${index + 1}. ID: ${prompt.id.substring(0, 8)}... | Slug: ${prompt.slug}`);
      console.log(
        `   Text: ${prompt.text.substring(0, 80)}${prompt.text.length > 80 ? '...' : ''}\n`
      );
    });

    if (stats.missingPrompts > 20) {
      console.log(`... and ${stats.missingPrompts - 20} more\n`);
    }

    console.log(`\n💡 Run the translation script to generate missing translations:`);
    console.log(`   npx tsx scripts/translate-openai.ts\n`);
  } else {
    console.log('\n✅ All prompts have translations!\n');
  }

  // Check for English translations
  const englishTranslations = await prisma.prompt.count({
    where: {
      translations: {
        some: {
          language: 'en',
        },
      },
    },
  });

  const missingEnglish = totalPrompts - englishTranslations;

  if (missingEnglish > 0) {
    console.log('⚠️  Warning: Some prompts are missing English translations');
    console.log(`   Missing: ${missingEnglish} prompts`);
    console.log(`   Run the backfill script to create English translations:\n`);
    console.log(`   npx tsx scripts/backfill-english-translations.ts\n`);
  }

  await prisma.$disconnect();

  // Exit with error code if coverage is not 100%
  if (stats.coveragePercentage < 100) {
    process.exit(1);
  }
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
