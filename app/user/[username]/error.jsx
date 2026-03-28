"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-red-200 dark:border-red-900/30 p-8 rounded-3xl shadow-2xl text-center">
        <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
        <p className="text-gray-500 dark:text-zinc-400 mb-6 font-medium">An unexpected error occurred while fetching the profile.</p>

        <div className="flex gap-4 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] mt-0 flex items-center justify-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
