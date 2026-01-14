import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-light border-t-transparent light:border-primary light:border-t-transparent"></div>
    </div>
  );
};
