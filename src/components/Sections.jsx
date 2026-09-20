import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  FileDown,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Cpu,
  ShieldCheck,
  Database,
  RadioTower,
  BrainCircuit,
  Copy,
  Check,
  Send,
  Sparkles,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  Terminal,
  Layers,
  Code2,
  BookOpen,
  Volume2,
} from 'lucide-react';
import {
  projects,
  timeline,
  publications,
  skillGroups,
  profile,
} from '../data/portfolio';
import ProjectModal from './ProjectModal';
import CppInferenceDemo from './demos/CppInferenceDemo';
import RtosSchedulerDemo from './demos/RtosSchedulerDemo';
import PiiRedactionDemo from './demos/PiiRedactionDemo';
import DbReplDemo from './demos/DbReplDemo';
import AudioDspDemo from './demos/AudioDspDemo';

const iconMap = {
  ai: BrainCircuit,
  audit: ShieldCheck,
  db: Database,
  embedded: RadioTower,
};

function SectionHeading({ badge, title, desc }) {
  return (
    <div className="mb-10 sm:mb-14 max-w-4xl">
      <div className="glass-badge mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
        <span className="font-mono text-xs text-sky-300 font-semibold">{badge}</span>
      </div>
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {desc && (
        <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-slate-300 max-w-3xl">
          {desc}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. BESPOKE INTERACTIVE BENTO SHOWCASE (ONLY 4 VERIFIED COMPLETE PROJECTS)
// ─────────────────────────────────────────────────────────────────────────────

export function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Map each project ID to its interactive simulator component
  const renderDemo = (id) => {
    switch (id) {
      case 'jarvis-cpp':
        return <CppInferenceDemo />;
      case 'rtos-simulator':
        return <RtosSchedulerDemo />;
      case 'data-anonymizer':
        return <PiiRedactionDemo />;
      case 'c-db-engine':
        return <DbReplDemo />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative z-10 w-full py-16 sm:py-24">
      <div className="panoramic-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeading
            badge="ORBIT 01 // PRODUCTION_SYSTEMS"
            title="Interactive Systems & Low-Level Architectures"
            desc="Interact directly with the live simulators below. Zero-dependency C++17 inference engines, preemptive RTOS kernels, in-memory databases, and enterprise ITGC document redaction."
          />

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-[#080d1a] px-4 py-2 text-xs font-mono text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>4 Complete High-Impact Systems</span>
          </div>
        </div>

        {/* 4 Bento Project Cards with Embedded Interactive Playgrounds */}
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((p, i) => {
            const Icon = iconMap[p.icon] || Cpu;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="glass-card flex flex-col justify-between p-6 sm:p-7 group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#060a14] border border-white/12 text-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.2)]">
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-sky-500/15 border border-sky-500/30 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-sky-300">
                            {p.categoryLabel || p.category}
                          </span>
                          <span className="font-mono text-xs text-slate-400">{p.year}</span>
                          {p.status && (
                            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                              {p.status}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1.5 text-lg sm:text-xl font-bold text-white tracking-tight">
                          {p.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">{p.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="icon-btn"
                          title="Live Application"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-btn"
                        title="GitHub Repository"
                      >
                        <Github size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {p.impact}
                  </p>

                  {/* Interactive Live Playground Widget Embedded */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between pb-1.5 mb-1.5">
                      <span className="text-[11px] font-mono text-sky-400 flex items-center gap-1.5">
                        <Terminal size={12} />
                        <span>Interactive Simulator Playground</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Click to test live</span>
                    </div>
                    {renderDemo(p.id)}
                  </div>

                  {/* Highlights Bullet Points */}
                  <ul className="mt-4 grid gap-2 text-xs text-slate-300">
                    {p.highlights.slice(0, 2).map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer with Tech Stack and Architecture Modal Trigger */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalProject(p)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition shrink-0"
                  >
                    <span>View Architecture Spec</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All Repos on GitHub */}
        <div className="mt-12 text-center">
          <a
            href={profile.githubReposUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Github size={15} />
            <span>Explore All 41+ Public Repositories on GitHub</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Modal */}
        {activeModalProject && (
          <ProjectModal
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
          />
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CHRONOLOGICAL CAREER PROGRESSION
// ─────────────────────────────────────────────────────────────────────────────

export function CareerTimeline() {
  return (
    <section id="experience" className="relative z-10 w-full py-16 sm:py-24">
      <div className="panoramic-container">
        <SectionHeading
          badge="ORBIT 02 // CAREER_TRAJECTORY"
          title="Career Progression & Academic Foundation"
          desc="From IT Risk Advisory Intern to Full-Time Associate at Aumyaa Consulting, active noise cancellation deep learning research at IIT Goa, and ECE at VIT Vellore."
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Constellation Orbit Line */}
          <div className="absolute top-4 bottom-4 left-4 w-px bg-gradient-to-b from-sky-400 via-amber-400 to-purple-500 hidden sm:block" />

          <div className="grid gap-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="glass-card p-6 sm:p-8 sm:ml-12 relative"
              >
                {/* Node Indicator */}
                <div className="absolute -left-[45px] top-8 hidden sm:flex h-6 w-6 items-center justify-center rounded-full bg-[#06080e] border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)]">
                  <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-mono font-semibold text-emerald-300">
                        {item.type}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{item.place}</span>
                    </div>

                    <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold text-slate-200 mt-0.5">
                      {item.company}
                    </div>
                    <div className="text-xs text-sky-400 font-medium mt-0.5 flex items-center gap-1.5 font-mono">
                      <span>✦</span> {item.progression}
                    </div>
                  </div>

                  <span className="rounded-full bg-[#070b16] border border-white/15 px-3.5 py-1 text-xs font-mono text-slate-300 w-fit shrink-0">
                    {item.period}
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {item.summary}
                </p>

                {/* Highlighted Responsibilities */}
                <ul className="mt-4 grid gap-2.5 text-xs sm:text-sm text-slate-300">
                  {item.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-400" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.08]">
                  {item.tags.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. PEER-REVIEWED RESEARCH PUBLICATIONS (WITH EMBEDDED DSP SIMULATOR)
// ─────────────────────────────────────────────────────────────────────────────

export function Publications() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyCitation = (pub, index) => {
    navigator.clipboard.writeText(pub.citation);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="publications" className="relative z-10 w-full py-16 sm:py-24">
      <div className="panoramic-container">
        <SectionHeading
          badge="ORBIT 03 // RESEARCH_CREDENTIALS"
          title="Peer-Reviewed Publications & Signal Research"
          desc="First-author research in the Elsevier Digital Signal Processing Journal, ANRF-sponsored IoT botnet neural detection, and IEEE cryptographic frameworks."
        />

        {/* Featured Interactive Audio DSP Demo at Top of Research Section */}
        <div className="mb-10 max-w-4xl mx-auto">
          <AudioDspDemo />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {publications.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="glass-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 text-xs font-mono font-semibold text-purple-300">
                    {p.tag}
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-medium">{p.year}</span>
                </div>

                <h3 className="mt-3 text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs text-sky-400 font-semibold font-mono">{p.venue}</p>

                {p.metrics && (
                  <div className="mt-3 rounded-lg bg-white/[0.04] border border-white/[0.08] p-2 font-mono text-[11px] text-amber-300">
                    {p.metrics}
                  </div>
                )}

                <p className="mt-3 text-xs leading-relaxed text-slate-300">{p.abstract}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 text-[11px]">{p.field}</span>
                <button
                  onClick={() => copyCitation(p, i)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#070b16] hover:bg-white/10 border border-white/15 px-3 py-1 text-xs text-slate-300 hover:text-white transition"
                  title="Copy citation to clipboard"
                >
                  {copiedIndex === i ? (
                    <>
                      <Check size={12} className="text-emerald-400" /> Copied BibTeX
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Cite Paper
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. TECHNICAL TOOLKIT & SKILLS MATRIX
// ─────────────────────────────────────────────────────────────────────────────

export function Skills() {
  return (
    <section id="skills" className="relative z-10 w-full py-16 sm:py-24">
      <div className="panoramic-container">
        <SectionHeading
          badge="ORBIT 04 // TECHNICAL_TOOLSET"
          title="Systems Competencies & Engineering Toolkit"
          desc="Organized across low-level systems programming, developer infrastructure, deep learning acceleration, and enterprise IT risk audit security."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="glass-card p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight border-b border-white/[0.08] pb-3">
                  {g.category}
                </h3>
                <p className="mt-2 text-[11px] text-slate-400">{g.description}</p>

                <div className="mt-4 grid gap-2">
                  {g.skills.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
                    >
                      <span className="font-mono text-xs text-slate-200">{s.name}</span>
                      <span className="font-mono text-[10px] text-sky-400/80">{s.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. CONTACT & RECRUITER MISSION CONTROL
// ─────────────────────────────────────────────────────────────────────────────

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="relative z-10 w-full py-16 sm:py-24">
      <div className="panoramic-container">
        <div className="glass-card p-6 sm:p-12 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="glass-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs text-emerald-300">
                  MISSION CONTROL // GET IN TOUCH
                </span>
              </div>

              <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Let's Build Something <br />
                <span className="text-gradient-hero">Exceptional Together.</span>
              </h2>

              <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-slate-300 max-w-xl">
                I am actively open to discussing full-time opportunities in <strong>systems engineering (C/C++)</strong>,
                <strong> local AI serving infrastructure</strong>, and <strong>machine learning research collaborations</strong>.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="btn-primary">
                  <Send size={15} /> Send Direct Email
                </a>
                <a href={profile.resume} download className="btn-secondary">
                  <FileDown size={15} /> Download Resume PDF
                </a>
              </div>
            </div>

            {/* Telemetry Contact Cards */}
            <div className="space-y-3">
              {/* Direct Email Card */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#070a14] p-4 flex items-center justify-between gap-3 hover:border-sky-500/40 transition">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-sky-400 border border-sky-500/30">
                    <Mail size={18} />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-mono">
                      DIRECT EMAIL
                    </div>
                    <div className="text-sm font-semibold text-white truncate font-mono">
                      {profile.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Phone / WhatsApp */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#070a14] p-4 flex items-center justify-between gap-3 hover:border-amber-500/40 transition">
                <a
                  href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-3 no-underline group flex-1"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-amber-400 border border-amber-500/30">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-mono">
                      PHONE & WHATSAPP
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition font-mono">
                      {profile.phone}
                    </div>
                  </div>
                </a>
                <button
                  onClick={copyPhone}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition shrink-0"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* LinkedIn Network */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/[0.08] bg-[#070a14] p-4 flex items-center justify-between gap-3 hover:border-purple-500/40 transition group no-underline"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-purple-400 border border-purple-500/30">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-mono">
                      LINKEDIN NETWORK
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition font-mono">
                      hitesh-bhatnagar-5a3b391ba
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white transition" />
              </a>

              {/* GitHub Profile */}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/[0.08] bg-[#070a14] p-4 flex items-center justify-between gap-3 hover:border-sky-500/40 transition group no-underline"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-sky-400 border border-sky-500/30">
                    <Github size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-mono">
                      GITHUB PROFILE
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition font-mono">
                      @hitesh-bhatnagar
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
