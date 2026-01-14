import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-primary-darkest/80 backdrop-blur-sm light:bg-black/50"
        onClick={onClose}
      />
      <div className="relative glass-dark rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto light:bg-white light:shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-glass light:border-gray-200">
          {title && <h2 className="text-2xl font-bold light:text-gray-900">{title}</h2>}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:glass transition-all light:hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
