import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Download, Menu, X, Radio, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';
import SpaceCanvas from './SpaceCanvas';
import Lenis from 'lenis';

const navItems = [
  { name: '01_PROJECTS', href: '#projects' },
  { name: '02_CAREER', href: '#experience' },
  { name: '03_RESEARCH', href: '#publications' },
  { name: '04_TOOLKIT', href: '#skills' },
  { name: '05_CONTACT', href: '#contact' },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-amber-400 via-sky-400 to-purple-500"
      style={{ scaleX }}
    />
  );
}

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      {/* 3D Space Starfield Canvas */}
      <SpaceCanvas />

      {/* Subtle Solar Horizon Corona Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1200px] h-[360px] bg-gradient-to-b from-amber-500/[0.07] via-sky-500/[0.04] to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-500/[0.04] blur-[120px] pointer-events-none" />
    </div>
  );
}

export function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="mx-auto max-w-7xl pointer-events-auto">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
            scrolled
              ? 'border border-amber-500/30 bg-black/90 shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-2xl'
              : 'border border-white/10 bg-black/60 backdrop-blur-xl'
          }`}
        >
          {/* Telemetry Brand */}
          <a href="#top" className="flex items-center gap-3 group">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black border border-amber-400/40 text-amber-400 font-mono font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.4)] transition group-hover:border-amber-400 group-hover:scale-105">
              <span>✦</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-mono font-bold text-white tracking-tight group-hover:text-amber-300 transition">
                HITESH_BHATNAGAR
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                SYSTEMS & AI ENGINEER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1.5 md:flex font-mono">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Action Links */}
          <div className="hidden items-center gap-2 md:flex pr-1 font-mono">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="icon-btn-solar h-8 w-8 text-slate-300 hover:text-white"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="icon-btn-solar h-8 w-8 text-slate-300 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href={profile.resume}
              download
              className="btn-solar-primary btn-solar-small ml-1"
            >
              <Download size={13} /> RESUME_PDF
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-200 md:hidden"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function MobileMenu({ close }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-4 top-20 z-[60] rounded-3xl border border-amber-500/25 bg-black/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden font-mono"
    >
      <div className="grid gap-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={close}
            className="rounded-xl px-4 py-3 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.08] hover:text-white"
          >
            {item.name}
          </a>
        ))}

        <div className="mt-4 grid grid-cols-2 gap-2 pt-4 border-t border-white/[0.08]">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="btn-solar-secondary btn-solar-small justify-center"
          >
            <Github size={14} /> GITHUB
          </a>
          <a
            href={profile.resume}
            download
            className="btn-solar-primary btn-solar-small justify-center"
          >
            <Download size={14} /> RESUME
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-black/90 backdrop-blur-xl py-12">
      <div className="panoramic-container flex flex-col items-center justify-between gap-4 text-xs font-mono text-slate-400 sm:flex-row">
        <div>
          © {new Date().getFullYear()} HITESH BHATNAGAR · B.TECH ECE, VIT VELLORE (CGPA 8.42)
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            GITHUB
          </a>
          <span>·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            LINKEDIN
          </a>
          <span>·</span>
          <a href={`mailto:${profile.email}`} className="hover:text-white transition">
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

export function useSmoothScroll() {
  useEffect(() => {
    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });

      let id;
      const raf = (t) => {
        lenis.raf(t);
        id = requestAnimationFrame(raf);
      };
      id = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(id);
        lenis.destroy();
      };
    } catch (err) {
      console.warn('Lenis warning', err);
    }
  }, []);
}
