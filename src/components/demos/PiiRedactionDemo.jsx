import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Lock, CheckCircle2, ExternalLink } from 'lucide-react';

export default function PiiRedactionDemo() {
  const [redacted, setRedacted] = useState(true);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#060a14] p-4 text-xs font-mono shadow-inner">
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span className="text-[11px] text-slate-300 font-semibold">ITGC PII Anonymizer & Masker</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://cloak-wnnv.onrender.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[10px] text-sky-400 hover:text-sky-300 transition"
          >
            <span>Live on Render</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Toggle Controls */}
      <div className="mt-3 flex items-center justify-between bg-black/40 p-2 rounded-xl border border-white/[0.05]">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Mode:</span>
          <button
            onClick={() => setRedacted(!redacted)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-semibold transition ${
              redacted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}
          >
            {redacted ? <EyeOff size={11} /> : <Eye size={11} />}
            <span>{redacted ? 'Redaction Applied' : 'Raw Confidential Data'}</span>
          </button>
        </div>

        <div className="text-[10px] text-slate-400">
          Confidence: <strong className="text-emerald-400">99.8%</strong> (OCR + NER)
        </div>
      </div>

      {/* Document Stream Display */}
      <div className="mt-3 rounded-xl bg-black/70 p-3 leading-relaxed border border-white/[0.04] space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 text-slate-300">
          <span className="text-slate-500 font-bold">CLIENT:</span>
          <span className="text-slate-200">BMW Financial Services</span>
          <span className="text-slate-500 mx-1">|</span>
          <span className="text-slate-500 font-bold">AUDITOR:</span>
          {redacted ? (
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300 border border-emerald-500/30 font-bold tracking-widest">
              ████████████
            </span>
          ) : (
            <span className="text-amber-300 font-bold">Hitesh Bhatnagar</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-slate-300">
          <span className="text-slate-500 font-bold">PAN NUMBER:</span>
          {redacted ? (
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300 border border-emerald-500/30 font-bold tracking-widest">
              ██████████
            </span>
          ) : (
            <span className="text-red-400 font-bold">ABCDE1234F</span>
          )}
          <span className="text-slate-500 mx-1">|</span>
          <span className="text-slate-500 font-bold">AADHAAR:</span>
          {redacted ? (
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300 border border-emerald-500/30 font-bold tracking-widest">
              ████-████-9012
            </span>
          ) : (
            <span className="text-red-400 font-bold">9876-5432-9012</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-slate-300">
          <span className="text-slate-500 font-bold">SAP TRANSPORT:</span>
          <span className="text-sky-300 font-mono">TR_PROD_90412</span>
          <span className="text-slate-500 mx-1">|</span>
          <span className="text-slate-500 font-bold">STATUS:</span>
          <span className="text-emerald-400">AUDIT_COMPLIANT</span>
        </div>
      </div>
    </div>
  );
}
