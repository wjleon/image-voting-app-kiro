import { notFound, redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { selectFairImages } from '@/lib/fairness';
import { PromptPageClient } from './PromptPageClient';

/**
 * Generate metadata for the prompt page
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = await prisma.prompt.findUnique({
    where: { slug },
  });

  if (!prompt) {
    return {
      title: 'Prompt Not Found',
    };
  }

  return {
    title: `Vote: ${prompt.text.substring(0, 60)}...`,
    description: `Compare AI-generated images for: ${prompt.text.substring(0, 150)}`,
    openGraph: {
      title: `AI Image Comparison: ${prompt.text.substring(0, 60)}`,
      description: `Vote on which AI model best matches this prompt: ${prompt.text.substring(0, 150)}`,
      type: 'website',
    },
  };
}

/**
 * Prompt Page
 * Displays a prompt with 4 fairly-selected images for voting
 */
export default async function PromptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch prompt by slug
  const prompt = await prisma.prompt.findUnique({
    where: { slug },
  });

  if (!prompt) {
    notFound();
  }

  // Check if prompt has enough images
  const imageCount = await prisma.image.count({
    where: { promptId: prompt.id },
  });

  if (imageCount < 4) {
    // Redirect to random prompt if this one doesn't have enough images
    redirect('/');
  }

  // Use fairness algorithm to select 4 images
  const selectedImages = await selectFairImages(prisma, prompt.id, 4);

  // Prepare candidates for the client component
  const candidates = selectedImages.map((image) => ({
    imageId: image.id,
    imageUrl: image.imagePath,
    modelName: image.modelName as import('@/types').ModelName,
  }));

  return (
    <PromptPageClient
      promptId={prompt.id}
      promptSlug={prompt.slug}
      promptText={prompt.text}
      candidates={candidates}
    />
  );
}
