import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, CheckCircle2, Copy, Check, Code2, Layers } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'code'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 lg:p-8">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0a0e1a] p-5 sm:p-8 shadow-[0_0_80px_-20px_rgba(56,189,248,0.25)]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 sm:right-6 top-4 sm:top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="pr-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sky-500/15 border border-sky-500/30 px-3 py-0.5 text-xs font-mono font-semibold text-sky-300">
                {project.categoryLabel || project.category}
              </span>
              <span className="font-mono text-xs text-slate-400">{project.year}</span>
              {project.status && (
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-mono text-emerald-400">
                  {project.status}
                </span>
              )}
            </div>

            <h2 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">{project.subtitle}</p>
          </div>

          {/* Action Links */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="btn-primary btn-small"
            >
              <Github size={14} /> View on GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary btn-small"
              >
                <ExternalLink size={14} /> Live Application
              </a>
            )}
          </div>

          {/* Key Metrics Pill Bar */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-[#060912] p-3 text-center"
                >
                  <span className="font-mono text-xs font-medium text-amber-300">{m}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab Selector */}
          <div className="mt-6 flex items-center gap-2 border-b border-white/10 pb-2">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 'architecture'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers size={14} /> Architecture & Spec
            </button>
            {project.codeSnippet && (
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'code'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 size={14} /> Source Code Routine
              </button>
            )}
          </div>

          {/* Tab Content */}
          {activeTab === 'architecture' ? (
            <div className="space-y-6 pt-4">
              {/* Architecture Spec */}
              {project.architecture && (
                <div className="rounded-2xl border border-white/10 bg-[#070a14] p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 font-mono">
                    <Cpu size={15} /> Systems Architecture & Memory Pipeline
                  </div>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                    {project.architecture}
                  </p>
                </div>
              )}

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Technical Specifications & Engineering Routines
                </h4>
                <ul className="mt-3 grid gap-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-400" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="pt-4">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-mono text-slate-400">
                  Core Algorithm / Routine Preview
                </span>
                <button
                  onClick={() => handleCopy(project.codeSnippet)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 hover:text-white transition"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#04060c] p-4 font-mono text-xs leading-relaxed text-slate-200">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tech Stack Footer */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[11px] font-mono uppercase text-slate-400 mb-2">Technologies Used</div>
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
