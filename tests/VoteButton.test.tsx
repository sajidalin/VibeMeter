import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VoteButton } from '@/components/VoteButton';

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
