import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Download, Menu, X, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';
import Lenis from 'lenis';

const navItems = ['Projects', 'Experience', 'Skills', 'Publications', 'Contact'];
const slug = v => v.toLowerCase().replace(/\s+/g, '-');

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  return <motion.div className="fixed left-0 right-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500" style={{ scaleX }} />;
}

export function Spotlight() {
  return <div className="pointer-events-none fixed inset-0 z-[1] hidden opacity-60 mix-blend-soft-light lg:block spotlight" />;
}

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="dot-grid" />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="aurora aurora-three" />
      <div className="noise" />
    </div>
  );
}

export function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/[0.06] bg-[#030014]/80 backdrop-blur-2xl' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 font-display text-lg font-bold text-white">H</span>
          <span className="hidden text-sm font-semibold text-slate-300 sm:block">Hitesh<span className="text-violet-400">.</span>dev</span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 lg:flex">
          {navItems.map(item => (
            <a key={item} href={`#${slug(item)}`} className="rounded-full px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white">{item}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a href={profile.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub"><Github size={17} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a href={profile.resume} className="btn-primary btn-small" download><Download size={15} /> Resume</a>
        </div>
        <button className="icon-btn lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>
  );
}

export function MobileMenu({ close }) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="fixed inset-x-4 top-20 z-[60] rounded-2xl border border-white/[0.06] bg-[#030014]/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden">
      <div className="grid gap-1">
        {navItems.map(item => (
          <a key={item} href={`#${slug(item)}`} onClick={close} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/[0.06]">{item}</a>
        ))}
        <div className="mt-2 grid grid-cols-2 gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-secondary btn-small justify-center"><Github size={15} /> GitHub</a>
          <a href={profile.resume} className="btn-primary btn-small justify-center" download><Download size={15} /> Resume</a>
        </div>
      </div>
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Crafted with React, Three.js, Framer Motion & WebGL.</p>
        <div className="flex gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer" className="icon-btn"><Github size={16} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-btn"><Linkedin size={16} /></a>
          <a href={`mailto:${profile.email}`} className="icon-btn"><Mail size={16} /></a>
        </div>
      </div>
    </footer>
  );
}

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.9 });
    let id;
    const raf = t => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
}

export function useCursorSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    const move = e => { root.style.setProperty('--cursor-x', `${e.clientX}px`); root.style.setProperty('--cursor-y', `${e.clientY}px`); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
}
