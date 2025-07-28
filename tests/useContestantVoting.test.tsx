import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useContestantVoting } from '@/hooks/useContestantVoting';
import { Contestant } from '@/types';

// Mock the API
jest.mock('@/utils/api', () => ({
  apiUtils: {
    submitVote: jest.fn(),
  },
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

// Mock window events
const mockDispatchEvent = jest.fn();
Object.defineProperty(window, 'dispatchEvent', {
  value: mockDispatchEvent,
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
    mockDispatchEvent.mockClear();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useContestantVoting(mockContestant));

    expect(result.current.hasVoted).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.canVote).toBe(true);
  });

  it('submits vote successfully', async () => {
    const { apiUtils } = require('@/utils/api');
    apiUtils.submitVote.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useContestantVoting(mockContestant));

    await act(async () => {
      await result.current.submitVote();
    });

    expect(apiUtils.submitVote).toHaveBeenCalledWith(mockContestant.id);
    expect(result.current.hasVoted).toBe(true);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles vote submission error', async () => {
    const { apiUtils } = require('@/utils/api');
    apiUtils.submitVote.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useContestantVoting(mockContestant));

    await act(async () => {
      await result.current.submitVote();
    });

    expect(result.current.error).toBe('Network error. Please try again.');
    expect(result.current.hasVoted).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('prevents voting when already voted', async () => {
    const { apiUtils } = require('@/utils/api');
    apiUtils.submitVote.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useContestantVoting(mockContestant));

    // First vote
    await act(async () => {
      await result.current.submitVote();
    });

    // Second vote attempt
    await act(async () => {
      await result.current.submitVote();
    });

    expect(apiUtils.submitVote).toHaveBeenCalledTimes(1);
    expect(result.current.hasVoted).toBe(true);
  });

  it('updates canVote state correctly', async () => {
    const { apiUtils } = require('@/utils/api');
    apiUtils.submitVote.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useContestantVoting(mockContestant));

    expect(result.current.canVote).toBe(true);

    await act(async () => {
      await result.current.submitVote();
    });

    expect(result.current.canVote).toBe(false);
  });
});
