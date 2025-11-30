'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ModelName } from '@/types';

/**
 * Image candidate for voting
 */
interface ImageCandidate {
  imageId: string;
  imageUrl: string;
  modelName: ModelName;
}

/**
 * Props for ImageGrid component
 */
interface ImageGridProps {
  promptId: string;
  promptText: string;
  candidates: ImageCandidate[];
  sessionId: string;
  onVoteComplete?: () => void;
}

/**
 * ImageGrid Component
 * Displays a 2×2 grid of images for voting
 * 
 * @param promptId - The prompt ID
 * @param promptText - The prompt text to display
 * @param candidates - Array of 4 image candidates
 * @param sessionId - User session ID
 * @param onVoteComplete - Callback when vote is submitted
 */
export function ImageGrid({
  promptId,
  promptText,
  candidates,
  sessionId,
  onVoteComplete,
}: ImageGridProps) {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageClick = async (imageId: string, modelName: ModelName) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSelectedImageId(imageId);
    setError(null);

    try {
      // Submit vote to API
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptId,
          selectedModel: modelName,
          shownModels: candidates.map((c) => c.modelName),
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      // Call completion callback
      if (onVoteComplete) {
        onVoteComplete();
      }
    } catch (err) {
      console.error('Error submitting vote:', err);
      setError(t('errors.voteFailed'));
      setIsSubmitting(false);
      setSelectedImageId(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* Prompt Text */}
      <div className="mb-6 sm:mb-8 lg:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 px-2">
          {t('voting.title')}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto px-2">
          {promptText}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200 text-center">{error}</p>
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
        {candidates.map((candidate) => (
          <button
            key={candidate.imageId}
            onClick={() => handleImageClick(candidate.imageId, candidate.modelName)}
            disabled={isSubmitting}
            aria-label="Vote for this image"
            className={`
              relative aspect-square overflow-hidden rounded-lg sm:rounded-xl
              transition-all duration-300 ease-out
              min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]
              shadow-md hover:shadow-2xl
              ${
                isSubmitting && selectedImageId === candidate.imageId
                  ? 'ring-4 sm:ring-6 ring-blue-500 shadow-2xl scale-[0.98]'
                  : isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:ring-4 sm:hover:ring-6 hover:ring-blue-400 hover:shadow-blue-400/50 hover:scale-[1.02] cursor-pointer active:scale-[0.98]'
              }
              focus-visible:outline-none focus-visible:ring-4 sm:focus-visible:ring-6 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              touch-manipulation
              group
            `}
          >
            <Image
              src={candidate.imageUrl}
              alt="AI generated image"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`
                object-cover transition-all duration-300
                ${isSubmitting && selectedImageId !== candidate.imageId ? '' : 'group-hover:brightness-110'}
              `}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
              priority
            />
            
            {/* Hover Overlay */}
            {!isSubmitting && (
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}
            
            {/* Loading Overlay */}
            {isSubmitting && selectedImageId === candidate.imageId && (
              <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
                  <svg
                    className="animate-spin h-8 w-8 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Instructions */}
      {!isSubmitting && (
        <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
          <span className="hidden sm:inline">{t('voting.instruction')}</span>
          <span className="sm:hidden">{t('voting.instructionMobile')}</span>
        </p>
      )}
    </div>
  );
}
