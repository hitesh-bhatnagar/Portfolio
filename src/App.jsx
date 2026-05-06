import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Text } from '@react-three/drei';
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Lock,
  Mail,
  Menu,
  Phone,
  RadioTower,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import {
  experiences,
  metrics,
  profile,
  projects,
  publications,
  roleTargets,
  skillGroups,
} from './data/portfolio';

const iconMap = {
  ai: BrainCircuit,
  audit: ShieldCheck,
  db: Database,
  embedded: RadioTower,
  ml: Activity,
  systems: Cpu,
  code: Code2,
  security: Lock,
};

const navItems = ['Projects', 'Experience', 'Skills', 'Publications', 'Contact'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('Featured');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  const categories = useMemo(() => ['Featured', ...new Set(projects.map((project) => project.category))], []);
  const visibleProjects = useMemo(() => {
    if (filter === 'Featured') return projects.filter((project) => project.status === 'Featured').slice(0, 5);
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  useEffect(() => {
    const root = document.documentElement;
    const moveSpotlight = (event) => {
      root.style.setProperty('--cursor-x', `${event.clientX}px`);
      root.style.setProperty('--cursor-y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', moveSpotlight);
    return () => window.removeEventListener('pointermove', moveSpotlight);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white selection:bg-cyan-300 selection:text-slate-950">
      <motion.div className="fixed left-0 right-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400" style={{ scaleX }} />
      <Spotlight />
      <PremiumBackground />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <MobileMenu close={() => setMenuOpen(false)} />}
      <Hero />
      <ProofStrip />
      <Projects categories={categories} filter={filter} setFilter={setFilter} visibleProjects={visibleProjects} />
      <Experience />
      <Skills />
      <Publications />
      <RecruiterSnapshot />
      <Contact />
      <Footer />
    </main>
  );
}

function Spotlight() {
  return <div className="pointer-events-none fixed inset-0 z-[1] hidden opacity-70 mix-blend-screen lg:block spotlight" />;
}

function PremiumBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-radial-premium">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="aurora aurora-three" />
      <div className="noise" />
    </div>
  );
}

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/10 shadow-glow">
            <span className="font-display text-lg font-black tracking-tight">HB</span>
          </span>
          <span className="hidden text-sm font-semibold text-slate-200 sm:block">
            Hitesh<span className="text-cyan-300">.</span>Systems<span className="text-violet-300">()</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${slug(item)}`} className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
              {item}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={profile.github} target="_blank" rel="noreferrer" className="icon-button" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-button" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href={profile.resume} className="premium-button small" download>
            <Download size={16} /> Resume
          </a>
        </div>
        <button className="icon-button lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ close }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="fixed inset-x-4 top-20 z-[60] rounded-[2rem] border border-white/10 bg-slate-950/90 p-4 shadow-glass backdrop-blur-2xl lg:hidden"
    >
      <div className="grid gap-2">
        {navItems.map((item) => (
          <a key={item} href={`#${slug(item)}`} onClick={close} className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10">
            {item}
          </a>
        ))}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <a href={profile.github} target="_blank" rel="noreferrer" className="premium-button justify-center small">
            <Github size={16} /> GitHub
          </a>
          <a href={profile.resume} className="premium-button secondary justify-center small" download>
            <Download size={16} /> Resume
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.62]);

  return (
    <section id="top" className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pt-32 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:pt-24">
      <motion.div style={{ y: heroY, opacity: heroOpacity }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-base font-bold text-cyan-100 shadow-glow">
          <Sparkles size={17} /> Available for AI, Systems, Embedded & Audit Automation roles
        </div>
        <h1 className="mt-7 max-w-5xl font-display text-5xl font-black leading-[0.92] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl">
          Engineering{' '}
          <span className="text-gradient">private AI</span>{' '}
          and low-level systems that recruiters remember.
        </h1>
        <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-300 sm:text-2xl">
          {profile.summary}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {profile.focus.map((item) => (
            <span key={item} className="chip">
              <Zap size={14} /> {item}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#projects" className="premium-button">
            Explore Projects <ArrowUpRight size={18} />
          </a>
          <a href={`mailto:${profile.email}`} className="premium-button secondary">
            <Mail size={18} /> Contact Me
          </a>
        </div>
        <div className="mt-9 grid max-w-2xl grid-cols-1 gap-3 text-sm text-slate-400 sm:grid-cols-3">
          <MiniFact icon={GraduationCap} label="B.Tech ECE" value="VIT Vellore" />
          <MiniFact icon={BadgeCheck} label="GPA" value="8.37 / 10" />
          <MiniFact icon={BriefcaseBusiness} label="Current" value="IT Risk Advisory" />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.92, rotateX: 12 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} transition={{ duration: 1, delay: 0.18 }}>
        <HeroConsole />
      </motion.div>
    </section>
  );
}

function MiniFact({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
      <Icon className="mb-3 text-cyan-300" size={18} />
      <div className="text-xs uppercase tracking-[0.26em] text-slate-500">{label}</div>
      <div className="mt-1 font-semibold text-slate-100">{value}</div>
    </div>
  );
}

function HeroConsole() {
  return (
    <TiltCard className="hero-3d-shell relative mx-auto max-w-xl rounded-[2.35rem] border border-white/10 bg-white/[0.065] p-5 shadow-glass backdrop-blur-2xl">
      <div className="absolute -inset-1 -z-10 rounded-[2.65rem] bg-gradient-to-br from-cyan-400/40 via-violet-500/25 to-fuchsia-500/30 blur-2xl" />
      <div className="absolute inset-0 rounded-[2.35rem] scanline" />

      <div className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-slate-950/82 p-5">
        <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 backdrop-blur-2xl">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.25em] text-cyan-100">
            webgl.engine
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
            <div className="mb-3 flex items-center gap-2 text-base font-bold text-cyan-100">
              <Server size={17} /> Runtime Stack
            </div>
            <CodeLine prompt="build" text="local RAG engine" accent="C++" />
            <CodeLine prompt="mask" text="client PII safely" accent="Python" />
            <CodeLine prompt="simulate" text="RTOS scheduling" accent="C" />
            <CodeLine prompt="ship" text="audit automation" accent="AI" />
          </div>

          <div className="relative min-h-[390px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.025]">
            <div className="hologram-grid" />
            <WebGLHeroScene />
            <div className="pointer-events-none absolute inset-x-6 bottom-5 rounded-2xl border border-cyan-300/10 bg-slate-950/50 px-4 py-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-xl">
              Move mouse / drag core
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <CodeLine prompt="status" text="portfolio upgraded" accent="3D UI" />
          <CodeLine prompt="motion" text="mouse + scroll reactive" accent="premium" />
        </div>
      </div>
    </TiltCard>
  );
}

function WebGLHeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.7]} camera={{ position: [0, 0, 6.4], fov: 44 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#020617']} />
          <ambientLight intensity={1.4} />
          <pointLight position={[3, 4, 5]} intensity={10} color="#67e8f9" />
          <pointLight position={[-4, -2, 4]} intensity={7} color="#a78bfa" />
          <pointLight position={[0, -4, 3]} intensity={4} color="#f0abfc" />
          <SceneRig />
          <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.08} rotateSpeed={0.55} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneRig() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.42, delta * 2.2);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.28, delta * 2.2);
  });

  return (
    <group ref={group}>
      <ParticleField />
      <Float speed={2.1} rotationIntensity={0.38} floatIntensity={0.55}>
        <CoreSystem />
      </Float>
      <OrbitBadge label="AI" position={[-2.15, 1.35, 0.1]} color="#67e8f9" />
      <OrbitBadge label="DSP" position={[2.1, 1.05, -0.15]} color="#a78bfa" />
      <OrbitBadge label="RTOS" position={[-2.05, -1.15, 0.2]} color="#f0abfc" />
      <OrbitBadge label="C++" position={[2.05, -1.25, 0.12]} color="#22c55e" />
    </group>
  );
}

function CoreSystem() {
  const core = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();

  useFrame((_, delta) => {
    if (core.current) {
      core.current.rotation.x += delta * 0.22;
      core.current.rotation.y += delta * 0.38;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.55;
    if (ringB.current) ringB.current.rotation.x += delta * 0.42;
    if (ringC.current) ringC.current.rotation.y -= delta * 0.34;
  });

  return (
    <group>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.95, 3]} />
        <meshStandardMaterial color="#67e8f9" emissive="#0e7490" emissiveIntensity={0.65} metalness={0.85} roughness={0.18} transparent opacity={0.74} />
      </mesh>
      <mesh scale={1.04}>
        <icosahedronGeometry args={[0.95, 2]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.16} />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[1.55, 0.012, 16, 160]} />
        <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={1.4} />
      </mesh>
      <mesh ref={ringB} rotation={[0, Math.PI / 2.35, 0]}>
        <torusGeometry args={[1.95, 0.01, 16, 160]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ringC} rotation={[Math.PI / 2.55, Math.PI / 4.2, 0]}>
        <torusGeometry args={[2.35, 0.009, 16, 160]} />
        <meshStandardMaterial color="#f0abfc" emissive="#db2777" emissiveIntensity={0.95} />
      </mesh>

      <mesh position={[0, 0, -0.02]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#67e8f9" emissiveIntensity={2.4} roughness={0.15} />
      </mesh>
    </group>
  );
}

function OrbitBadge({ label, position, color }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.lookAt(state.camera.position);
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.3 + position[0]) * 0.07;
  });

  return (
    <group ref={mesh} position={position}>
      <mesh>
        <boxGeometry args={[0.72, 0.3, 0.06]} />
        <meshStandardMaterial color="#020617" emissive={color} emissiveIntensity={0.3} metalness={0.35} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[0.76, 0.34]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
      <Text position={[0, 0, 0.09]} fontSize={0.14} color="#ffffff" anchorX="center" anchorY="middle" fontWeight={900}>
        {label}
      </Text>
    </group>
  );
}

function ParticleField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const count = 650;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = THREE.MathUtils.randFloat(2.2, 5.2);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.78;
      arr[i * 3 + 2] = radius * Math.cos(phi) * 0.72;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.035;
    ref.current.rotation.x += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#67e8f9" transparent opacity={0.58} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function CodeLine({ prompt, text, accent }) {
  return (
    <div className="mb-3 rounded-2xl border border-white/10 bg-slate-950/60 p-3 font-mono text-sm text-slate-300 last:mb-0">
      <span className="text-fuchsia-300">{prompt}</span>
      <span className="text-slate-600"> :: </span>
      {text} <span className="text-cyan-300">[{accent}]</span>
    </div>
  );
}

function TiltCard({ children, className = '' }) {
  const onMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty('--rx', `${y * -10}deg`);
    element.style.setProperty('--ry', `${x * 12}deg`);
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    element.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };
  const onLeave = (event) => {
    const element = event.currentTarget;
    element.style.setProperty('--rx', '0deg');
    element.style.setProperty('--ry', '0deg');
  };
  return (
    <div className={`tilt-card ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="tilt-shine" />
      {children}
    </div>
  );
}

function ProofStrip() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: index * 0.07 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-glass backdrop-blur-xl"
          >
            <div className="font-display text-4xl font-black tracking-tight text-white">{metric.value}</div>
            <div className="mt-2 font-semibold text-cyan-100">{metric.label}</div>
            <div className="mt-2 text-sm leading-6 text-slate-400">{metric.detail}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-violet-100">
        <Sparkles size={14} /> {eyebrow}
      </div>
      <h2 className="font-display text-4xl font-black tracking-[-0.05em] sm:text-6xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-slate-300">{description}</p>
    </div>
  );
}

function Projects({ categories, filter, setFilter, visibleProjects }) {
  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeader
        eyebrow="Selected builds"
        title="Projects with a story, not just cards."
        description="The portfolio highlights the projects that make you stand out: local AI, C/C++ internals, embedded systems, DSP research, and privacy-first audit automation."
      />
      <div className="mb-9 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button key={category} onClick={() => setFilter(category)} className={`filter-pill ${filter === category ? 'active' : ''}`}>
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const Icon = iconMap[project.icon] || Layers3;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.58, delay: index * 0.06 }}
    >
      <TiltCard className="group h-full rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-glass backdrop-blur-xl">
        <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-300/[0.08] via-transparent to-fuchsia-400/[0.08] opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-cyan-200 shadow-glow">
              <Icon size={26} />
            </div>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">{project.status}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">{project.year}</span>
              </div>
              <h3 className="font-display text-2xl font-black tracking-tight text-white">{project.title}</h3>
              <p className="mt-2 text-sm font-medium text-violet-200">{project.subtitle}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="icon-button" aria-label={`Open ${project.title} live`}>
                <ExternalLink size={18} />
              </a>
            )}
            <a href={project.repo} target="_blank" rel="noreferrer" className="icon-button" aria-label={`Open ${project.title} repository`}>
              <Github size={18} />
            </a>
          </div>
        </div>
        <p className="mt-5 rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm leading-6 text-slate-300">
          <span className="font-semibold text-cyan-200">Impact:</span> {project.impact}
        </p>
        <ul className="mt-5 grid gap-3">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-300">
              <ChevronRight className="mt-1 shrink-0 text-cyan-300" size={16} /> {highlight}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>
      </TiltCard>
    </motion.article>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeader
        eyebrow="Experience"
        title="Research depth + enterprise audit reality."
        description="Your profile becomes stronger because it combines real research metrics with real enterprise control-testing, privacy, and automation exposure."
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300 via-violet-400 to-transparent md:block" />
        <div className="grid gap-6">
          {experiences.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="relative rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-glass backdrop-blur-xl md:ml-16"
            >
              <div className="absolute -left-[4.75rem] top-7 hidden h-12 w-12 place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-glow md:grid">
                <BriefcaseBusiness size={22} />
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-black tracking-tight">{item.role}</h3>
                  <p className="mt-1 font-semibold text-cyan-100">{item.company}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.place}</p>
                </div>
                <span className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300">{item.period}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="tech-pill">{tag}</span>
                ))}
              </div>
              <ul className="mt-6 grid gap-3">
                {item.lines.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <BadgeCheck className="mt-1 shrink-0 text-emerald-300" size={16} /> {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeader
        eyebrow="Capability map"
        title="A technical stack that connects hardware thinking to AI products."
        description="The design presents your skills as connected engineering systems instead of a plain list of technologies."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => {
          const Icon = iconMap[group.icon] || Wrench;
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-glass backdrop-blur-xl"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/10 text-cyan-200">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-black tracking-tight">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Publications() {
  return (
    <section id="publications" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeader
        eyebrow="Publications"
        title="Signals of research seriousness."
        description="These should be visible because they separate you from typical fresher portfolios and support your DSP, security, and IoT direction."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {publications.map((paper, index) => (
          <motion.div
            key={paper.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: index * 0.07 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-glass backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1 text-xs font-bold text-fuchsia-100">{paper.tag}</span>
              <span className="text-sm font-bold text-cyan-200">{paper.year}</span>
            </div>
            <h3 className="font-display text-xl font-black leading-tight tracking-tight">{paper.title}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">{paper.venue}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function RecruiterSnapshot() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="grid gap-5 rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-2xl lg:grid-cols-[0.95fr_1.05fr] lg:p-9">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-100">
            <Rocket size={14} /> Recruiter snapshot
          </div>
          <h2 className="font-display text-4xl font-black tracking-[-0.04em] sm:text-5xl">The one-liner employers should remember.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Hitesh is an ECE engineer who can build privacy-first AI products, reason about systems internals, and convert enterprise audit pain-points into working automation.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {roleTargets.map((role) => (
            <div key={role} className="rounded-3xl border border-white/10 bg-slate-950/45 p-4 text-sm font-semibold text-slate-200">
              <BadgeCheck className="mb-3 text-cyan-300" size={18} /> {role}
            </div>
          ))}
          <a href={profile.resume} download className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/15">
            <FileText className="mb-3" size={18} /> Download recruiter-ready resume
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.045] to-cyan-300/[0.06] p-7 shadow-glass backdrop-blur-2xl sm:p-10 lg:p-14">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-100">
              <Mail size={14} /> Contact
            </div>
            <h2 className="font-display text-4xl font-black tracking-[-0.04em] sm:text-6xl">Want to discuss AI systems, embedded work, or audit automation?</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Send a message, review the GitHub builds, or download the resume. The site is built to help recruiters quickly understand your technical depth.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href={`mailto:${profile.email}`} className="premium-button">
              <Mail size={18} /> {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`} className="premium-button secondary">
              <Phone size={18} /> {profile.phone}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="premium-button secondary">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-5 py-10 text-center text-sm text-slate-500 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React, Vite, Tailwind, Framer Motion, Lenis, and WebGL.</p>
        <div className="flex gap-3">
          <a href={profile.github} target="_blank" rel="noreferrer" className="icon-button" aria-label="GitHub"><Github size={18} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-button" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href={`mailto:${profile.email}`} className="icon-button" aria-label="Email"><Mail size={18} /></a>
        </div>
      </div>
    </footer>
  );
}

function slug(value) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

export default App;
