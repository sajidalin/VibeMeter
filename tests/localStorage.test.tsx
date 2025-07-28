import { storageUtils } from '@/utils/storage';
import { VotingState } from '@/types';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('localStorage Persistence', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('persists vote state in localStorage', () => {
    const testState: VotingState = {
      hasVoted: true,
      votedFor: '1',
      voteTimestamp: Date.now(),
    };

    storageUtils.setVotingState(testState);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'vibemeter_voting_state',
      JSON.stringify(testState)
    );
  });

  it('retrieves vote state from localStorage', () => {
    const testState: VotingState = {
      hasVoted: true,
      votedFor: '1',
      voteTimestamp: Date.now(),
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(testState));

    const retrievedState = storageUtils.getVotingState();

    expect(retrievedState).toEqual(testState);
    expect(localStorage.getItem).toHaveBeenCalledWith('vibemeter_voting_state');
  });

  it('returns default state when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const state = storageUtils.getVotingState();

    expect(state).toEqual({
      hasVoted: false,
      votedFor: null,
      voteTimestamp: null,
    });
  });

  it('returns default state when localStorage has invalid JSON', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');

    const state = storageUtils.getVotingState();

    expect(state).toEqual({
      hasVoted: false,
      votedFor: null,
      voteTimestamp: null,
    });
  });

  it('clears voting state from localStorage', () => {
    storageUtils.clearVotingState();

    expect(localStorage.removeItem).toHaveBeenCalledWith(
      'vibemeter_voting_state'
    );
  });

  it('checks if user has voted for specific contestant', () => {
    const testState: VotingState = {
      hasVoted: true,
      votedFor: '1',
      voteTimestamp: Date.now(),
    };

    // Mock the localStorage to return our test state
    localStorageMock.getItem.mockReturnValue(JSON.stringify(testState));

    expect(storageUtils.hasVotedForContestant('1')).toBe(true);
    expect(storageUtils.hasVotedForContestant('2')).toBe(false);
  });

  it('handles localStorage errors gracefully', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    const state = storageUtils.getVotingState();

    expect(state).toEqual({
      hasVoted: false,
      votedFor: null,
      voteTimestamp: null,
    });
  });
});
