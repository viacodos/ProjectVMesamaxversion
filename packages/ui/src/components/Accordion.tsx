import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    } else {
      setOpenItems(prev => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div key={item.id} className="glass rounded-lg overflow-hidden light:bg-white light:border light:border-gray-200">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-glass-light transition-colors light:hover:bg-gray-50"
            >
              <span className="font-medium light:text-gray-900">{item.title}</span>
              <ChevronDown
                size={20}
                className={`text-primary-lighter transition-transform light:text-gray-600 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="p-4 pt-0 text-primary-lighter light:text-gray-600">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
