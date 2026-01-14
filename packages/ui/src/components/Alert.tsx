import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', title, children, onClose }) => {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />
  };

  const styles = {
    success: 'bg-green-500/10 border-green-500 text-green-400 light:bg-green-50 light:text-green-800',
    error: 'bg-red-500/10 border-red-500 text-red-400 light:bg-red-50 light:text-red-800',
    warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-400 light:bg-yellow-50 light:text-yellow-800',
    info: 'bg-primary/10 border-primary text-primary-lighter light:bg-blue-50 light:text-blue-800'
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${styles[type]}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button onClick={onClose} className="flex-shrink-0 hover:opacity-70 transition-opacity">
            <XCircle size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
