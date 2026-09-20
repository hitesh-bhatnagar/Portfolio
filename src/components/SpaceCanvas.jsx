import React, { Suspense, useMemo, useRef, useState, useEffect, Component } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

class SpaceCanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err) {
    console.warn('SpaceCanvas degraded gracefully:', err);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function Starfield({ isMobile }) {
  const pointsRef = useRef();
  const count = isMobile ? 450 : 1000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#7dd3fc'),
      new THREE.Color('#93c5fd'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#38bdf8'),
    ];

    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(15, 60);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.012;
    pointsRef.current.rotation.x += delta * 0.006;

    if (!isMobile) {
      const targetX = state.pointer.x * 0.08;
      const targetY = state.pointer.y * 0.05;
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        targetX,
        delta * 2
      );
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        targetY,
        delta * 2
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.09 : 0.11}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function checkWebGLSupport() {
  if (typeof window === 'undefined') return false;
  try {
    if (typeof window.ResizeObserver === 'undefined') return false;
    if (!window.WebGLRenderingContext) return false;
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    );
  } catch (e) {
    return false;
  }
}

export default function SpaceCanvas() {
  const [mounted, setMounted] = useState(false);
  const [supported, setSupported] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSupported(checkWebGLSupport());
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted || !supported) {
    return null;
  }

  return (
    <SpaceCanvasErrorBoundary>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-60">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 28], fov: 60 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <Suspense fallback={null}>
            <Starfield isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>
    </SpaceCanvasErrorBoundary>
  );
}
