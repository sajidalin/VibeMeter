import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from './ui/LoadingSpinner';

interface VoteButtonProps {
  hasVoted: boolean;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: () => void;
  disabled?: boolean;
}

export const VoteButton: React.FC<VoteButtonProps> = ({
  hasVoted,
  isSubmitting,
  error,
  onSubmit,
  disabled = false,
}) => {
  const isDisabled = disabled || hasVoted || isSubmitting;

  return (
    <div className='space-y-3'>
      <Button
        onClick={onSubmit}
        disabled={isDisabled}
        variant={hasVoted ? 'secondary' : 'default'}
        size='lg'
        className={`
          w-full h-14 sm:h-16 text-base sm:text-lg font-semibold
          transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
          ${
            hasVoted
              ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700/50 hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-800/40 dark:hover:to-emerald-800/40'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
          }
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        aria-label={hasVoted ? 'Already voted' : 'Vote for contestant'}
      >
        {isSubmitting ? (
          <div className='flex items-center justify-center space-x-3'>
            <LoadingSpinner size='small' />
            <span>Submitting...</span>
          </div>
        ) : hasVoted ? (
          <div className='flex items-center justify-center space-x-2'>
            <svg
              className='w-5 h-5 sm:w-6 sm:h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
            <span>Voted ✓</span>
          </div>
        ) : (
          <div className='flex items-center justify-center space-x-2'>
            <svg
              className='w-5 h-5 sm:w-6 sm:h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                clipRule='evenodd'
              />
            </svg>
            <span>Vote Now</span>
          </div>
        )}
      </Button>

      {error && (
        <Alert
          variant='destructive'
          className='border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800/30'
        >
          <AlertDescription className='text-sm font-medium text-red-700 dark:text-red-300'>
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
