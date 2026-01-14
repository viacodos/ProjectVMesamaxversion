import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  max = 100, 
  size = 'md',
  showLabel = false,
  color = 'primary'
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const colors = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  };

  return (
    <div className="w-full">
      <div className={`w-full glass rounded-full overflow-hidden ${sizes[size]} light:bg-gray-200`}>
        <div
          className={`h-full ${colors[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-primary-lighter light:text-gray-600 mt-1">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
};
