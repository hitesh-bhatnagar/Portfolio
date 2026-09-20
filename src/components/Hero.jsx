import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileDown,
  Mail,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Award,
  Radio,
  Copy,
  Check,
  MapPin,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  ChevronRight,
  Volume2,
} from 'lucide-react';
import { profile } from '../data/portfolio';
import WebGLScene from './WebGLScene';

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [roleMode, setRoleMode] = useState('systems'); // 'systems' | 'research'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="top"
      className="relative z-10 w-full min-h-[92vh] pt-24 pb-16 sm:pt-28 sm:pb-20 flex flex-col justify-center"
    >
      <div className="panoramic-container">
        {/* Top Status & Interactive Role Mode Switcher (Dribbble/Jitter style) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          {/* Status Badge */}
          <div className="glass-badge">
            <span className="status-indicator">
              <span className="ping" />
              <span className="core" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-emerald-400 tracking-wide uppercase">
              OPEN TO SYSTEMS & AI INFRASTRUCTURE ROLES
            </span>
          </div>

          {/* Interactive Role Focus Segmented Control */}
          <div className="flex items-center gap-1 p-1 rounded-full border border-white/12 bg-[#080d1a]/80 backdrop-blur-xl">
            <button
              onClick={() => setRoleMode('systems')}
              className={`relative rounded-full px-3 py-1 text-xs font-semibold transition ${
                roleMode === 'systems'
                  ? 'text-white bg-sky-500/25 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Cpu size={12} className="text-sky-400" />
                <span>Systems Engineering</span>
              </span>
            </button>
            <button
              onClick={() => setRoleMode('research')}
              className={`relative rounded-full px-3 py-1 text-xs font-semibold transition ${
                roleMode === 'research'
                  ? 'text-white bg-purple-500/25 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Award size={12} className="text-purple-400" />
                <span>AI & DSP Research</span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* 2-Column Hero Grid: Left Content + Right 3D Visual */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          {/* Left Column: Headlines, Bio & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2.5 flex items-center gap-2 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>
                {roleMode === 'systems'
                  ? 'C++17 RUNTIMES · EMBEDDED RTOS KERNELS · DBMS INTERNALS'
                  : 'ACOUSTIC ACTIVE NOISE CONTROL · ELSEVIER JOURNAL · IOT SECURITY'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Engineering the <br />
              <span className="text-gradient-hero">
                {roleMode === 'systems' ? 'Low-Level Engines' : 'Algorithmic Frontiers'}
              </span> <br />
              of Modern AI.
            </h1>

            <AnimatePresence mode="wait">
              {roleMode === 'systems' ? (
                <motion.p
                  key="systems-p"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300"
                >
                  Hi, I'm <strong className="text-white font-semibold">Hitesh Bhatnagar</strong> — an
                  Electronics & Communication Engineer from <strong className="text-slate-200">VIT Vellore (CGPA 8.42/10)</strong> and
                  Full-Time <strong className="text-slate-200">IT Risk Advisory Associate</strong> at Aumyaa Consulting.
                  I specialize in zero-dependency C++17 local LLM inference engines, preemptive RTOS kernel simulators,
                  and enterprise ITGC security automation for Fortune 500 audit engagements.
                </motion.p>
              ) : (
                <motion.p
                  key="research-p"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300"
                >
                  Hi, I'm <strong className="text-white font-semibold">Hitesh Bhatnagar</strong>.
                  I conducted acoustic signal processing and deep learning research at <strong className="text-slate-200">IIT Goa</strong>,
                  resulting in a first-author paper in the <strong className="text-purple-300">Elsevier Digital Signal Processing Journal</strong> (achieving
                  MSE 2.9e-5 and SNR 27.10 dB). Author of 3 peer-reviewed papers spanning adaptive filtering, IoT graph botnet neural detection, and cryptography.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Quick Action Matrix */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary">
                Explore Interactive Systems <ArrowUpRight size={15} />
              </a>
              <a href={profile.resume} download className="btn-secondary">
                <FileDown size={15} /> Download Resume PDF
              </a>
              <button
                onClick={handleCopyEmail}
                className="btn-secondary"
                title="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-emerald-400" /> Copied Email!
                  </>
                ) : (
                  <>
                    <Copy size={15} /> Copy Direct Email
                  </>
                )}
              </button>
            </div>

            {/* Recruiter Quick Jump Chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.08]">
              <span className="text-[11px] font-mono uppercase text-slate-500 mr-1">Quick Jump:</span>
              <a
                href="#projects"
                className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-2.5 py-1 text-[11px] text-slate-300 hover:text-white transition"
              >
                <span>⚡ 4 Verified Systems</span>
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-2.5 py-1 text-[11px] text-slate-300 hover:text-white transition"
              >
                <span>💼 Aumyaa Associate Role</span>
              </a>
              <a
                href="#publications"
                className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-2.5 py-1 text-[11px] text-slate-300 hover:text-white transition"
              >
                <span>🔬 Elsevier Journal Paper</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D Solar System Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="relative h-[340px] sm:h-[420px] lg:h-[470px] w-full rounded-3xl border border-white/12 bg-[#080c16]/80 backdrop-blur-xl overflow-hidden shadow-[0_0_70px_-20px_rgba(56,189,248,0.25)]">
              <WebGLScene />
            </div>
          </motion.div>
        </div>

        {/* 3 High-Impact Credential Bento Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid gap-4 border-t border-white/[0.08] pt-7 sm:grid-cols-3"
        >
          <div className="glass-card p-5 group hover:border-sky-500/40 transition">
            <div className="flex items-center justify-between text-xs font-semibold text-sky-400">
              <span className="flex items-center gap-1.5">
                <GraduationCap size={16} /> ACADEMIC RECORD
              </span>
              <span className="font-mono text-[10px] text-slate-500">2022–2026</span>
            </div>
            <div className="mt-2 text-xl sm:text-2xl font-bold text-white tracking-tight font-mono">
              CGPA 8.42 / 10
            </div>
            <div className="mt-1 text-xs text-slate-400 leading-normal">
              B.Tech Electronics & Communication, VIT Vellore
            </div>
          </div>

          <div className="glass-card p-5 group hover:border-amber-500/40 transition">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
              <span className="flex items-center gap-1.5">
                <Briefcase size={16} /> CAREER TRAJECTORY
              </span>
              <span className="font-mono text-[10px] text-emerald-400">Elevated</span>
            </div>
            <div className="mt-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
              Full-Time Associate
            </div>
            <div className="mt-1 text-xs text-slate-400 leading-normal">
              Aumyaa Consulting · Promoted from Risk Advisory Intern
            </div>
          </div>

          <div className="glass-card p-5 group hover:border-purple-500/40 transition">
            <div className="flex items-center justify-between text-xs font-semibold text-purple-400">
              <span className="flex items-center gap-1.5">
                <Award size={16} /> RESEARCH CREDENTIALS
              </span>
              <span className="font-mono text-[10px] text-purple-400">3 Papers</span>
            </div>
            <div className="mt-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
              Elsevier 1st Author
            </div>
            <div className="mt-1 text-xs text-slate-400 leading-normal">
              Digital Signal Processing Journal, IEEE, and ANRF
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
