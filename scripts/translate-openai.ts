#!/usr/bin/env tsx

/**
 * OpenAI Translation Script
 * Translates all prompts without Spanish translations using OpenAI API
 */

import prisma from '../lib/prisma';
import { upsertTranslation } from '../lib/translations';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
const TARGET_LOCALE = 'es';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms

interface TranslationResult {
  promptId: string;
  originalText: string;
  translatedText?: string;
  error?: string;
}

/**
 * Translate text using OpenAI API
 */
async function translateWithOpenAI(text: string, retries = 0): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are a professional translator. Translate the following image generation prompt from English to Spanish. Maintain the creative intent and technical details. Only respond with the translation, no explanations.',
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const translation = data.choices[0]?.message?.content?.trim();

    if (!translation) {
      throw new Error('No translation returned from OpenAI');
    }

    return translation;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(`Translation failed, retrying (${retries + 1}/${MAX_RETRIES})...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * (retries + 1)));
      return translateWithOpenAI(text, retries + 1);
    }
    throw error;
  }
}

/**
 * Main translation function
 */
async function main() {
  console.log('🌍 Starting OpenAI translation script...\n');

  if (!OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY environment variable is not set');
    console.error('Please set it in your .env file or environment');
    process.exit(1);
  }

  console.log(`Using model: ${OPENAI_MODEL}`);
  console.log(`Target locale: ${TARGET_LOCALE}\n`);

  // Find all prompts without Spanish translations
  const prompts = await prisma.prompt.findMany({
    where: {
      translations: {
        none: {
          language: TARGET_LOCALE,
        },
      },
    },
    select: {
      id: true,
      text: true,
    },
  });

  console.log(`Found ${prompts.length} prompts without ${TARGET_LOCALE} translations\n`);

  if (prompts.length === 0) {
    console.log('✅ All prompts already have translations!');
    await prisma.$disconnect();
    return;
  }

  const results: TranslationResult[] = [];
  let successCount = 0;
  let errorCount = 0;

  // Process each prompt
  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];
    const progress = `[${i + 1}/${prompts.length}]`;

    console.log(`${progress} Translating prompt ${prompt.id.substring(0, 8)}...`);
    console.log(`  Original: ${prompt.text.substring(0, 80)}${prompt.text.length > 80 ? '...' : ''}`);

    try {
      const translatedText = await translateWithOpenAI(prompt.text);
      console.log(
        `  Translated: ${translatedText.substring(0, 80)}${translatedText.length > 80 ? '...' : ''}`
      );

      // Save translation to database
      await upsertTranslation(prompt.id, TARGET_LOCALE, translatedText);

      results.push({
        promptId: prompt.id,
        originalText: prompt.text,
        translatedText,
      });

      successCount++;
      console.log(`  ✅ Success\n`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`  ❌ Error: ${errorMessage}\n`);

      results.push({
        promptId: prompt.id,
        originalText: prompt.text,
        error: errorMessage,
      });

      errorCount++;
    }

    // Add a small delay between requests to avoid rate limiting
    if (i < prompts.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Translation Summary');
  console.log('='.repeat(60));
  console.log(`Total prompts: ${prompts.length}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);

  if (errorCount > 0) {
    console.log('\n❌ Failed translations:');
    results
      .filter((r) => r.error)
      .forEach((r) => {
        console.log(`  - ${r.promptId.substring(0, 8)}: ${r.error}`);
      });
  }

  console.log('\n✨ Translation script completed!');

  await prisma.$disconnect();
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
