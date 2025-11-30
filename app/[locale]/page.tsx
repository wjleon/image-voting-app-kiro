import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ exclude?: string }>;
}) {
  const t = await getTranslations();
  const { locale } = await params;
  const { exclude: excludeSlug } = await searchParams;

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
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 lg:p-24">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center">
          {t('errors.noPrompts')}
        </h1>
        <p className="text-base sm:text-lg text-center max-w-md">
          {t('errors.noPromptsMessage')}
        </p>
      </main>
    );
  }

  // Select a random prompt
  const randomSkip = Math.floor(Math.random() * promptCount);
  const randomPrompt = await prisma.prompt.findFirst({
    where: whereClause,
    skip: randomSkip,
  });

  if (!randomPrompt) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 lg:p-24">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center">
          {t('errors.error')}
        </h1>
        <p className="text-base sm:text-lg text-center max-w-md">{t('errors.loadFailed')}</p>
      </main>
    );
  }

  // Redirect to the prompt page with locale
  redirect(`/${locale}/p/${randomPrompt.slug}`);
}
