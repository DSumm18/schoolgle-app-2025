import React from 'react';

type LoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
};

export function Loading({ 
  size = 'md', 
  color = 'currentColor',
  className = ''
}: LoadingProps) {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg
        className={`animate-spin ${sizeMap[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loading size="lg" className="mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  );
}