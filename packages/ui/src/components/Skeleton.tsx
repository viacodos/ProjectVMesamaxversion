import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  variant = 'rectangular'
}) => {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  return (
    <div 
      className={`${width} ${height} ${variants[variant]} glass animate-pulse light:bg-gray-200 ${className}`}
    />
  );
};
