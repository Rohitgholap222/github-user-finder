import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM notes ORDER BY id ASC");
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, content } = await request.json();

    await db.query(
      "INSERT INTO notes (title, content) VALUES (?, ?)",
      [title, content]
    );

    return Response.json({ message: "Note saved" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}