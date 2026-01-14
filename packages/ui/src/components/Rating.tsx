import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  readonly?: boolean;
  onChange?: (value: number) => void;
}

export const Rating: React.FC<RatingProps> = ({ 
  value, 
  max = 5, 
  size = 20,
  readonly = true,
  onChange 
}) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <Star
            size={size}
            className={star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 light:text-gray-300'}
          />
        </button>
      ))}
    </div>
  );
};
