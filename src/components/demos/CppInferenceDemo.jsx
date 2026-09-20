import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Cpu, Sparkles, Terminal } from 'lucide-react';

export default function CppInferenceDemo() {
  const [running, setRunning] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [temp, setTemp] = useState(0.7);

  const samplePrompt = 'Constructing low-level C++17 memory buffer pipeline interfacing directly with llama.cpp GGUF 4-bit quantizations. Zero Python overhead, deterministic Top-K sampling verified.';
  const words = samplePrompt.split(' ');

  const runInference = () => {
    setRunning(true);
    setTokens([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        setTokens((prev) => [...prev, words[i]]);
        i++;
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 95);
  };

  useEffect(() => {
    // Initial auto-preview
    runInference();
  }, []);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#060a14] p-4 text-xs font-mono shadow-inner">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] text-slate-400 font-semibold ml-2">jarvis_runtime (C++17)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-sky-400 font-medium">GGUF 4-bit</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            Zero-Python
          </span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 bg-black/40 p-2 rounded-xl border border-white/[0.05]">
        <div className="flex items-center gap-2">
          <button
            onClick={runInference}
            disabled={running}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
              running
                ? 'bg-sky-500/20 text-sky-300 opacity-60'
                : 'bg-sky-500 text-black hover:bg-sky-400 active:scale-95'
            }`}
          >
            <Play size={11} fill="currentColor" />
            <span>{running ? 'Sampling...' : 'Run C++ Inference'}</span>
          </button>
          <button
            onClick={() => setTokens([])}
            className="rounded-lg border border-white/10 bg-white/5 p-1 text-slate-400 hover:text-white transition"
            title="Reset"
          >
            <RotateCcw size={12} />
          </button>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-slate-400">
          <span>Speed: <strong className="text-white">68.2 tok/s</strong></span>
          <span>Latency: <strong className="text-amber-300">14.6 ms/tok</strong></span>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div className="mt-3 min-h-[75px] rounded-xl bg-black/70 p-3 text-slate-300 leading-relaxed border border-white/[0.04]">
        <span className="text-sky-400 font-semibold">$ ./jarvis --model llama-3-8b.gguf --temp {temp}</span>
        <div className="mt-1.5 text-slate-200">
          {tokens.join(' ')}
          {running && <span className="inline-block w-2 h-3.5 ml-1 bg-sky-400 animate-pulse align-middle" />}
          {!running && tokens.length === 0 && (
            <span className="text-slate-500 italic">Click "Run C++ Inference" to stream deterministic tokens.</span>
          )}
        </div>
      </div>
    </div>
  );
}
