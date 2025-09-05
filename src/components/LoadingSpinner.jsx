import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  text = '', 
  className = '',
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-text-secondary',
    white: 'text-white',
    accent: 'text-accent'
  };

  const spinner = (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        <Loader2 
          className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`} 
        />
        {text && (
          <p className={`text-sm ${colorClasses[color]} animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-bg bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-surface rounded-lg shadow-card p-8">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

// Inline loading spinner for buttons
export const ButtonSpinner = ({ size = 'sm', className = '' }) => (
  <Loader2 className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} animate-spin ${className}`} />
);

// Loading overlay for components
export const LoadingOverlay = ({ isLoading, children, text = 'Loading...' }) => {
  if (!isLoading) return children;

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-surface bg-opacity-75 rounded-lg">
        <LoadingSpinner text={text} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
