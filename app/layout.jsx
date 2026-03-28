import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Github User Finder",
  description: "Find Github Users effortlessly",
};

import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-zinc-950">
        
        {/* Global Floating Navigation Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 pointer-events-none">
          <nav className="pointer-events-auto bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 shadow-lg rounded-full px-6 py-3 flex items-center gap-6 overflow-x-auto max-w-full">
            <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub Finder
            </Link>
            
            <div className="w-px h-4 bg-gray-300 dark:bg-zinc-700 hidden sm:block"></div>
            
            <Link href="/calculator" className="flex items-center text-sm font-semibold text-gray-600 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14"/><line x1="12" y1="14" x2="12.01" y2="14"/><line x1="16" y1="14" x2="16.01" y2="14"/><line x1="8" y1="18" x2="8.01" y2="18"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="18" x2="16.01" y2="18"/></svg>
              Calculator
            </Link>
            
            <Link href="/notes" className="flex items-center text-sm font-semibold text-gray-600 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap">
              <svg className="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>
              Notes
            </Link>

            <Link href="/weather-check" className="flex items-center text-sm font-semibold text-gray-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap">
              <svg className="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M12 7v1"/></svg>
              Weather
            </Link>

            {/* Ready for future features! Just add another <Link> here */}
          </nav>
        </header>

        <main className="flex-1 pt-20 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
