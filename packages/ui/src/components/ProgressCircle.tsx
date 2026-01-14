import React from 'react';

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ 
  percentage, 
  size = 120,
  strokeWidth = 8,
  showLabel = true,
  color = 'primary'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    primary: '#0A7075',
    success: '#22c55e',
    warning: '#eab308',
    danger: '#ef4444'
  };

  const getColor = () => {
    if (color !== 'primary') return colors[color];
    if (percentage >= 80) return colors.success;
    if (percentage >= 50) return colors.primary;
    if (percentage >= 30) return colors.warning;
    return colors.danger;
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-glass light:text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold light:text-gray-900">{Math.round(percentage)}%</span>
          <span className="text-xs text-primary-lighter light:text-gray-600">Match</span>
        </div>
      )}
    </div>
  );
};
