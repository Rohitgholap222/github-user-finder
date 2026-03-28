"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Load notes from localStorage on first render
  useEffect(() => {
    setIsMounted(true);
    const savedNotes = localStorage.getItem("github-finder-notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse notes");
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("github-finder-notes", JSON.stringify(notes));
    }
  }, [notes, isMounted]);

  const addNote = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;
    
    const newNote = {
      id: crypto.randomUUID(),
      text: inputText.trim(),
      date: new Date().toLocaleDateString()
    };
    
    setNotes([newNote, ...notes]);
    setInputText("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Prevent hydration mismatch by returning null or a skeleton before mount
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 sm:p-8 flex flex-col items-center">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-amber-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mt-8">        
        <div className="w-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-linear-to-tr from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg mr-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Quick Notes</h1>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Jot down your developer thoughts here.</p>
            </div>
            <div className="ml-auto bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 text-xs font-bold px-3 py-1 rounded-full border border-gray-200 dark:border-zinc-700">
              {notes.length} Notes
            </div>
          </div>

          <form onSubmit={addNote} className="flex flex-col sm:flex-row gap-3 mb-8">
            <input
              type="text"
              placeholder="What's on your mind?..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-100 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-gray-400"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="bg-linear-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              Add Note
            </button>
          </form>

          <div className="flex flex-col gap-4">
            {notes.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
                <svg className="w-10 h-10 mx-auto text-gray-300 dark:text-zinc-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <p className="text-gray-500 dark:text-zinc-400 font-medium">No notes yet. Start typing above!</p>
              </div>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="group relative bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-colors shadow-sm text-left flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed wrap-break-word whitespace-pre-wrap">
                      {note.text}
                    </p>
                    <span className="inline-block mt-3 text-xs font-semibold text-gray-400 dark:text-zinc-500">
                      {note.date}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteNote(note.id)}
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-500 hover:text-white transition-colors border border-transparent hover:border-red-600"
                    aria-label="Delete note"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
