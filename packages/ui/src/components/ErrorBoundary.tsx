import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-8 max-w-md w-full text-center light:bg-white light:shadow-2xl">
            <AlertCircle className="mx-auto mb-4 text-red-400" size={64} />
            <h1 className="text-2xl font-bold mb-2 light:text-gray-900">
              Oops! Our travel engine is resting
            </h1>
            <p className="text-primary-lighter mb-6 light:text-gray-600">
              Something went wrong while planning your perfect trip. Don't worry, we're on it!
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-primary-lighter hover:text-white transition-colors light:text-gray-600 light:hover:text-primary">
                  Technical details
                </summary>
                <pre className="mt-2 p-3 glass rounded text-xs overflow-auto light:bg-gray-50 light:text-gray-800">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-light transition-all font-medium"
            >
              <RefreshCw size={20} />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
