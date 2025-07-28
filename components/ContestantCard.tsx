import React from 'react';
import { Contestant } from '@/types';
import { useContestantVoting } from '@/hooks/useContestantVoting';
import { VoteButton } from './VoteButton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ContestantCardProps {
  contestant: Contestant;
  isVotingEnabled: boolean;
}

export const ContestantCard: React.FC<ContestantCardProps> = ({
  contestant,
  isVotingEnabled,
}) => {
  const { hasVoted, isSubmitting, error, submitVote, canVote } =
    useContestantVoting(contestant);

  return (
    <Card className='group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50'>
      {/* Contestant Image with Gradient Overlay */}
      <div className='relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='relative'>
            <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 shadow-lg'>
              {contestant.name.charAt(0)}
            </div>
            {/* Glow effect */}
            <div className='absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse' />
          </div>
        </div>

        {/* Floating particles effect */}
        <div className='absolute top-4 right-4'>
          <div
            className='w-2 h-2 bg-white/60 rounded-full animate-bounce'
            style={{ animationDelay: '0s' }}
          />
        </div>
        <div className='absolute bottom-8 left-6'>
          <div
            className='w-1 h-1 bg-white/40 rounded-full animate-bounce'
            style={{ animationDelay: '0.5s' }}
          />
        </div>
      </div>

      {/* Contestant Info */}
      <CardHeader className='pb-3 pt-6'>
        <div className='space-y-2'>
          <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors'>
            {contestant.name}
          </h3>
          <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed'>
            {contestant.talent}
          </p>
        </div>
      </CardHeader>

      <CardContent className='space-y-6'>
        {/* Vote Count with Beautiful Styling */}
        <div className='flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30'>
          <div className='flex items-center space-x-3'>
            <div className='relative'>
              <svg
                className='w-5 h-5 sm:w-6 sm:h-6 text-red-500'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                  clipRule='evenodd'
                />
              </svg>
              {/* Heart beat animation */}
              <div className='absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 text-red-500 animate-ping opacity-20' />
            </div>
            <div>
              <span className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
                {contestant.voteCount.toLocaleString()}
              </span>
              <div className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium'>
                votes
              </div>
            </div>
          </div>
          <Badge
            variant='secondary'
            className='bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800/30 dark:to-pink-800/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50 text-xs sm:text-sm font-semibold'
          >
            {contestant.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        {/* Vote Button */}
        <VoteButton
          hasVoted={hasVoted}
          isSubmitting={isSubmitting}
          error={error}
          onSubmit={submitVote}
          disabled={!isVotingEnabled || !canVote}
        />
      </CardContent>
    </Card>
  );
};
