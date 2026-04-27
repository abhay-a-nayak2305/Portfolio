import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-bg-dark rounded-xl border border-gray-800">
          <h2 className="text-2xl font-display font-bold text-accent-terracotta mb-4">Something went wrong</h2>
          <p className="text-ink-secondary mb-6 italic">We encountered an error while loading this section.</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-ethereal btn-ethereal-primary"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
