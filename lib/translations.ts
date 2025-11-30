import prisma from './prisma';

/**
 * Get prompt translation for a specific locale
 * Falls back to English if translation is not available
 *
 * @param promptId - The prompt ID
 * @param locale - The desired locale (e.g., 'en', 'es')
 * @returns The translated prompt text
 */
export async function getPromptTranslation(
  promptId: string,
  locale: string
): Promise<string> {
  try {
    // Try to get translation for the requested locale
    const translation = await prisma.promptTranslation.findUnique({
      where: {
        promptId_language: {
          promptId,
          language: locale,
        },
      },
      select: {
        text: true,
      },
    });

    if (translation) {
      return translation.text;
    }

    // Fallback to English if requested locale not found
    if (locale !== 'en') {
      const englishTranslation = await prisma.promptTranslation.findUnique({
        where: {
          promptId_language: {
            promptId,
            language: 'en',
          },
        },
        select: {
          text: true,
        },
      });

      if (englishTranslation) {
        console.warn(
          `Translation not found for prompt ${promptId} in locale ${locale}, falling back to English`
        );
        return englishTranslation.text;
      }
    }

    // Final fallback: get the original prompt text
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
      select: { text: true },
    });

    if (prompt) {
      console.warn(
        `No translation found for prompt ${promptId} in any locale, using original text`
      );
      return prompt.text;
    }

    throw new Error(`Prompt ${promptId} not found`);
  } catch (error) {
    console.error(`Error fetching translation for prompt ${promptId}:`, error);
    throw error;
  }
}

/**
 * Get all translations for a prompt
 *
 * @param promptId - The prompt ID
 * @returns Object with translations keyed by locale
 */
export async function getAllPromptTranslations(
  promptId: string
): Promise<Record<string, string>> {
  try {
    const translations = await prisma.promptTranslation.findMany({
      where: { promptId },
      select: {
        language: true,
        text: true,
      },
    });

    return translations.reduce(
      (acc: Record<string, string>, t: { language: string; text: string }) => {
        acc[t.language] = t.text;
        return acc;
      },
      {} as Record<string, string>
    );
  } catch (error) {
    console.error(`Error fetching translations for prompt ${promptId}:`, error);
    throw error;
  }
}

/**
 * Upsert a translation for a prompt
 *
 * @param promptId - The prompt ID
 * @param locale - The locale (e.g., 'en', 'es')
 * @param text - The translated text
 */
export async function upsertTranslation(
  promptId: string,
  locale: string,
  text: string
): Promise<void> {
  try {
    await prisma.promptTranslation.upsert({
      where: {
        promptId_language: {
          promptId,
          language: locale,
        },
      },
      update: {
        text,
      },
      create: {
        promptId,
        language: locale,
        text,
      },
    });
  } catch (error) {
    console.error(`Error upserting translation for prompt ${promptId}:`, error);
    throw error;
  }
}

/**
 * Check if a translation exists for a prompt in a specific locale
 *
 * @param promptId - The prompt ID
 * @param locale - The locale to check
 * @returns True if translation exists, false otherwise
 */
export async function hasTranslation(promptId: string, locale: string): Promise<boolean> {
  try {
    const count = await prisma.promptTranslation.count({
      where: {
        promptId,
        language: locale,
      },
    });
    return count > 0;
  } catch (error) {
    console.error(`Error checking translation for prompt ${promptId}:`, error);
    return false;
  }
}
