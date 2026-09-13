import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, CheckCircle2, Copy, Check } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-mono">
        {/* Void black backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-amber-500/30 bg-black p-6 sm:p-8 shadow-[0_0_80px_-20px_rgba(245,158,11,0.3)]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="pr-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-0.5 text-xs font-mono font-semibold text-amber-300">
                {project.category}
              </span>
              <span className="font-mono text-xs text-slate-400 font-medium">{project.year}</span>
              {project.status && (
                <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-mono text-slate-300">
                  {project.status}
                </span>
              )}
            </div>

            <h2 className="mt-3 font-mono text-2xl font-bold text-white sm:text-3xl tracking-tight">
              {project.title}
            </h2>
            <p className="font-mono mt-1 text-sm text-slate-300">{project.subtitle}</p>
          </div>

          {/* Action Links */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="btn-solar-primary btn-solar-small"
            >
              <Github size={14} /> VIEW ON GITHUB
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn-solar-secondary btn-solar-small"
              >
                <ExternalLink size={14} /> LIVE APPLICATION
              </a>
            )}
          </div>

          {/* Architecture Specification */}
          {project.architecture && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#060a14] p-5">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-400">
                <Cpu size={15} /> SYSTEMS ARCHITECTURE & COMPUTE SPEC
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300 font-mono">
                {project.architecture}
              </p>
            </div>
          )}

          {/* Key Implementation Highlights */}
          <div className="mt-6">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              TECHNICAL SPECIFICATIONS
            </h4>
            <ul className="mt-3 grid gap-2.5 font-mono">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-400" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet */}
          {project.codeSnippet && (
            <div className="mt-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  SOURCE IMPLEMENTATION PREVIEW
                </span>
                <button
                  onClick={() => handleCopy(project.codeSnippet)}
                  className="font-mono inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 hover:text-white transition"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copied ? 'COPIED' : 'COPY'}
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-[#03050a] p-4 font-mono text-xs leading-relaxed text-slate-200">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
