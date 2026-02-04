'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl mb-4">Something went wrong</h2>
        <p className="text-sm text-lavender mb-4">
          {error.digest && `Error ID: ${error.digest}`}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 border rounded hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
