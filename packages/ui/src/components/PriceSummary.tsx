import React from 'react';
import { Tag, Info } from 'lucide-react';

interface PriceItem {
  label: string;
  amount: number;
  description?: string;
}

interface PriceSummaryProps {
  basePrice: number;
  items?: PriceItem[];
  taxRate?: number;
  discount?: number;
  currency?: string;
  onCheckout?: () => void;
  sticky?: boolean;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({ 
  basePrice, 
  items = [],
  taxRate = 0.1,
  discount = 0,
  currency = 'USD',
  onCheckout,
  sticky = true
}) => {
  const addOnsTotal = items.reduce((sum, item) => sum + item.amount, 0);
  const subtotal = basePrice + addOnsTotal;
  const discountAmount = discount > 0 ? subtotal * (discount / 100) : 0;
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * taxRate;
  const total = afterDiscount + tax;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className={`${sticky ? 'sticky top-24' : ''}`}>
      <div className="glass rounded-lg p-6 space-y-4 light:bg-white light:shadow-lg light:border light:border-gray-200">
        <h3 className="text-xl font-bold mb-4 light:text-gray-900">Price Summary</h3>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-primary-lighter light:text-gray-600">Base Price</span>
            <span className="font-medium light:text-gray-900">{formatPrice(basePrice)}</span>
          </div>

          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-primary-lighter light:text-gray-600">{item.label}</span>
                {item.description && (
                  <div className="group relative">
                    <Info size={14} className="text-primary-lighter cursor-help light:text-gray-400" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 glass-dark rounded p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 light:bg-gray-900 light:text-white">
                      {item.description}
                    </div>
                  </div>
                )}
              </div>
              <span className="font-medium light:text-gray-900">{formatPrice(item.amount)}</span>
            </div>
          ))}

          <div className="border-t border-glass pt-3 light:border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-primary-lighter light:text-gray-600">Subtotal</span>
              <span className="font-medium light:text-gray-900">{formatPrice(subtotal)}</span>
            </div>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-400">
              <div className="flex items-center gap-1">
                <Tag size={14} />
                <span>Discount ({discount}%)</span>
              </div>
              <span className="font-medium">-{formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-primary-lighter light:text-gray-600">Tax ({taxRate * 100}%)</span>
            <span className="font-medium light:text-gray-900">{formatPrice(tax)}</span>
          </div>
        </div>

        <div className="border-t-2 border-primary pt-4 light:border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold light:text-gray-900">Total</span>
            <span className="text-2xl font-bold text-primary light:text-primary">{formatPrice(total)}</span>
          </div>

          {onCheckout && (
            <button
              onClick={onCheckout}
              className="w-full px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-light transition-all font-medium"
            >
              Proceed to Checkout
            </button>
          )}
        </div>

        <p className="text-xs text-primary-lighter text-center light:text-gray-500">
          Final price may vary based on availability
        </p>
      </div>
    </div>
  );
};
