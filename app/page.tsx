import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ exclude?: string }>;
}) {
  const params = await searchParams;
  // Get exclude parameter
  const excludeSlug = params.exclude;

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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center">No Prompts Available</h1>
        <p className="text-base sm:text-lg text-center max-w-md">
          Please run the ingestion script to populate the database.
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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center">Error</h1>
        <p className="text-base sm:text-lg text-center max-w-md">Failed to load a prompt.</p>
      </main>
    );
  }

  // Redirect to the prompt page
  redirect(`/p/${randomPrompt.slug}`);
}
