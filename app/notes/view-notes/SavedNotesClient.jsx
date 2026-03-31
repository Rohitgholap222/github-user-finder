"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const SavedNotesClient = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notes
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 sm:p-8 flex flex-col items-center">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mt-8">
        <div className="w-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-linear-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mr-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Saved Notes</h1>
              <p className="text-sm text-gray-500 dark:text-zinc-400">View your archived database entries.</p>
            </div>
            <Link 
              href="/notes"
              className="ml-auto bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              + Create New
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p className="text-gray-500 font-medium">Loading your notes...</p>
              </div>
            ) : notes.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl bg-white/30 dark:bg-zinc-900/10">
                <p className="text-gray-500 dark:text-zinc-400 font-medium mb-4">No saved notes found.</p>
                <Link href="/notes" className="text-indigo-500 font-bold hover:underline">
                  Create your first note
                </Link>
              </div>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="group relative bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-md text-left flex flex-col gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       {note.title && (
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                          {note.title}
                        </h3>
                      )}
                      <span className="text-[10px] bg-gray-200 dark:bg-zinc-800 px-2 py-1 rounded text-gray-500 uppercase font-bold tracking-widest leading-none">
                        #{note.id}
                      </span>
                    </div>
                    {note.content && (
                      <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed wrap-break-word whitespace-pre-wrap">
                        {note.content}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedNotesClient;
