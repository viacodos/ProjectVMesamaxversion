import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-primary-lighter dark:text-primary-lighter light:text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 rounded-lg glass border-2 ${
          error ? 'border-red-500' : 'border-glass'
        } focus:border-primary-light focus:outline-none transition-colors resize-vertical min-h-[100px] light:bg-white light:border-gray-300 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};
