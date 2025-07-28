import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8 sm:w-10 sm:h-10',
    large: 'w-12 h-12 sm:w-16 sm:h-16',
  };

  return (
    <div className={cn('flex justify-center items-center', className)}>
      <div
        className={cn(
          sizeClasses[size],
          'border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin relative'
        )}
        role='status'
        aria-label='Loading'
      >
        {/* Gradient overlay */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse' />
      </div>
    </div>
  );
};
