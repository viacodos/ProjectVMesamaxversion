import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glass = true }) => {
  return (
    <div className={`rounded-xl p-6 ${glass ? 'glass' : 'bg-primary-dark dark:bg-primary-dark light:bg-white light:shadow-lg'} ${className}`}>
      {children}
    </div>
  );
};
