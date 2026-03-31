"use client";
import { useState } from "react";

const CalculatorClient = () => {
  const [calcInput, setCalcInput] = useState("0");
  const [previousVal, setPreviousVal] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

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
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">        
        <div className="w-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-6 rounded-3xl shadow-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500 dark:text-zinc-400 font-semibold uppercase tracking-wider text-xs">Standard Calculator</span>
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
};

export default CalculatorClient;
