import React, { useState } from 'react';
import { FileText, Download, Eye, Loader } from 'lucide-react';

interface PDFPreviewProps {
  packageId: string;
  apiEndpoint?: string;
  title?: string;
  showPreview?: boolean;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ 
  packageId, 
  apiEndpoint = '/api/packages/generate-pdf',
  title = 'Itinerary',
  showPreview = false
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${apiEndpoint}/${packageId}`);
      
      if (!response.ok) throw new Error('Failed to generate PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-${packageId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to download PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    window.open(`${apiEndpoint}/${packageId}`, '_blank');
  };

  return (
    <div className="glass rounded-lg p-4 light:bg-white light:border light:border-gray-200">
      <div className="flex items-center gap-3">
        <FileText className="text-primary-lighter light:text-gray-400" size={32} />
        <div className="flex-1">
          <h4 className="font-semibold light:text-gray-900">{title}</h4>
          <p className="text-xs text-primary-lighter light:text-gray-600">PDF Document</p>
        </div>
        <div className="flex gap-2">
          {showPreview && (
            <button
              onClick={handlePreview}
              disabled={loading}
              className="p-2 rounded-lg glass hover:bg-primary-dark transition-all disabled:opacity-50 light:bg-gray-100 light:hover:bg-gray-200"
              aria-label="Preview PDF"
            >
              <Eye size={20} />
            </button>
          )}
          <button
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>Download</span>
              </>
            )}
          </button>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
};
