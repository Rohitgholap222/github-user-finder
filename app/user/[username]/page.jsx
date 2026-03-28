export default async function UserProfile({ params }) {
  const { username } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center">
        <h1 className="text-4xl font-bold">User Profile</h1>
        <p className="text-lg">Displaying details for user: {username}</p>
        <a href="/" className="mt-4 text-blue-500 hover:underline">
          &larr; Back to Home
        </a>
      </main>
    </div>
  );
}
