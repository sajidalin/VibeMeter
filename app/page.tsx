'use client';

import React from 'react';
import { useLiveData } from '@/hooks/useLiveData';
import { ContestantCard } from '@/components/ContestantCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { data, loading, error, retry } = useLiveData();

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 flex items-center justify-center'>
        <div className='text-center space-y-6'>
          <div className='relative'>
            <LoadingSpinner size='large' />
            <div className='absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse' />
          </div>
          <div className='space-y-2'>
            <p className='text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium'>
              Loading live voting data...
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Preparing the stage for amazing performances
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error.hasError) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 flex items-center justify-center p-4'>
        <div className='max-w-md w-full'>
          <Alert
            variant='destructive'
            className='text-center border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800/30'
          >
            <AlertDescription className='space-y-4'>
              <div className='flex items-center justify-center w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4'>
                <svg
                  className='w-8 h-8 text-red-600 dark:text-red-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                  Connection Error
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-300 mb-6'>
                  {error.message}
                </p>
                <Button
                  onClick={retry}
                  size='lg'
                  className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg'
                >
                  Try Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 flex items-center justify-center'>
        <div className='text-center space-y-4'>
          <div className='w-16 h-16 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-white'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <p className='text-lg text-gray-700 dark:text-gray-300 font-medium'>
            No voting data available
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Please check back later
          </p>
        </div>
      </div>
    );
  }

  const isVotingEnabled = data.votingWindow.isOpen;

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950'>
      {/* Header with Glass Effect */}

      <header className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-200/50 dark:border-purple-800/50 sticky top-0 z-50 shadow-lg'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center py-6 sm:py-8 gap-6'>
            <div className='text-center sm:text-left'>
              <div className='flex items-center justify-center sm:justify-start space-x-3 mb-2'>
                <div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                  VibeMeter
                </h1>
              </div>
              <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium'>
                Live Talent Show Voting
              </p>
            </div>
            <div className='text-center sm:text-right'>
              <div className='bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 sm:p-6 shadow-lg'>
                <div className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white'>
                  {data.totalVotes.toLocaleString()}
                </div>
                <div className='text-xs sm:text-sm text-purple-100 font-medium'>
                  Total Votes
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Voting Status */}
        <div className='mb-8 sm:mb-12'>
          <Badge
            variant={isVotingEnabled ? 'default' : 'secondary'}
            className={`
              inline-flex items-center gap-3 text-sm sm:text-base px-4 py-2 rounded-full
              ${
                isVotingEnabled
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
              }
            `}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                isVotingEnabled ? 'bg-green-300 animate-pulse' : 'bg-red-300'
              }`}
            />
            {isVotingEnabled ? 'Voting is Live' : 'Voting is Closed'}
          </Badge>
        </div>

        {/* Contestants Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10'>
          {data.contestants.map(contestant => (
            <ContestantCard
              key={contestant.id}
              contestant={contestant}
              isVotingEnabled={isVotingEnabled}
            />
          ))}
        </div>

        {/* Live Updates Indicator */}
        <div className='mt-12 sm:mt-16 text-center'>
          <div className='inline-flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200/50 dark:border-purple-800/50'>
            <div className='w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse' />
            Live updates every 5 seconds
          </div>
        </div>
      </main>
    </div>
  );
}
