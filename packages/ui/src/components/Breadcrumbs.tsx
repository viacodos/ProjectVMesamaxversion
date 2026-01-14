import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={16} className="text-primary-lighter light:text-gray-400" />}
          {item.href ? (
            <a
              href={item.href}
              className="text-primary-lighter hover:text-white transition-colors light:text-gray-600 light:hover:text-primary"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-white font-medium light:text-gray-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
