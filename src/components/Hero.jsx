import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowUpRight, Mail, GraduationCap, BadgeCheck, BriefcaseBusiness, Zap, Server } from 'lucide-react';
import { profile, metrics } from '../data/portfolio';
import WebGLScene from './WebGLScene';

const typewriterTexts = ['AI Systems Engineer', 'ML Researcher', 'System programming Enthusiast'];

function useTypewriter(texts, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const text = texts[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(text.slice(0, charIdx + 1));
        if (charIdx + 1 === text.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(text.slice(0, charIdx));
        if (charIdx === 0) { setDeleting(false); setIdx((idx + 1) % texts.length); }
        else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);
  return display;
}

function TiltCard({ children, className = '' }) {
  const onMove = e => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${y * -8}deg`);
    el.style.setProperty('--ry', `${x * 10}deg`);
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const onLeave = e => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); };
  return <div className={`tilt-card ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}><div className="tilt-shine" />{children}</div>;
}

function CodeLine({ prompt, text, accent }) {
  return (
    <div className="code-line mb-2 last:mb-0">
      <span className="prompt">{prompt}</span>
      <span className="separator"> :: </span>
      {text} <span className="accent">[{accent}]</span>
    </div>
  );
}

export function Hero() {
  const typed = useTypewriter(typewriterTexts);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.6]);

  return (
    <section id="top" className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
      <motion.div style={{ y: heroY, opacity: heroOpacity }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-300">
          <Sparkles size={16} /> Open to ML, Systems, Embedded & Research roles
        </div>

        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          I build the <span className="text-gradient">engines</span> that power AI systems.
        </h1>

        <div className="mt-5 h-10 font-mono text-xl text-violet-400 sm:text-2xl">
          {'> '}{typed}<span className="typewriter-cursor" />
        </div>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">{profile.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {profile.focus.map(f => <span key={f} className="chip"><Zap size={12} /> {f}</span>)}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#projects" className="btn-primary"><ArrowUpRight size={17} /> Explore Projects</a>
          <a href={`mailto:${profile.email}`} className="btn-secondary"><Mail size={17} /> Get in Touch</a>
        </div>

        <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
          <MiniStat icon={GraduationCap} label="B.Tech ECE" value="VIT Vellore" />
          <MiniStat icon={BadgeCheck} label="GPA" value={profile.gpa} />
          <MiniStat icon={BriefcaseBusiness} label="Current" value="IT Risk & AI" />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
        <TiltCard className="glow-border relative mx-auto max-w-xl rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-xl">
          <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#030014]/90 p-4">
            <div className="mb-4 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
              <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" /></div>
              <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500">system.core</span>
            </div>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-xl border border-violet-500/10 bg-violet-500/[0.03] p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-violet-300"><Server size={14} /> Runtime</div>
                <CodeLine prompt="build" text="local RAG engine" accent="C++" />
                <CodeLine prompt="mask" text="enterprise PII" accent="Python" />
                <CodeLine prompt="sim" text="RTOS scheduler" accent="C" />
                <CodeLine prompt="train" text="ANC model" accent="PyTorch" />
              </div>
              <div className="relative min-h-[340px] overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent">
                <div className="hologram-grid" />
                <WebGLScene />
                <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-lg border border-violet-500/10 bg-[#030014]/60 px-3 py-2 text-center font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-slate-500 backdrop-blur">
                  drag to rotate • mouse reactive
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </section>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur">
      <Icon className="mb-2 text-violet-400" size={16} />
      
      <div className="text-[0.7rem] uppercase tracking-[0.2em] text-white">
        {label}
      </div>

      <div className="mt-1 text-base font-semibold text-white">
        {value}
      </div>
    </div>
  );
}

export function ProofStrip() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass-card p-5">
            <div className="font-display text-4xl font-bold text-white">{m.value}</div>
            <div className="mt-2 text-base font-semibold text-violet-300">{m.label}</div>
            <div className="mt-1 text-sm text-slate-500">{m.detail}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export { TiltCard };
