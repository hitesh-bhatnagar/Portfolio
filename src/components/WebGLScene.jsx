import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Text } from '@react-three/drei';

function ParticleField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const count = 800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(2.5, 6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.7;
    }
    return arr;
  }, []);

  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.03;
    ref.current.rotation.x += d * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function CoreSystem() {
  const core = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();

  useFrame((_, d) => {
    if (core.current) { core.current.rotation.x += d * 0.2; core.current.rotation.y += d * 0.35; }
    if (ringA.current) ringA.current.rotation.z += d * 0.5;
    if (ringB.current) ringB.current.rotation.x += d * 0.4;
    if (ringC.current) ringC.current.rotation.y -= d * 0.3;
  });

  return (
    <group>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.9, 3]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.7} metalness={0.9} roughness={0.15} transparent opacity={0.8} />
      </mesh>
      <mesh scale={1.05}>
        <icosahedronGeometry args={[0.9, 2]} />
        <meshBasicMaterial color="#fff" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[1.5, 0.012, 16, 160]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.5} />
      </mesh>
      <mesh ref={ringB} rotation={[0, Math.PI / 2.3, 0]}>
        <torusGeometry args={[1.9, 0.01, 16, 160]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ringC} rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.3, 0.009, 16, 160]} />
        <meshStandardMaterial color="#d946ef" emissive="#c026d3" emissiveIntensity={1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#fff" emissive="#8b5cf6" emissiveIntensity={2.5} roughness={0.1} />
      </mesh>
    </group>
  );
}

function OrbitBadge({ label, position, color }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.lookAt(state.camera.position);
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.08;
  });

  return (
    <group ref={mesh} position={position}>
      <mesh>
        <boxGeometry args={[0.7, 0.28, 0.05]} />
        <meshStandardMaterial color="#030014" emissive={color} emissiveIntensity={0.3} metalness={0.4} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[0.74, 0.32]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      <Text position={[0, 0, 0.08]} fontSize={0.13} color="#fff" anchorX="center" anchorY="middle" fontWeight={800}>
        {label}
      </Text>
    </group>
  );
}

function SceneRig() {
  const group = useRef();
  useFrame((state, d) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.4, d * 2);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.25, d * 2);
  });

  return (
    <group ref={group}>
      <ParticleField />
      <Float speed={2} rotationIntensity={0.35} floatIntensity={0.5}>
        <CoreSystem />
      </Float>
      <OrbitBadge label="AI" position={[-2.1, 1.3, 0.1]} color="#06b6d4" />
      <OrbitBadge label="DSP" position={[2.05, 1, -0.15]} color="#8b5cf6" />
      <OrbitBadge label="RTOS" position={[-2, -1.1, 0.2]} color="#d946ef" />
      <OrbitBadge label="C++" position={[2, -1.2, 0.12]} color="#10b981" />
    </group>
  );
}

export default function WebGLScene() {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.5], fov: 44 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#030014']} />
          <ambientLight intensity={1.2} />
          <pointLight position={[3, 4, 5]} intensity={10} color="#06b6d4" />
          <pointLight position={[-4, -2, 4]} intensity={7} color="#8b5cf6" />
          <pointLight position={[0, -4, 3]} intensity={4} color="#d946ef" />
          <SceneRig />
          <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.08} rotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
