"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NoteCreateClient = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Save note
  const saveNote = async (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    setIsLoading(true);
    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    setIsLoading(false);
    
    // Redirect to view page
    router.push("/notes/view-notes");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 sm:p-8 flex flex-col items-center">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-amber-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mt-8">        
        <div className="w-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-linear-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mr-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Create Note</h1>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Save a new developer thought to the database.</p>
            </div>
            <Link 
              href="/notes/view-notes"
              className="ml-auto bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 text-xs font-bold px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-200 transition-colors"
            >
              View Saved
            </Link>
          </div>

          <form onSubmit={saveNote} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Give your note a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-100 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-400 font-semibold"
            />
            <textarea
              placeholder="What's on your mind?..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              className="w-full bg-gray-100 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-400 resize-none"
            />
            <div className="flex justify-end mt-4">
              <button 
                type="submit"
                disabled={isLoading || (!title.trim() && !content.trim())}
                className="bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold py-4 px-10 rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap flex items-center gap-2"
              >
                {isLoading ? (
                   <>
                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     Saving Note...
                   </>
                ) : 'Save Permanently'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteCreateClient;
