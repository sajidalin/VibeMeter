import { LiveData, Contestant, ApiResponse } from '@/types';

// Simulated API delay
const API_DELAY = 1000;

// Mock data for contestants
const mockContestants: Contestant[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    talent: 'Opera Singer',
    imageUrl: '/api/placeholder/150/150',
    voteCount: 1247,
    isActive: true,
  },
  {
    id: '2',
    name: 'Mike Chen',
    talent: 'Magic & Illusion',
    imageUrl: '/api/placeholder/150/150',
    voteCount: 892,
    isActive: true,
  },
  {
    id: '3',
    name: 'Dance Crew Elite',
    talent: 'Contemporary Dance',
    imageUrl: '/api/placeholder/150/150',
    voteCount: 2156,
    isActive: true,
  },
  {
    id: '4',
    name: 'Alex Rivera',
    talent: 'Stand-up Comedy',
    imageUrl: '/api/placeholder/150/150',
    voteCount: 743,
    isActive: true,
  },
  {
    id: '5',
    name: 'The Acrobats',
    talent: 'Acrobatic Performance',
    imageUrl: '/api/placeholder/150/150',
    voteCount: 1689,
    isActive: true,
  },
];

// Simulate live vote updates
let currentVoteCounts = new Map(mockContestants.map(c => [c.id, c.voteCount]));

export const apiUtils = {
  // Simulate fetching live data
  fetchLiveData: async (): Promise<ApiResponse<LiveData>> => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, API_DELAY));

      // Simulate random vote updates
      currentVoteCounts.forEach((count, id) => {
        const randomIncrease = Math.floor(Math.random() * 10) + 1;
        currentVoteCounts.set(id, count + randomIncrease);
      });

      const updatedContestants = mockContestants.map(contestant => ({
        ...contestant,
        voteCount: currentVoteCounts.get(contestant.id) || contestant.voteCount,
      }));

      const totalVotes = Array.from(currentVoteCounts.values()).reduce(
        (sum, count) => sum + count,
        0
      );

      return {
        data: {
          contestants: updatedContestants,
          totalVotes,
          votingWindow: {
            isOpen: true,
            startTime: Date.now() - 3600000, // 1 hour ago
            endTime: Date.now() + 7200000, // 2 hours from now
          },
        },
        success: true,
      };
    } catch (error) {
      return {
        data: {
          contestants: [],
          totalVotes: 0,
          votingWindow: {
            isOpen: false,
            startTime: 0,
            endTime: 0,
          },
        },
        success: false,
        error: 'Failed to fetch live data',
      };
    }
  },

  // Simulate submitting a vote
  submitVote: async (
    contestantId: string
  ): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Simulate vote submission
      const currentCount = currentVoteCounts.get(contestantId) || 0;
      currentVoteCounts.set(contestantId, currentCount + 1);

      return {
        data: { success: true },
        success: true,
      };
    } catch (error) {
      return {
        data: { success: false },
        success: false,
        error: 'Failed to submit vote',
      };
    }
  },

  // Reset vote counts for testing
  resetVoteCounts: () => {
    currentVoteCounts = new Map(mockContestants.map(c => [c.id, c.voteCount]));
  },
};
