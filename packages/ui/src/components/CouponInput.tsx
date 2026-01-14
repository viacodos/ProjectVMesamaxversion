import React, { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';

interface CouponInputProps {
  onValidate: (code: string) => Promise<{ valid: boolean; message?: string; discount?: number }>;
  onApply?: (code: string, discount: number) => void;
}

export const CouponInput: React.FC<CouponInputProps> = ({ onValidate, onApply }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [message, setMessage] = useState('');

  const handleValidate = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    setStatus('idle');
    
    try {
      const result = await onValidate(code);
      setStatus(result.valid ? 'valid' : 'invalid');
      setMessage(result.message || '');
      
      if (result.valid && result.discount && onApply) {
        onApply(code, result.discount);
      }
    } catch (error) {
      setStatus('invalid');
      setMessage('Failed to validate coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-lighter light:text-gray-400" size={20} />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className={`w-full pl-10 pr-4 py-3 rounded-lg glass border-2 ${
              status === 'valid' ? 'border-green-500' : status === 'invalid' ? 'border-red-500' : 'border-glass'
            } focus:border-primary-light focus:outline-none transition-colors light:bg-white light:border-gray-300`}
            disabled={loading || status === 'valid'}
          />
          {status === 'valid' && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
          )}
          {status === 'invalid' && (
            <X className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
          )}
        </div>
        <button
          onClick={handleValidate}
          disabled={loading || !code.trim() || status === 'valid'}
          className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
        >
          {loading ? 'Validating...' : status === 'valid' ? 'Applied' : 'Apply'}
        </button>
      </div>
      {message && (
        <p className={`mt-2 text-sm ${status === 'valid' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
};
