import React from 'react';
import { Check, X } from 'lucide-react';

interface ComparisonItem {
  id: string;
  name: string;
  price: number;
  features: { [key: string]: boolean | string | number };
  highlighted?: boolean;
}

interface ComparisonTableProps {
  items: ComparisonItem[];
  featureLabels: { [key: string]: string };
  onSelect?: (id: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ 
  items, 
  featureLabels,
  onSelect 
}) => {
  const renderValue = (value: boolean | string | number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="text-green-500 mx-auto" size={20} />
      ) : (
        <X className="text-red-500 mx-auto" size={20} />
      );
    }
    return <span className="light:text-gray-900">{value}</span>;
  };

  return (
    <div className="glass rounded-lg overflow-hidden light:bg-white light:shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primary-dark light:bg-gray-100">
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary-lighter light:text-gray-700">
                Feature
              </th>
              {items.map((item) => (
                <th
                  key={item.id}
                  className={`px-6 py-4 text-center text-sm font-semibold ${
                    item.highlighted 
                      ? 'bg-primary text-white' 
                      : 'text-primary-lighter light:text-gray-700'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span>{item.name}</span>
                    <span className="text-lg font-bold">${item.price}</span>
                    {item.highlighted && (
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">Popular</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-glass light:divide-gray-200">
            {Object.entries(featureLabels).map(([key, label]) => (
              <tr key={key} className="hover:bg-glass-light transition-colors light:hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium light:text-gray-900">{label}</td>
                {items.map((item) => (
                  <td key={item.id} className="px-6 py-4 text-sm text-center">
                    {renderValue(item.features[key])}
                  </td>
                ))}
              </tr>
            ))}
            {onSelect && (
              <tr>
                <td className="px-6 py-4"></td>
                {items.map((item) => (
                  <td key={item.id} className="px-6 py-4 text-center">
                    <button
                      onClick={() => onSelect(item.id)}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        item.highlighted
                          ? 'bg-primary text-white hover:bg-primary-light'
                          : 'glass text-primary-lighter hover:bg-primary-dark light:bg-gray-100 light:text-gray-700 light:hover:bg-gray-200'
                      }`}
                    >
                      Select
                    </button>
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
