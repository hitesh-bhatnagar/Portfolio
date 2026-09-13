import React from 'react';
import { motion } from 'framer-motion';
import {
  FileDown,
  Mail,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  MapPin,
  Compass,
  Radio,
} from 'lucide-react';
import { profile } from '../data/portfolio';
import WebGLScene from './WebGLScene';

export function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 w-full min-h-[95vh] pt-28 pb-16 flex flex-col justify-center"
    >
      <div className="panoramic-container">
        {/* Solar System Flight Telemetry Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2.5"
        >
          <div className="solar-badge">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            <span className="text-amber-300 font-mono tracking-wider">
              SYSTEM STATUS: ONLINE // SOLAR ORBITS ACTIVE
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/80 px-3.5 py-1 text-xs font-mono text-slate-300 backdrop-blur-md">
            <Radio size={12} className="text-sky-400 animate-pulse" />
            <span>28.6139° N, 77.2090° E · DELHI NCR</span>
          </div>
        </motion.div>

        {/* Panoramic 2-Column Command Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Mission Directives & Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-sky-400/90 mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>C++ SYSTEMS ARCHITECTURE · EMBEDDED KERNELS · AI INFERENCE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-mono">
              ENGINEERING THE <br />
              <span className="text-gradient-solar">LOW-LEVEL ENGINES</span> <br />
              OF MODERN AI.
            </h1>

            <p className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300 font-mono">
              Hi, I'm <strong className="text-white font-semibold">Hitesh Bhatnagar</strong> — an
              Electronics & Communication Engineer from VIT Vellore (CGPA 8.42/10). I engineer
              zero-dependency C++17 LLM runtimes, bare-metal RTOS kernel simulators, active noise
              cancellation research (Elsevier published), and enterprise audit security automation.
            </p>

            {/* Quick Action Matrix */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-solar-primary">
                EXPLORE PROJECTS <ArrowUpRight size={15} />
              </a>
              <a href={profile.resume} download className="btn-solar-secondary">
                <FileDown size={15} /> RESUME_PDF
              </a>
              <a href="#contact" className="btn-solar-secondary">
                <Mail size={15} /> INITIATE_CONTACT
              </a>
            </div>
          </motion.div>

          {/* Right Column: Full Interactive 3D Solar System Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="relative h-[380px] sm:h-[440px] lg:h-[480px] w-full rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_0_80px_-20px_rgba(245,158,11,0.3)]">
              <WebGLScene />
            </div>
          </motion.div>
        </div>

        {/* 3-Pillar Panoramic Flight Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-3"
        >
          <div className="solar-card p-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-400">
              <GraduationCap size={16} /> ACADEMIC RECORD
            </div>
            <div className="mt-2 text-xl font-mono font-bold text-white tracking-tight">
              CGPA 8.42 / 10.00
            </div>
            <div className="mt-1 text-xs text-slate-400 font-mono">
              B.Tech ECE, Vellore Institute of Technology (2022–2026)
            </div>
          </div>

          <div className="solar-card p-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400">
              <Briefcase size={16} /> CAREER TRAJECTORY
            </div>
            <div className="mt-2 text-xl font-mono font-bold text-white tracking-tight">
              ASSOCIATE · FULL-TIME
            </div>
            <div className="mt-1 text-xs text-slate-400 font-mono">
              Aumyaa Consulting · Promoted from Risk Advisory Intern
            </div>
          </div>

          <div className="solar-card p-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-purple-400">
              <Award size={16} /> RESEARCH CREDENTIALS
            </div>
            <div className="mt-2 text-xl font-mono font-bold text-white tracking-tight">
              3 PEER-REVIEWED PAPERS
            </div>
            <div className="mt-1 text-xs text-slate-400 font-mono">
              Elsevier Digital Signal Processing, IEEE, and ANRF
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
