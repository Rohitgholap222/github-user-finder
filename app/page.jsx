"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  // Calculator State
  const [calcInput, setCalcInput] = useState("0");
  const [previousVal, setPreviousVal] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    let cleanedUser = username.trim();
    if (cleanedUser.includes("github.com/")) {
      const parts = cleanedUser.split("github.com/")[1].split("/");
      cleanedUser = parts[0];
    }
    if (cleanedUser !== "") {
      router.push(`/user/${cleanedUser}`);
    }
  };

  // Calculator Logic
  const handleNum = (num) => {
    if (waitingForNewValue) {
      setCalcInput(num);
      setWaitingForNewValue(false);
    } else {
      setCalcInput(calcInput === "0" ? num : calcInput + num);
    }
  };

  const calculate = (a, b, op) => {
    a = parseFloat(a);
    b = parseFloat(b);
    if (op === "+") return (a + b).toString();
    if (op === "-") return (a - b).toString();
    if (op === "×") return (a * b).toString();
    if (op === "÷") return b === 0 ? "Error" : (a / b).toString();
    return b.toString();
  };

  const handleOp = (op) => {
    if (operator && !waitingForNewValue) {
      const res = calculate(previousVal, calcInput, operator);
      setCalcInput(String(res));
      setPreviousVal(String(res));
    } else {
      setPreviousVal(calcInput);
    }
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const handleEqual = () => {
    if (operator && previousVal != null) {
      const res = calculate(previousVal, calcInput, operator);
      setCalcInput(String(res));
      setPreviousVal(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setCalcInput("0");
    setPreviousVal(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 overflow-x-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center md:items-stretch justify-center">
        
        {/* GitHub Finder Card */}
        <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-8 rounded-3xl shadow-2xl flex flex-col">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-linear-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">GitHub Finder</h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400 text-center">
              Discover developers and explore their open-source footprint seamlessly.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col gap-4 mt-auto">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-100 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Search User
            </button>
          </form>
        </div>

        {/* Calculator Card */}
        <div className="w-full max-w-sm bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-6 rounded-3xl shadow-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500 dark:text-zinc-400 font-semibold uppercase tracking-wider text-xs">Side Calculator</span>
            <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
          
          <div className="w-full bg-gray-100 dark:bg-zinc-950/50 rounded-2xl p-4 mb-6 shadow-inner border border-gray-200 dark:border-zinc-800 flex items-end justify-end overflow-hidden h-24">
            <span className="text-4xl text-gray-900 dark:text-white font-light tracking-tight truncate max-w-full">
              {calcInput}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
             <button onClick={handleClear} className="col-span-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold py-4 rounded-xl transition-all">AC</button>
             <button onClick={() => setCalcInput(String(parseFloat(calcInput)*-1))} className="bg-gray-200/50 dark:bg-zinc-800/50 hover:bg-gray-300/50 dark:hover:bg-zinc-700/50 text-gray-800 dark:text-zinc-200 font-semibold py-4 rounded-xl transition-all">+/-</button>
             <button onClick={() => handleOp("÷")} className={`bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold py-4 rounded-xl transition-all ${operator === "÷" && waitingForNewValue ? 'ring-2 ring-purple-500' : ''}`}>÷</button>

             {[7, 8, 9].map((num) => (
                <button key={num} onClick={() => handleNum(String(num))} className="bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-4 rounded-xl shadow-xs transition-all">{num}</button>
             ))}
             <button onClick={() => handleOp("×")} className={`bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold py-4 rounded-xl transition-all ${operator === "×" && waitingForNewValue ? 'ring-2 ring-purple-500' : ''}`}>×</button>

             {[4, 5, 6].map((num) => (
                <button key={num} onClick={() => handleNum(String(num))} className="bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-4 rounded-xl shadow-xs transition-all">{num}</button>
             ))}
             <button onClick={() => handleOp("-")} className={`bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold py-4 rounded-xl transition-all ${operator === "-" && waitingForNewValue ? 'ring-2 ring-purple-500' : ''}`}>-</button>

             {[1, 2, 3].map((num) => (
                <button key={num} onClick={() => handleNum(String(num))} className="bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-4 rounded-xl shadow-xs transition-all">{num}</button>
             ))}
             <button onClick={() => handleOp("+")} className={`bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold py-4 rounded-xl transition-all ${operator === "+" && waitingForNewValue ? 'ring-2 ring-purple-500' : ''}`}>+</button>

             <button onClick={() => handleNum("0")} className="col-span-2 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-4 rounded-xl shadow-xs transition-all">0</button>
             <button onClick={() => { if (!calcInput.includes('.')) handleNum('.'); }} className="bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-4 rounded-xl shadow-xs transition-all">.</button>
             <button onClick={handleEqual} className="bg-linear-to-tr from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-md transition-all">=</button>
          </div>
        </div>

      </div>
    </div>
  );
}