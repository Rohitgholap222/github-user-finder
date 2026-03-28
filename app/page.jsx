export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center">
        <h1 className="text-4xl font-bold">GitHub User Finder</h1>
        <p className="text-lg">Search for GitHub users to see their profile details.</p>
        <div className="w-full max-w-sm mt-4">
          {/* Add Search Input Here */}
          <input
            type="text"
            placeholder="Search username..."
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </main>
    </div>
  );
}
