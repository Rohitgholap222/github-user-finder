export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-zinc-800 border-t-blue-500 rounded-full animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fetching Developer Data...</h2>
      </div>
    </div>
  );
}
