import { useState, useEffect } from 'react';
import { VotingState } from '@/types';
import { storageUtils } from '@/utils/storage';

// Create a custom event for localStorage changes
const STORAGE_CHANGE_EVENT = 'vibemeter-storage-change';

export const useLocalStorage = () => {
  const [votingState, setVotingState] = useState<VotingState>({
    hasVoted: false,
    votedFor: [],
    voteTimestamp: null,
  });

  useEffect(() => {
    // Load initial state from localStorage
    const loadState = () => {
      const storedState = storageUtils.getVotingState();
      setVotingState(storedState);
    };

    // Load initial state
    loadState();

    // Listen for storage changes from other components
    const handleStorageChange = () => {
      loadState();
    };

    // Listen for custom events when localStorage is updated
    window.addEventListener(STORAGE_CHANGE_EVENT, handleStorageChange);

    // Listen for actual localStorage changes (for cross-tab sync)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(STORAGE_CHANGE_EVENT, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateVotingState = (newState: VotingState) => {
    setVotingState(newState);
    storageUtils.setVotingState(newState);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent(STORAGE_CHANGE_EVENT));
  };

  const hasVotedForContestant = (contestantId: string): boolean => {
    return votingState.votedFor.includes(contestantId);
  };

  const clearVotingState = () => {
    const resetState = { hasVoted: false, votedFor: [], voteTimestamp: null };
    setVotingState(resetState);
    storageUtils.clearVotingState();

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent(STORAGE_CHANGE_EVENT));
  };

  return {
    votingState,
    updateVotingState,
    hasVotedForContestant,
    clearVotingState,
  };
};
