export interface Contestant {
  id: string;
  name: string;
  talent: string;
  imageUrl: string;
  voteCount: number;
  isActive: boolean;
}

export interface Vote {
  contestantId: string;
  timestamp: number;
  userId?: string;
}

export interface VotingState {
  hasVoted: boolean;
  votedFor: string | null;
  voteTimestamp: number | null;
}

export interface LiveData {
  contestants: Contestant[];
  totalVotes: number;
  votingWindow: {
    isOpen: boolean;
    startTime: number;
    endTime: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
  retry?: () => void;
}
