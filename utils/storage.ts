import { VotingState } from '@/types';

const VOTING_STATE_KEY = 'vibemeter_voting_state';

export const storageUtils = {
  getVotingState: (): VotingState => {
    try {
      if (typeof window === 'undefined') {
        return { hasVoted: false, votedFor: null, voteTimestamp: null };
      }

      const stored = localStorage.getItem(VOTING_STATE_KEY);
      if (!stored) {
        return { hasVoted: false, votedFor: null, voteTimestamp: null };
      }

      return JSON.parse(stored) as VotingState;
    } catch (error) {
      console.error('Error reading voting state from localStorage:', error);
      return { hasVoted: false, votedFor: null, voteTimestamp: null };
    }
  },

  setVotingState: (state: VotingState): void => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(VOTING_STATE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error writing voting state to localStorage:', error);
    }
  },

  clearVotingState: (): void => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(VOTING_STATE_KEY);
    } catch (error) {
      console.error('Error clearing voting state from localStorage:', error);
    }
  },

  hasVotedForContestant: (contestantId: string): boolean => {
    const state = storageUtils.getVotingState();
    return state.hasVoted && state.votedFor === contestantId;
  },
};
