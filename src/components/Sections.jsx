import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, ExternalLink, Github, BadgeCheck, BriefcaseBusiness, FileText, Rocket, Mail, Phone, Linkedin } from 'lucide-react';
import { Activity, BrainCircuit, ShieldCheck, Database, RadioTower, Cpu, Code2, Lock, Layers3, Wrench } from 'lucide-react';
import { projects, experiences, publications, skillGroups, roleTargets, profile } from '../data/portfolio';
import { TiltCard } from './Hero';

const iconMap = { ai: BrainCircuit, audit: ShieldCheck, db: Database, embedded: RadioTower, ml: Activity, systems: Cpu, code: Code2, security: Lock };

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
        <Sparkles size={14} /> {eyebrow}
      </div>
      <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h2>
      {desc && <p className="mt-5 text-lg leading-8 text-slate-400">{desc}</p>}
    </div>
  );
}

export function Projects({ categories, filter, setFilter, visibleProjects }) {
  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader eyebrow="Projects" title="Systems I've built from scratch." desc="Local AI engines, embedded simulators, database internals, and research pipelines." />
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map(c => <button key={c} onClick={() => setFilter(c)} className={`filter-pill ${filter === c ? 'active' : ''}`}>{c}</button>)}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {visibleProjects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }) {
  const Icon = iconMap[p.icon] || Layers3;
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
      <TiltCard className="group h-full glass-card p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/[0.06] bg-violet-500/10 text-violet-400">
              <Icon size={22} />
            </div>
            <div>
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className={`status-badge ${p.status === 'Featured' ? 'status-featured' : 'status-default'}`}>{p.status}</span>
                <span className="text-xs text-slate-600">{p.year}</span>
                {p.stars > 0 && <span className="text-xs text-yellow-500/70">★ {p.stars}</span>}
              </div>
              <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
              <p className="mt-1 text-base text-violet-300/70">{p.subtitle}</p>
            </div>
          </div>
          <div className="flex gap-1.5 shrink-0">
            {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="icon-btn"><ExternalLink size={15} /></a>}
            <a href={p.repo} target="_blank" rel="noreferrer" className="icon-btn"><Github size={15} /></a>
          </div>
        </div>
        <p className="mt-4 rounded-lg border border-white/[0.04] bg-black/20 p-4 text-base text-slate-400">
          <span className="font-semibold text-violet-300">Impact: </span>{p.impact}
        </p>
        <ul className="mt-4 grid gap-2">
          {p.highlights.map(h => <li key={h} className="flex gap-2 text-base leading-7 text-slate-400"><ChevronRight className="mt-1 shrink-0 text-violet-500" size={15} />{h}</li>)}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
        </div>
      </TiltCard>
    </motion.article>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader eyebrow="Experience" title="Research meets enterprise reality." desc="IIT Goa research internship + enterprise ITGC audits for ONGC and BMW Financial Services." />
      <div className="relative mx-auto max-w-4xl">
        <div className="timeline-line hidden md:block" />
        <div className="grid gap-5">
          {experiences.map((exp, i) => (
            <motion.div key={exp.company} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative glass-card p-5 md:ml-12">
              <div className="timeline-dot hidden md:block" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{exp.role}</h3>
                  <p className="mt-1 text-base font-semibold text-violet-300">{exp.company}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{exp.place}</p>
                </div>
                <span className="w-fit rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs font-semibold text-slate-400">{exp.period}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">{exp.tags.map(t => <span key={t} className="tech-pill">{t}</span>)}</div>
              <ul className="mt-4 grid gap-3">{exp.lines.map(l => <li key={l} className="flex gap-2 text-base leading-7 text-slate-400"><BadgeCheck className="mt-1 shrink-0 text-emerald-400" size={15} />{l}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader eyebrow="Skills" title="Hardware thinking to AI products." desc="A connected engineering stack spanning systems, ML, backend, and ECE." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => {
          const Icon = iconMap[g.icon] || Wrench;
          return (
            <motion.div key={g.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-card p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06] bg-violet-500/10 text-violet-400"><Icon size={20} /></div>
                <h3 className="font-display text-xl font-bold text-white">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">{g.skills.map(s => <span key={s} className="tech-pill">{s}</span>)}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function Publications() {
  return (
    <section id="publications" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader eyebrow="Publications" title="Peer-reviewed research." desc="Elsevier journal, IEEE conference, and ANRF-sponsored work in DSP, cryptography, and IoT security." />
      <div className="grid gap-4 lg:grid-cols-3">
        {publications.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.07 }}
            className="glass-card p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="status-badge border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300">{p.tag}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400">{p.status}</span>
                <span className="text-xs font-bold text-slate-500">{p.year}</span>
              </div>
            </div>
            <h3 className="font-display text-xl font-bold leading-tight text-white">{p.title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-500">{p.venue}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function RecruiterSnapshot() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="grid gap-6 glass-card p-6 lg:grid-cols-[1fr_1fr] lg:p-8">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-emerald-300"><Rocket size={12} /> Recruiter Snapshot</div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">The one-liner employers remember.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">An ECE engineer who builds privacy-first AI products, reasons about systems internals, publishes research, and converts enterprise audit pain-points into working automation.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {roleTargets.map(r => (
            <div key={r} className="rounded-xl border border-white/[0.04] bg-black/20 p-4 text-base font-semibold text-slate-300">
              <BadgeCheck className="mb-2 text-violet-400" size={16} /> {r}
            </div>
          ))}
          <a href={profile.resume} download className="rounded-xl border border-violet-500/15 bg-violet-500/[0.06] p-3 text-sm font-bold text-violet-300 transition hover:bg-violet-500/10">
            <FileText className="mb-2" size={16} /> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="relative overflow-hidden glass-card p-6 sm:p-10">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-violet-300"><Mail size={12} /> Contact</div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Let's build something extraordinary.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">Open to research collaborations, ML/Systems roles, team projects, hackathons, and more.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <a href={`mailto:${profile.email}`} className="btn-primary"><Mail size={16} /> {profile.email}</a>
            <a href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`} className="btn-secondary"><Phone size={16} /> {profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-secondary"><Linkedin size={16} /> LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
