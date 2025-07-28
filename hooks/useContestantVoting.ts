import { useState, useCallback } from 'react';
import { Contestant, VotingState } from '@/types';
import { apiUtils } from '@/utils/api';
import { useLocalStorage } from './useLocalStorage';

export const useContestantVoting = (contestant: Contestant) => {
  const { votingState, updateVotingState, hasVotedForContestant } =
    useLocalStorage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasVoted = hasVotedForContestant(contestant.id);

  const submitVote = useCallback(async () => {
    if (hasVoted) {
      setError('You have already voted for this contestant');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await apiUtils.submitVote(contestant.id);

      if (response.success) {
        const newVotingState: VotingState = {
          hasVoted: true,
          votedFor: [...votingState.votedFor, contestant.id], // Add to existing votes
          voteTimestamp: Date.now(),
        };
        updateVotingState(newVotingState);
      } else {
        setError(response.error || 'Failed to submit vote');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [contestant.id, hasVoted, updateVotingState, votingState.votedFor]);

  const canVote = !hasVoted && !isSubmitting;

  return {
    hasVoted,
    isSubmitting,
    error,
    submitVote,
    canVote,
  };
};
