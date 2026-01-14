import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description, 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-primary-lighter light:text-gray-400 mb-4">
        {icon || <Inbox size={48} />}
      </div>
      <h3 className="text-xl font-semibold mb-2 light:text-gray-900">{title}</h3>
      {description && (
        <p className="text-primary-lighter light:text-gray-600 mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};
