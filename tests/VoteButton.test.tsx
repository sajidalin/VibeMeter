import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VoteButton } from '@/components/VoteButton';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { storageUtils } from '@/utils/storage';

// Mock the hooks and utilities
jest.mock('@/hooks/useLocalStorage');
jest.mock('@/utils/storage');

const mockUseLocalStorage = useLocalStorage as jest.MockedFunction<
  typeof useLocalStorage
>;
const mockStorageUtils = storageUtils as jest.Mocked<typeof storageUtils>;

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

describe('VoteButton', () => {
  const defaultProps = {
    hasVoted: false,
    isSubmitting: false,
    error: null,
    onSubmit: jest.fn(),
    disabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
    localStorageMock.removeItem.mockImplementation(() => {});
  });

  it('renders vote button correctly', () => {
    render(<VoteButton {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /vote for contestant/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Vote Now')).toBeInTheDocument();
  });

  it('calls onSubmit when clicked', () => {
    const mockOnSubmit = jest.fn();
    render(<VoteButton {...defaultProps} onSubmit={mockOnSubmit} />);

    const button = screen.getByRole('button', { name: /vote for contestant/i });
    fireEvent.click(button);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when submitting', () => {
    render(<VoteButton {...defaultProps} isSubmitting={true} />);

    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows voted state when hasVoted is true', () => {
    render(<VoteButton {...defaultProps} hasVoted={true} />);

    expect(screen.getByText('Voted ✓')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Already voted'
    );
  });

  it('is disabled when hasVoted is true', () => {
    render(<VoteButton {...defaultProps} hasVoted={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when isSubmitting is true', () => {
    render(<VoteButton {...defaultProps} isSubmitting={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<VoteButton {...defaultProps} disabled={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('displays error message when error is provided', () => {
    const errorMessage = 'Voting failed';
    render(<VoteButton {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('applies correct styles for different states', () => {
    const { rerender } = render(<VoteButton {...defaultProps} />);

    // Default state - should have gradient styling
    let button = screen.getByRole('button', { name: /vote for contestant/i });
    expect(button).toHaveClass('bg-gradient-to-r');
    expect(button).toHaveClass('from-purple-500');
    expect(button).toHaveClass('to-pink-500');

    // Voted state - should have secondary variant
    rerender(<VoteButton {...defaultProps} hasVoted={true} />);
    button = screen.getByRole('button', { name: /already voted/i });
    expect(button).toHaveClass('bg-gradient-to-r');
    expect(button).toHaveClass('from-green-100');
    expect(button).toHaveClass('to-emerald-100');
  });

  it('shows loading spinner when submitting', () => {
    render(<VoteButton {...defaultProps} isSubmitting={true} />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });
});

describe('VoteButton with localStorage persistence', () => {
  const mockUpdateVotingState = jest.fn();
  const mockHasVotedForContestant = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});

    // Setup default mock implementation
    mockUseLocalStorage.mockReturnValue({
      votingState: { hasVoted: false, votedFor: null, voteTimestamp: null },
      updateVotingState: mockUpdateVotingState,
      hasVotedForContestant: mockHasVotedForContestant,
      clearVotingState: jest.fn(),
    });
  });

  it('remains disabled after voting and shows voted state', async () => {
    const mockOnSubmit = jest.fn();

    // Initial render - button should be enabled
    mockHasVotedForContestant.mockReturnValue(false);

    const { rerender } = render(
      <VoteButton
        hasVoted={false}
        isSubmitting={false}
        error={null}
        onSubmit={mockOnSubmit}
        disabled={false}
      />
    );

    let button = screen.getByRole('button', { name: /vote for contestant/i });
    expect(button).toBeEnabled();

    // Simulate voting
    fireEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);

    // After voting - button should be disabled and show voted state
    rerender(
      <VoteButton
        hasVoted={true}
        isSubmitting={false}
        error={null}
        onSubmit={mockOnSubmit}
        disabled={false}
      />
    );

    button = screen.getByRole('button', { name: /already voted/i });
    expect(button).toBeDisabled();
    expect(screen.getByText('Voted ✓')).toBeInTheDocument();
  });

  it('stays disabled after page reload when user has previously voted', () => {
    // Simulate localStorage having a previous vote
    const previousVoteState = {
      hasVoted: true,
      votedFor: 'contestant-1',
      voteTimestamp: Date.now(),
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(previousVoteState));
    mockHasVotedForContestant.mockReturnValue(true);
    mockStorageUtils.getVotingState.mockReturnValue(previousVoteState);

    render(
      <VoteButton
        hasVoted={true}
        isSubmitting={false}
        error={null}
        onSubmit={jest.fn()}
        disabled={false}
      />
    );

    const button = screen.getByRole('button', { name: /already voted/i });
    expect(button).toBeDisabled();
    expect(screen.getByText('Voted ✓')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Already voted');
  });

  it('shows voted state when hasVotedForContestant returns true', () => {
    const storedVoteState = {
      hasVoted: true,
      votedFor: 'contestant-1',
      voteTimestamp: Date.now(),
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedVoteState));
    mockStorageUtils.getVotingState.mockReturnValue(storedVoteState);
    mockHasVotedForContestant.mockReturnValue(true);

    render(
      <VoteButton
        hasVoted={true}
        isSubmitting={false}
        error={null}
        onSubmit={jest.fn()}
        disabled={false}
      />
    );

    expect(screen.getByText('Voted ✓')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('handles localStorage errors gracefully and shows default state', () => {
    // Simulate localStorage error
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });
    mockStorageUtils.getVotingState.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    render(
      <VoteButton
        hasVoted={false}
        isSubmitting={false}
        error={null}
        onSubmit={jest.fn()}
        disabled={false}
      />
    );

    // Should still render the button in default state
    expect(
      screen.getByRole('button', { name: /vote for contestant/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Vote Now')).toBeInTheDocument();
  });

  it('prevents multiple votes for the same contestant', async () => {
    const mockOnSubmit = jest.fn();

    // Simulate user has already voted
    mockHasVotedForContestant.mockReturnValue(true);

    render(
      <VoteButton
        hasVoted={true}
        isSubmitting={false}
        error={null}
        onSubmit={mockOnSubmit}
        disabled={false}
      />
    );

    const button = screen.getByRole('button', { name: /already voted/i });

    // Try to click the disabled button
    fireEvent.click(button);

    // onSubmit should not be called since button is disabled
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('persists vote state across page reloads', () => {
    const voteState = {
      hasVoted: true,
      votedFor: 'contestant-1',
      voteTimestamp: Date.now(),
    };

    // Simulate localStorage persistence
    localStorageMock.getItem.mockReturnValue(JSON.stringify(voteState));
    mockStorageUtils.getVotingState.mockReturnValue(voteState);
    mockHasVotedForContestant.mockReturnValue(true);

    // Render component (simulating page load with existing vote)
    render(
      <VoteButton
        hasVoted={true}
        isSubmitting={false}
        error={null}
        onSubmit={jest.fn()}
        disabled={false}
      />
    );

    const button = screen.getByRole('button', { name: /already voted/i });
    expect(button).toBeDisabled();
    expect(screen.getByText('Voted ✓')).toBeInTheDocument();
  });
});
