import { useState, useEffect, useCallback } from 'react';
import { LiveData, ErrorState } from '@/types';
import { apiUtils } from '@/utils/api';

export const useLiveData = (pollingInterval: number = 5000) => {
  const [data, setData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: '',
  });

  const fetchData = useCallback(async () => {
    try {
      setError({ hasError: false, message: '' });
      const response = await apiUtils.fetchLiveData();

      if (response.success) {
        setData(response.data);
      } else {
        setError({
          hasError: true,
          message: response.error || 'Failed to fetch live data',
          retry: fetchData,
        });
      }
    } catch (err) {
      setError({
        hasError: true,
        message: 'Network error. Please check your connection.',
        retry: fetchData,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Set up polling
    const interval = setInterval(fetchData, pollingInterval);

    return () => clearInterval(interval);
  }, [fetchData, pollingInterval]);

  const retry = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    retry,
  };
};
