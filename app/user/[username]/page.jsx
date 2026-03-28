import Link from "next/link";
import Image from "next/image";

export default async function UserProfile({ params }) {
  const { username } = await params;

  let user = null;
  let notFound = false;

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      notFound = true;
    } else {
      user = await res.json();
    }
  } catch (err) {
    notFound = true;
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-red-200 dark:border-red-900/30 p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">User Not Found</h2>
          <p className="text-gray-500 dark:text-zinc-400 mb-6">We couldn't find a GitHub user matching "{username}".</p>
          <Link href="/" className="inline-block w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3 px-4 rounded-xl shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 sm:p-8 flex justify-center items-start">
      <div className="relative z-10 w-full max-w-2xl mt-8 sm:mt-16 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-8 rounded-3xl shadow-2xl">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Search
        </Link>
        
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-blue-500/20 shadow-xl bg-gray-200 dark:bg-zinc-800">
              {user.avatar_url && (
                <img
                  src={user.avatar_url}
                  alt={`${user.login}'s avatar`}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              {user.name || user.login}
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">@{user.login}</p>
            {user.bio && (
              <p className="text-gray-600 dark:text-zinc-400 mb-6 leading-relaxed">
                {user.bio}
              </p>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-100 dark:bg-zinc-950/50 rounded-2xl p-4 text-center border border-gray-200 dark:border-zinc-800">
                <span className="block text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.public_repos}</span>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Repos</span>
              </div>
              <div className="bg-gray-100 dark:bg-zinc-950/50 rounded-2xl p-4 text-center border border-gray-200 dark:border-zinc-800">
                <span className="block text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.followers}</span>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Followers</span>
              </div>
              <div className="bg-gray-100 dark:bg-zinc-950/50 rounded-2xl p-4 text-center border border-gray-200 dark:border-zinc-800">
                <span className="block text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.following}</span>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Following</span>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center sm:justify-start">
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-zinc-200 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.1-1.46-1.1-1.46-.92-.62.07-.6.07-.6 1.02.07 1.55 1.05 1.55 1.05.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}