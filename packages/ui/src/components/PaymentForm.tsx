import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { Input } from './Input';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  onSubmit: (paymentData: PaymentData) => Promise<void>;
  bookingId?: string;
}

interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  bookingId?: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  currency = 'USD',
  onSubmit,
  bookingId
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<PaymentData>>({});
  const [formData, setFormData] = useState<PaymentData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    bookingId
  });

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
  };

  const validate = (): boolean => {
    const newErrors: Partial<PaymentData> = {};
    
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!formData.cardName) {
      newErrors.cardName = 'Cardholder name is required';
    }
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="glass rounded-lg p-4 flex items-center justify-between light:bg-gray-50">
        <span className="text-sm text-primary-lighter light:text-gray-600">Total Amount</span>
        <span className="text-2xl font-bold light:text-gray-900">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)}
        </span>
      </div>

      <Input
        label="Card Number"
        type="text"
        placeholder="1234 5678 9012 3456"
        value={formData.cardNumber}
        onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
        error={errors.cardNumber}
        maxLength={19}
      />

      <Input
        label="Cardholder Name"
        type="text"
        placeholder="John Doe"
        value={formData.cardName}
        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
        error={errors.cardName}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry Date"
          type="text"
          placeholder="MM/YY"
          value={formData.expiryDate}
          onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
          error={errors.expiryDate}
          maxLength={5}
        />
        <Input
          label="CVV"
          type="text"
          placeholder="123"
          value={formData.cvv}
          onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
          error={errors.cvv}
          maxLength={4}
        />
      </div>

      <div className="flex items-center gap-2 text-xs text-primary-lighter light:text-gray-600">
        <Lock size={14} />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-light disabled:opacity-50 transition-all font-medium"
      >
        <CreditCard size={20} />
        {loading ? 'Processing...' : `Pay ${new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)}`}
      </button>
    </form>
  );
};
