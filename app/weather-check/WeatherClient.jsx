"use client";
import { useState } from "react";

const WeatherClient = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = async (e) => {
    e?.preventDefault();
    if (!city.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      setWeather(null);

      // Warning: Without a real API Key, this will fail.
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "YOUR_API_KEY";
      
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${apiKey}`
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.cod == 401) {
           setError("Missing Valid API Key! Please add NEXT_PUBLIC_WEATHER_API_KEY to your .env.local file.");
        } else {
           setError(data.message || "City not found");
        }
        return;
      }

      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather data. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-8 rounded-3xl shadow-2xl flex flex-col">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-linear-to-tr from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4 text-white">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M12 7v1"/></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Weather Check</h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400">Instantly check the climate conditions of any global city.</p>
        </div>

        <form onSubmit={getWeather} className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-gray-100 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-gray-400"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading || !city.trim()}
            className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] flex justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : "Search Forecast"}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        {weather && (
          <div className="mt-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">{weather.name}, {weather.sys.country}</h2>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-gray-100 dark:bg-zinc-950/50 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800">
                  <span className="block text-3xl font-light text-gray-900 dark:text-white mb-1">{Math.round(weather.main.temp)}°C</span>
                  <span className="text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">Temperature</span>
               </div>
               
               <div className="bg-gray-100 dark:bg-zinc-950/50 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800">
                  <span className="block text-xl font-medium text-gray-900 dark:text-white mb-2 capitalize">{weather.weather[0].description}</span>
                  <span className="text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">Condition</span>
               </div>
               
               <div className="bg-gray-100 dark:bg-zinc-950/50 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800">
                  <span className="block text-xl font-medium text-gray-900 dark:text-white mb-2">{weather.main.humidity}%</span>
                  <span className="text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">Humidity</span>
               </div>
               
               <div className="bg-gray-100 dark:bg-zinc-950/50 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800">
                  <span className="block text-xl font-medium text-gray-900 dark:text-white mb-2">{weather.wind.speed} m/s</span>
                  <span className="text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">Wind</span>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherClient;
