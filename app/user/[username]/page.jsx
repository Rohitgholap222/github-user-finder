import Link from "next/link";
import Image from "next/image";

export default async function UserProfile({ params }) {
  const { username } = await params;

  let user = null;
  let repos = [];
  let notFound = false;

  try {
    // Fetch both user data and their latest 10 repositories concurrently
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 60 } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=10&sort=updated`, { next: { revalidate: 60 } })
    ]);

    if (!userRes.ok) {
      notFound = true;
    } else {
      user = await userRes.json();
      if (reposRes.ok) {
        repos = await reposRes.json();
      }
    }
  } catch (err) {
    notFound = true;
  }

  // Gracefully handle "User Not Found" state
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
      <div className="relative z-10 w-full max-w-3xl mt-8 sm:mt-16 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-8 rounded-3xl shadow-2xl">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Search
        </Link>
        
        {/* User Card Area */}
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start mb-12 border-b border-gray-200 dark:border-zinc-800 pb-12">
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
            
            <div className="mt-8 flex justify-center sm:justify-start">
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-zinc-200 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.1-1.46-1.1-1.46-.92-.62.07-.6.07-.6 1.02.07 1.55 1.05 1.55 1.05.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
                View Profile on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Repositories Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            Recent Repositories
          </h2>
          
          {repos.length === 0 ? (
            <p className="text-gray-500 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-6 text-center">
              This user hasn't published any public repositories yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map(repo => (
                <a 
                  key={repo.id} 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-colors shadow-sm hover:shadow-md"
                >
                  <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2 truncate">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4 line-clamp-2 h-10">
                    {repo.description || "No description provided."}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-zinc-400 mt-auto">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-yellow-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12.63 2c-.36 0-.69.21-.86.53l-3 5.47H6V6c0-1.1-.9-2-2-2s-2 .9-2 2v1c0 .92.64 1.7 1.5 1.92v2.16C3.5 11.08 3.5 11.54 3.5 12v3c0 1.1.9 2 2 2s2-.9 2-2v-3c0-.46 0-.92.01-.9l1.41-1.42c.86-.87 2.04-1.37 3.26-1.37h.19l.1 1.09c.12 1.34 1.25 2.39 2.6 2.45l.13.01c.21 0 .4-.03.59-.07v2.16c-.86.22-1.5 1-1.5 1.92v1c0 1.1.9 2 2 2s2-.9 2-2v-1c0-.92-.64-1.7-1.5-1.92v-2.13C16.96 15.54 18 13.88 18 12V9.38l-4.52-4.53v1.65c-.86.22-1.5 1-1.5 1.92v1c0 .92.64 1.7 1.5 1.92V11c0 1.1.9 2 2 2s2-.9 2-2V9.38l-4.53-4.53c0 .03 0 .07 0 .1v3.91l-1.1-2.02c-.17-.32-.5-.53-.86-.53z"/></svg>
                      {repo.forks_count}
                    </div>
                    {repo.language && (
                      <div className="flex items-center ml-auto">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5"></span>
                        {repo.language}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}