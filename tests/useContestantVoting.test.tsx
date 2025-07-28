import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useContestantVoting } from '@/hooks/useContestantVoting';
import { Contestant } from '@/types';

// Mock the API
jest.mock('@/utils/api', () => ({
  submitVote: jest.fn(),
}));

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

describe('useContestantVoting', () => {
  const mockContestant: Contestant = {
    id: '1',
    name: 'Test Contestant',
    talent: 'Test Talent',
    imageUrl: '/test.jpg',
    voteCount: 100,
    isActive: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useContestantVoting(mockContestant));

    expect(result.current.hasVoted).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.canVote).toBe(true);
  });

  it('submits vote successfully', async () => {
    const { submitVote } = require('@/utils/api');
    submitVote.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useContestantVoting(mockContestant));

    await act(async () => {
      await result.current.submitVote();
    });

    expect(submitVote).toHaveBeenCalledWith(mockContestant.id);
    expect(result.current.hasVoted).toBe(true);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles vote submission error', async () => {
    const { submitVote } = require('@/utils/api');
    const errorMessage = 'Vote submission failed';
    submitVote.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useContestantVoting(mockContestant));

    await act(async () => {
      await result.current.submitVote();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.hasVoted).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('prevents voting when already voted', async () => {
    const { submitVote } = require('@/utils/api');
    submitVote.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useContestantVoting(mockContestant));

    // First vote
    await act(async () => {
      await result.current.submitVote();
    });

    // Second vote attempt
    await act(async () => {
      await result.current.submitVote();
    });

    expect(submitVote).toHaveBeenCalledTimes(1);
    expect(result.current.hasVoted).toBe(true);
  });

  it('updates canVote state correctly', async () => {
    const { submitVote } = require('@/utils/api');
    submitVote.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useContestantVoting(mockContestant));

    expect(result.current.canVote).toBe(true);

    await act(async () => {
      await result.current.submitVote();
    });

    expect(result.current.canVote).toBe(false);
  });
});
