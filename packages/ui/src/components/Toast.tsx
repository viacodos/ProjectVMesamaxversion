import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-primary'
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 glass-dark rounded-lg shadow-glass-lg p-4 flex items-center space-x-3 animate-fade-in max-w-md light:bg-white light:shadow-2xl">
      <div className={`${colors[type]} p-1 rounded-full`}>
        {icons[type]}
      </div>
      <p className="flex-1 text-sm light:text-gray-900">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-glass rounded transition-colors light:hover:bg-gray-100">
        <X size={16} />
      </button>
    </div>
  );
};
