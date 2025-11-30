'use client';

import { useEffect } from 'react';

/**
 * Props for VoteConfirmation component
 */
interface VoteConfirmationProps {
  onNext: () => void;
  autoAdvanceDelay?: number; // milliseconds, default 3000
}

/**
 * VoteConfirmation Component
 * Displays a confirmation message after voting
 * 
 * @param onNext - Callback to advance to next prompt
 * @param autoAdvanceDelay - Optional delay before auto-advancing (ms)
 */
export function VoteConfirmation({ onNext, autoAdvanceDelay = 3000 }: VoteConfirmationProps) {
  useEffect(() => {
    // Auto-advance after delay
    const timer = setTimeout(() => {
      onNext();
    }, autoAdvanceDelay);

    return () => clearTimeout(timer);
  }, [onNext, autoAdvanceDelay]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-auto animate-in zoom-in-95 duration-300 border border-gray-200 dark:border-gray-700">
        {/* Success Icon */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-in zoom-in duration-500 shadow-lg shadow-green-500/20">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400 animate-in zoom-in duration-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
          Thanks for voting!
        </h2>
        <p className="text-sm sm:text-base text-center text-gray-600 dark:text-gray-400 mb-5 sm:mb-6">
          Your vote helps us compare AI image models
        </p>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 sm:py-3.5 px-6 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 touch-manipulation text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          Next Prompt
        </button>

        {/* Auto-advance indicator */}
        <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3 sm:mt-4">
          Auto-advancing in {autoAdvanceDelay / 1000} seconds...
        </p>
      </div>
    </div>
  );
}
