import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Download, Menu, X, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
import { profile } from '../data/portfolio';
import SpaceCanvas from './SpaceCanvas';
import Lenis from 'lenis';

const navItems = [
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Research', href: '#publications', id: 'publications' },
  { name: 'Toolkit', href: '#skills', id: 'skills' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[80] h-[2.5px] origin-left bg-gradient-to-r from-sky-400 via-amber-400 to-purple-500"
      style={{ scaleX }}
    />
  );
}

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#06080e]">
      {/* 3D Cosmic Starfield Canvas */}
      <SpaceCanvas />

      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1300px] h-[450px] bg-gradient-to-b from-sky-500/[0.07] via-amber-500/[0.04] to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-500/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/[0.05] blur-[160px] pointer-events-none" />
    </div>
  );
}

export function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Active section spy using IntersectionObserver
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    });

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none">
      <div className="mx-auto max-w-7xl pointer-events-auto">
        <nav
          aria-label="Main Navigation"
          className={`flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-all duration-300 ${
            scrolled
              ? 'border border-white/15 bg-[#0a0e1a]/90 shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(56,189,248,0.12)] backdrop-blur-2xl'
              : 'border border-white/10 bg-[#080c16]/70 backdrop-blur-xl'
          }`}
        >
          {/* Brand Identity */}
          <a href="#top" className="flex items-center gap-2.5 sm:gap-3 group no-underline">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500/20 to-amber-500/20 border border-amber-400/40 text-amber-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(245,158,11,0.3)] transition group-hover:scale-105 group-hover:border-amber-400">
              <span>✦</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-amber-300 transition">
                Hitesh Bhatnagar
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                Systems & AI Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-amber-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action Links */}
          <div className="hidden items-center gap-2 md:flex pr-0.5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="icon-btn h-8 w-8 text-slate-300 hover:text-white"
              aria-label="GitHub Profile"
            >
              <Github size={14} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="icon-btn h-8 w-8 text-slate-300 hover:text-white"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={14} />
            </a>
            <a
              href={profile.resume}
              download
              className="btn-primary btn-small ml-1"
            >
              <Download size={13} /> Resume
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-200 hover:bg-white/15 transition md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export function MobileMenu({ close }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-3 top-18 z-[60] rounded-2xl border border-white/15 bg-[#090d18]/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
      >
        <div className="grid gap-1.5">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={close}
              className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <span>{item.name}</span>
              <span className="font-mono text-xs text-sky-400 opacity-60">→</span>
            </a>
          ))}

          <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary btn-small justify-center text-xs"
            >
              <Github size={13} /> GitHub
            </a>
            <a
              href={profile.resume}
              download
              className="btn-primary btn-small justify-center text-xs"
            >
              <Download size={13} /> Resume PDF
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#070a14]/90 backdrop-blur-xl py-12">
      <div className="panoramic-container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="text-sm font-bold text-white">
            Hitesh Bhatnagar
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Electronics & Communication Engineering · VIT Vellore (CGPA 8.42/10) · IT Risk Advisory Associate
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition flex items-center gap-1"
          >
            <Github size={13} /> GitHub
          </a>
          <span>·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition flex items-center gap-1"
          >
            <Linkedin size={13} /> LinkedIn
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
    // Only initialize Lenis on devices with fine pointer (mouse/trackpad), not touchscreens
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.0,
        smoothWheel: true,
        wheelMultiplier: 0.9,
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
