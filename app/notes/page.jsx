"use client";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes
  useEffect(() => {
    fetch("/api/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  // Save note
  const saveNote = async () => {
    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    });

    setTitle("");
    setContent("");

    // reload notes
    const res = await fetch("/api/notes");
    setNotes(await res.json());
  };

  return (
    <div>
      <h1>Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button onClick={saveNote}>Save Note</button>

      <hr />

      {notes.map(note => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}