import React from 'react';

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  locale?: string;
  originalAmount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCurrency?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  amount, 
  currency = 'USD',
  locale = 'en-US',
  originalAmount,
  size = 'md',
  showCurrency = true
}) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat(locale, {
      style: showCurrency ? 'currency' : 'decimal',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  const sizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-3xl'
  };

  const discount = originalAmount ? Math.round(((originalAmount - amount) / originalAmount) * 100) : 0;

  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold ${sizes[size]} light:text-gray-900`}>
        {formatPrice(amount)}
      </span>
      {originalAmount && originalAmount > amount && (
        <>
          <span className={`line-through text-primary-lighter light:text-gray-500 ${size === 'lg' ? 'text-xl' : size === 'md' ? 'text-base' : 'text-xs'}`}>
            {formatPrice(originalAmount)}
          </span>
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
};
