'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageGrid } from '@/components/ImageGrid';
import { VoteConfirmation } from '@/components/VoteConfirmation';
import { SessionManager, useSession } from '@/components/SessionManager';
import { ModelName } from '@/types';

interface PromptPageClientProps {
  promptId: string;
  promptSlug: string;
  promptText: string;
  candidates: Array<{
    imageId: string;
    imageUrl: string;
    modelName: ModelName;
  }>;
}

function PromptPageContent({
  promptId,
  promptSlug,
  promptText,
  candidates,
}: PromptPageClientProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { sessionId, isLoading } = useSession();
  const router = useRouter();

  const handleVoteComplete = () => {
    setShowConfirmation(true);
  };

  const handleNext = () => {
    // Navigate to random prompt, excluding current one
    router.push(`/?exclude=${promptSlug}`);
    router.refresh();
  };

  if (isLoading || !sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-500 mx-auto mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ImageGrid
        promptId={promptId}
        promptText={promptText}
        candidates={candidates}
        sessionId={sessionId}
        onVoteComplete={handleVoteComplete}
      />

      {showConfirmation && <VoteConfirmation onNext={handleNext} />}
    </>
  );
}

export function PromptPageClient(props: PromptPageClientProps) {
  return (
    <SessionManager>
      <PromptPageContent {...props} />
    </SessionManager>
  );
}
