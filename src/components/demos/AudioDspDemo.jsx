import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Activity } from 'lucide-react';

export default function AudioDspDemo() {
  const [filterActive, setFilterActive] = useState(true);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#060a14] p-4 text-xs font-mono shadow-inner">
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-purple-400" />
          <span className="text-[11px] text-slate-300 font-semibold">
            Active Noise Cancellation (Elsevier DSP 2026)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-purple-400">
          <span>First-Author Publication</span>
        </div>
      </div>

      {/* Interactive Filter Mode Toggle */}
      <div className="mt-3 flex items-center justify-between bg-black/40 p-2 rounded-xl border border-white/[0.05]">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Filter State:</span>
          <button
            onClick={() => setFilterActive(!filterActive)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-semibold transition ${
              filterActive
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}
          >
            {filterActive ? <VolumeX size={12} /> : <Volume2 size={12} />}
            <span>{filterActive ? 'FxEHCAF + SFANC Active' : 'Unfiltered Raw Noise'}</span>
          </button>
        </div>

        <div className="text-[10px] text-slate-400">
          SNR: <strong className={filterActive ? 'text-emerald-400' : 'text-red-400'}>
            {filterActive ? '+27.10 dB' : '-14.20 dB'}
          </strong>
        </div>
      </div>

      {/* Live Waveform Visualizer */}
      <div className="mt-3 rounded-xl bg-black/80 p-3 border border-white/[0.04]">
        <div className="text-[10px] text-slate-500 mb-1 flex items-center justify-between">
          <span>{filterActive ? 'Residual Error Signal e(n) [Attenuated]' : 'Primary Acoustic Disturbance d(n) [Impulsive]'}</span>
          <span className="text-amber-300 font-mono">MSE: {filterActive ? '2.9e-5' : '0.412'}</span>
        </div>

        <div className="h-14 w-full flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
            {filterActive ? (
              // Attenuated, smooth, near-zero error line with subtle ripple
              <path
                d="M0,30 Q25,32 50,30 T100,29 T150,31 T200,30 T250,29 T300,31 T350,30 T400,30"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                className="transition-all duration-500"
              />
            ) : (
              // Chaotic, high-amplitude impulsive noise wave
              <path
                d="M0,30 Q20,5 40,55 T80,10 T120,50 T160,8 T200,52 T240,6 T280,54 T320,12 T360,48 T400,30"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                className="transition-all duration-500"
              />
            )}
          </svg>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/[0.05]">
          <span>IIT Goa Research Lab</span>
          <span className="text-purple-300 font-mono">RMSE: {filterActive ? '0.00537' : '0.642'}</span>
        </div>
      </div>
    </div>
  );
}
