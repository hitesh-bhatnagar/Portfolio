import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Github,
  BadgeCheck,
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
  Calendar,
  Sparkles,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import {
  projects,
  timeline,
  publications,
  skillGroups,
  profile,
} from '../data/portfolio';
import ProjectModal from './ProjectModal';

const iconMap = {
  ai: BrainCircuit,
  audit: ShieldCheck,
  db: Database,
  embedded: RadioTower,
};

function SectionHeading({ badge, title, desc }) {
  return (
    <div className="mb-12 max-w-4xl">
      <div className="solar-badge mb-3.5">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
        <span className="font-mono text-xs">{badge}</span>
      </div>
      <h2 className="font-mono text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
        {title}
      </h2>
      {desc && (
        <p className="font-mono mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-3xl">
          {desc}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CURATED COMPLETE PROJECTS (PANORAMIC WIDE GRID)
// ─────────────────────────────────────────────────────────────────────────────

export function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);

  return (
    <section id="projects" className="relative z-10 w-full py-20">
      <div className="panoramic-container">
        <SectionHeading
          badge="ORBIT 01 // FEATURED_SYSTEMS"
          title="FEATURED SYSTEMS & ARCHITECTURES"
          desc="Production-grade, zero-dependency C++17 LLM inference runtimes, embedded RTOS kernel simulators, ACID storage engines, and enterprise ITGC audit automation."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpenModal={() => setActiveModalProject(p)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={profile.githubReposUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-solar-secondary inline-flex items-center gap-2"
          >
            <Github size={15} /> VIEW ALL 41+ REPOSITORIES ON GITHUB <ArrowUpRight size={14} />
          </a>
        </div>

        {activeModalProject && (
          <ProjectModal project={activeModalProject} onClose={() => setActiveModalProject(null)} />
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index, onOpenModal }) {
  const Icon = iconMap[p.icon] || Cpu;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="solar-card flex flex-col justify-between p-6 sm:p-8"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black border border-white/15 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <Icon size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-sky-500/15 border border-sky-500/30 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-sky-300">
                  {p.category}
                </span>
                <span className="font-mono text-xs text-slate-400">{p.year}</span>
              </div>
              <h3 className="mt-1.5 font-mono text-lg sm:text-xl font-bold text-white tracking-tight">
                {p.title}
              </h3>
              <p className="font-mono text-xs text-slate-400">{p.subtitle}</p>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="icon-btn-solar"
                title="Live Application"
              >
                <ExternalLink size={14} />
              </a>
            )}
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="icon-btn-solar"
              title="GitHub Repository"
            >
              <Github size={14} />
            </a>
          </div>
        </div>

        {/* Impact Box */}
        <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/60 p-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-300">
          <span className="font-bold text-amber-300">IMPACT: </span>
          {p.impact}
        </div>

        {/* Highlights */}
        <ul className="mt-4 grid gap-2 font-mono text-xs sm:text-sm text-slate-300">
          {p.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={onOpenModal}
          className="font-mono inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition shrink-0"
        >
          [ VIEW ARCHITECTURE ] <ArrowUpRight size={13} />
        </button>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CHRONOLOGICAL CAREER TIMELINE (LINKEDIN ALIGNED)
// ─────────────────────────────────────────────────────────────────────────────

export function CareerTimeline() {
  return (
    <section id="experience" className="relative z-10 w-full py-20">
      <div className="panoramic-container">
        <SectionHeading
          badge="ORBIT 02 // CAREER_TRAJECTORY"
          title="CHRONOLOGICAL FLIGHT PATH"
          desc="From IT Risk Advisory Intern to Full-Time Associate at Aumyaa Consulting, active noise cancellation deep learning research at IIT Goa, and ECE at VIT Vellore."
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Constellation Orbit Path Line */}
          <div className="absolute top-4 bottom-4 left-4 w-px bg-gradient-to-b from-sky-400 via-amber-400 to-purple-500 hidden sm:block" />

          <div className="grid gap-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="solar-card p-6 sm:p-8 sm:ml-12 relative"
              >
                {/* Orbital Planetary Node */}
                <div className="absolute -left-[45px] top-8 hidden sm:flex h-6 w-6 items-center justify-center rounded-full bg-black border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)]">
                  <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-xs font-mono font-semibold text-amber-300">
                        {item.type}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{item.place}</span>
                    </div>

                    <h3 className="mt-2 font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                    <div className="font-mono text-sm font-semibold text-slate-200 mt-0.5">
                      {item.company}
                    </div>
                    <div className="font-mono text-xs text-sky-400 font-medium mt-0.5 flex items-center gap-1.5">
                      <span>✦</span> {item.progression}
                    </div>
                  </div>

                  <span className="font-mono rounded-full bg-black border border-white/15 px-3.5 py-1 text-xs text-slate-300 w-fit shrink-0">
                    {item.period}
                  </span>
                </div>

                <p className="mt-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-300">
                  {item.summary}
                </p>

                {/* Responsibilities */}
                <ul className="mt-4 grid gap-2.5 font-mono text-xs sm:text-sm text-slate-300">
                  {item.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-sky-400" />
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
// 3. PEER-REVIEWED PUBLICATIONS
// ─────────────────────────────────────────────────────────────────────────────

export function Publications() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyCitation = (pub, index) => {
    navigator.clipboard.writeText(pub.citation);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="publications" className="relative z-10 w-full py-20">
      <div className="panoramic-container">
        <SectionHeading
          badge="ORBIT 03 // RESEARCH_CREDENTIALS"
          title="PEER-REVIEWED RESEARCH"
          desc="First-author publications spanning Active Noise Control deep learning, IoT graph botnet neural detection, and multi-layer cryptographic architectures."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {publications.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="solar-card p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 text-xs font-mono font-semibold text-purple-300">
                    {p.tag}
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-medium">{p.year}</span>
                </div>

                <h3 className="mt-3 font-mono text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-sky-400 font-semibold">{p.venue}</p>

                <p className="mt-3 font-mono text-xs leading-relaxed text-slate-300">{p.abstract}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{p.field}</span>
                <button
                  onClick={() => copyCitation(p, i)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-black hover:bg-white/10 border border-white/15 px-3 py-1 text-xs text-slate-300 hover:text-white transition"
                >
                  {copiedIndex === i ? (
                    <>
                      <Check size={12} className="text-emerald-400" /> COPIED
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> CITE
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
// 4. STRUCTURED SKILLS MATRIX (WIDE 4-COLUMN)
// ─────────────────────────────────────────────────────────────────────────────

export function Skills() {
  return (
    <section id="skills" className="relative z-10 w-full py-20">
      <div className="panoramic-container">
        <SectionHeading
          badge="ORBIT 04 // TECHNICAL_TOOLSET"
          title="SYSTEMS COMPETENCIES & TOOLKIT"
          desc="Low-level systems programming, developer infrastructure, deep learning acceleration, and enterprise risk audit security."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="solar-card p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-white border-b border-white/[0.08] pb-3">
                  {g.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span key={s} className="tech-tag">
                      {s}
                    </span>
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
// 5. PROMINENT CONTACT TERMINAL
// ─────────────────────────────────────────────────────────────────────────────

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative z-10 w-full py-24">
      <div className="panoramic-container">
        <div className="solar-card p-8 sm:p-12 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="solar-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>MISSION CONTROL // GET IN TOUCH</span>
              </div>
              <h2 className="mt-4 font-mono text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                LET'S BUILD SOMETHING <br />
                <span className="text-gradient-solar">EXCEPTIONAL TOGETHER.</span>
              </h2>
              <p className="font-mono mt-4 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-xl">
                I am actively open to discussing full-time opportunities in systems C++ engineering,
                local AI serving infrastructure, and research collaborations.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="btn-solar-primary">
                  <Send size={15} /> SEND DIRECT EMAIL
                </a>
                <a href={profile.resume} download className="btn-solar-secondary">
                  <FileDown size={15} /> RESUME_PDF
                </a>
              </div>
            </div>

            {/* Mission Control Telemetry Cards */}
            <div className="space-y-3 font-mono">
              {/* Email Card with 1-Click Copy */}
              <div className="rounded-2xl border border-white/[0.08] bg-black/60 p-4 flex items-center justify-between gap-3 hover:border-sky-500/40 transition">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-sky-400 border border-sky-500/30">
                    <Mail size={18} />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                      DIRECT EMAIL
                    </div>
                    <div className="text-sm font-semibold text-white truncate">
                      {profile.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition shrink-0"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Phone */}
              <a
                href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
                className="rounded-2xl border border-white/[0.08] bg-black/60 p-4 flex items-center justify-between gap-3 hover:border-amber-500/40 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-amber-400 border border-amber-500/30">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                      PHONE & WHATSAPP
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition">
                      {profile.phone}
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white transition" />
              </a>

              {/* LinkedIn */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/[0.08] bg-black/60 p-4 flex items-center justify-between gap-3 hover:border-purple-500/40 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-purple-400 border border-purple-500/30">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                      LINKEDIN NETWORK
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition">
                      hitesh-bhatnagar
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white transition" />
              </a>

              {/* GitHub */}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/[0.08] bg-black/60 p-4 flex items-center justify-between gap-3 hover:border-sky-500/40 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-sky-400 border border-sky-500/30">
                    <Github size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                      GITHUB PROFILE
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition">
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
