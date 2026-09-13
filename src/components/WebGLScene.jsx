import React, { Suspense, useMemo, useRef, useState, useEffect, Component } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RotateCw, Compass } from 'lucide-react';

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn('WebGLScene encountered an error, falling back to CSS visual:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function FallbackVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative flex h-64 w-64 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-sky-500/20 to-purple-500/15 blur-3xl animate-pulse" />
        <div className="relative h-28 w-28 rounded-full border border-amber-400/40 bg-gradient-to-br from-amber-500/40 via-sky-500/30 to-black shadow-[0_0_50px_rgba(245,158,11,0.5)]" />
        <div className="absolute h-48 w-48 rounded-full border border-sky-400/30 border-dashed" style={{ transform: 'rotateX(70deg)' }} />
        <div className="absolute h-64 w-64 rounded-full border border-amber-400/25" style={{ transform: 'rotateX(70deg)' }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ASTEROID BELT PARTICLES
// ─────────────────────────────────────────────────────────────────────────────
function AsteroidBelt() {
  const ref = useRef();
  const count = 420;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(2.85, 3.18);
      const theta = Math.random() * Math.PI * 2;
      const y = THREE.MathUtils.randFloatSpread(0.18);

      arr[i * 3] = r * Math.cos(theta);
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = r * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#cbd5e1"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORBITAL PATH TRACK RINGS
// ─────────────────────────────────────────────────────────────────────────────
function OrbitTrack({ radius, color = '#38bdf8', opacity = 0.18 }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.006, radius + 0.006, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THE SOLAR SYSTEM (CENTRAL SUN + 4 PLANETS WITH REVOLUTION & SATURN RINGS)
// ─────────────────────────────────────────────────────────────────────────────
function SolarSystemCore() {
  const sunRef = useRef();
  const coronaRef = useRef();

  // Planet Pivot Groups for Revolutions
  const p1Pivot = useRef();
  const p2Pivot = useRef();
  const p3Pivot = useRef();
  const p4Pivot = useRef();

  // Moon & Saturn Rings
  const moonRef = useRef();
  const saturnRingRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Sun pulsation & rotation
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.25;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= delta * 0.18;
      coronaRef.current.rotation.z += delta * 0.12;
    }

    // Planet 1: Jarvis C++ Inference Engine (Fast inner orbit)
    if (p1Pivot.current) {
      p1Pivot.current.rotation.y += delta * 0.95;
    }

    // Planet 2: DSP Signal Processing (Earth-like orbit + Moon)
    if (p2Pivot.current) {
      p2Pivot.current.rotation.y += delta * 0.65;
    }
    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(t * 3.5) * 0.28;
      moonRef.current.position.z = Math.sin(t * 3.5) * 0.28;
    }

    // Planet 3: RTOS Simulator (Saturn-like Ringed Giant)
    if (p3Pivot.current) {
      p3Pivot.current.rotation.y += delta * 0.42;
    }
    if (saturnRingRef.current) {
      saturnRingRef.current.rotation.z += delta * 0.3;
    }

    // Planet 4: Enterprise Audit / Security (Outer Sentry)
    if (p4Pivot.current) {
      p4Pivot.current.rotation.y += delta * 0.26;
    }
  });

  return (
    <group rotation={[0.42, 0, 0]}>
      {/* ─── 1. CENTRAL SUN (QUANTUM STELLAR CORE) ─── */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#f59e0b"
          emissiveIntensity={2.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Sun Coronal Geodesic Wireframe */}
      <mesh ref={coronaRef} scale={1.22}>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.35} />
      </mesh>

      {/* ─── 2. ORBIT TRACK LINES ─── */}
      <OrbitTrack radius={1.5} color="#38bdf8" opacity={0.22} />
      <OrbitTrack radius={2.3} color="#60a5fa" opacity={0.2} />
      <OrbitTrack radius={3.4} color="#fbbf24" opacity={0.22} />
      <OrbitTrack radius={4.4} color="#c084fc" opacity={0.2} />

      {/* Asteroid Belt */}
      <AsteroidBelt />

      {/* ─── 3. PLANET 1: INFERENCE ENGINE (METALLIC CYAN) ─── */}
      <group ref={p1Pivot}>
        <group position={[1.5, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.11, 24, 24]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        </group>
      </group>

      {/* ─── 4. PLANET 2: DSP SIGNAL RESEARCH (OCEANIC + MOON) ─── */}
      <group ref={p2Pivot}>
        <group position={[2.3, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial
              color="#2563eb"
              emissive="#0284c7"
              emissiveIntensity={0.6}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
          {/* Orbiting Moon */}
          <mesh ref={moonRef}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ─── 5. PLANET 3: RTOS KERNEL (SATURN-STYLE RINGED GIANT) ─── */}
      <group ref={p3Pivot}>
        <group position={[3.4, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.22, 28, 28]} />
            <meshStandardMaterial
              color="#d97706"
              emissive="#f59e0b"
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* Saturn's Tilted Particle Rings */}
          <group ref={saturnRingRef} rotation={[0.7, 0.3, 0]}>
            <mesh>
              <ringGeometry args={[0.3, 0.52, 64]} />
              <meshStandardMaterial
                color="#fbbf24"
                emissive="#f59e0b"
                emissiveIntensity={0.4}
                side={THREE.DoubleSide}
                transparent
                opacity={0.65}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* ─── 6. PLANET 4: ENTERPRISE AUDIT & CRYPTO (STELLAR VIOLET) ─── */}
      <group ref={p4Pivot}>
        <group position={[4.4, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.14, 24, 24]} />
            <meshStandardMaterial
              color="#9333ea"
              emissive="#a855f7"
              emissiveIntensity={0.8}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAMERA RIG WITH SMOOTH MOUSE TILT & SCROLL REACTION
// ─────────────────────────────────────────────────────────────────────────────
function CameraRig() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    // Smooth subtle mouse tilt
    const targetY = state.pointer.x * 0.22;
    const targetX = -state.pointer.y * 0.15;

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, delta * 2.5);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, delta * 2.5);
  });

  return (
    <group ref={group}>
      <SolarSystemCore />
    </group>
  );
}

function checkWebGLSupport() {
  if (typeof window === 'undefined') return false;
  try {
    if (typeof window.ResizeObserver === 'undefined') return false;
    if (!window.WebGLRenderingContext) return false;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch (e) {
    return false;
  }
}

export default function WebGLScene() {
  const [supported, setSupported] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSupported(checkWebGLSupport());
  }, []);

  if (!mounted || !supported) {
    return <FallbackVisual />;
  }

  return (
    <SceneErrorBoundary fallback={<FallbackVisual />}>
      <div className="relative h-full w-full overflow-hidden bg-black select-none cursor-grab active:cursor-grabbing">
        {/* Orbital Telemetry Badge */}
        <div className="pointer-events-none absolute bottom-3 right-3 z-20 flex items-center gap-2 rounded-full border border-amber-500/30 bg-black/80 px-3 py-1 text-[11px] font-mono text-amber-300 backdrop-blur-md">
          <RotateCw size={12} className="animate-spin text-amber-400" style={{ animationDuration: '8s' }} />
          <span>SOLAR SYSTEM // DRAG TO ROTATE ORBIT</span>
        </div>

        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 2.2, 7.8], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <Suspense fallback={<FallbackVisual />}>
            {/* Solar system lighting */}
            <ambientLight intensity={0.45} />
            <pointLight position={[0, 0, 0]} intensity={7.0} color="#fbbf24" distance={15} decay={2} />
            <pointLight position={[8, 5, 8]} intensity={2.5} color="#38bdf8" />
            <pointLight position={[-8, -5, -8]} intensity={2.0} color="#c084fc" />

            <CameraRig />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.5}
              minPolarAngle={Math.PI / 4.5}
              maxPolarAngle={Math.PI / 1.4}
            />
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}