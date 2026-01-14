import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  position?: 'left' | 'right';
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  children, 
  isOpen = true, 
  onClose,
  position = 'left'
}) => {
  const positionClasses = position === 'left' ? 'left-0' : 'right-0';
  const translateClasses = position === 'left' 
    ? isOpen ? 'translate-x-0' : '-translate-x-full'
    : isOpen ? 'translate-x-0' : 'translate-x-full';

  return (
    <>
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside className={`fixed ${positionClasses} top-0 h-full w-64 glass-dark z-50 transition-transform duration-300 ${translateClasses} light:bg-white light:border-r light:border-gray-200`}>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:glass transition-all lg:hidden light:hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
        <div className="p-6 h-full overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  );
};
