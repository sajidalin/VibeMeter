import { useState, useEffect } from 'react';
import { VotingState } from '@/types';
import { storageUtils } from '@/utils/storage';

export const useLocalStorage = () => {
  const [votingState, setVotingState] = useState<VotingState>({
    hasVoted: false,
    votedFor: null,
    voteTimestamp: null,
  });

  useEffect(() => {
    // Load initial state from localStorage
    const storedState = storageUtils.getVotingState();
    setVotingState(storedState);
  }, []);

  const updateVotingState = (newState: VotingState) => {
    setVotingState(newState);
    storageUtils.setVotingState(newState);
  };

  const hasVotedForContestant = (contestantId: string): boolean => {
    return votingState.hasVoted && votingState.votedFor === contestantId;
  };

  const clearVotingState = () => {
    const resetState = { hasVoted: false, votedFor: null, voteTimestamp: null };
    setVotingState(resetState);
    storageUtils.clearVotingState();
  };

  return {
    votingState,
    updateVotingState,
    hasVotedForContestant,
    clearVotingState,
  };
};
