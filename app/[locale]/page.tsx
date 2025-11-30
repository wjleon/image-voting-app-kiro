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

  // Get prompts with at least 4 images
  const validPrompts = await prisma.prompt.findMany({
    where: {
      ...whereClause,
      images: {
        some: {}, // Has at least one image
      },
    },
    include: {
      _count: {
        select: { images: true },
      },
    },
  });

  // Filter to only prompts with 4+ images
  const promptsWithEnoughImages = validPrompts.filter((p) => p._count.images >= 4);

  if (promptsWithEnoughImages.length === 0) {
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

  // Select a random prompt from valid ones
  const randomIndex = Math.floor(Math.random() * promptsWithEnoughImages.length);
  const randomPrompt = promptsWithEnoughImages[randomIndex];

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
