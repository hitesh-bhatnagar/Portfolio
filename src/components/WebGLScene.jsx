import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Text,
  Sparkles,
  Stars,
} from "@react-three/drei";

const SKILLS = [
  {
    label: "AI / ML",
    sub: "Deep Learning",
    color: "#06b6d4",
    radius: 2.65,
    speed: 0.42,
    y: 1.1,
    phase: 0.2,
  },
  {
    label: "DSP",
    sub: "Signals",
    color: "#8b5cf6",
    radius: 2.9,
    speed: 0.35,
    y: -0.9,
    phase: 1.9,
  },
  {
    label: "RTOS",
    sub: "Embedded C",
    color: "#d946ef",
    radius: 3.15,
    speed: 0.28,
    y: 0.35,
    phase: 3.4,
  },
  {
    label: "WebGL",
    sub: "3D UI",
    color: "#10b981",
    radius: 2.45,
    speed: 0.48,
    y: -1.35,
    phase: 4.7,
  },
  {
    label: "Rust",
    sub: "Backend",
    color: "#f59e0b",
    radius: 3.35,
    speed: 0.25,
    y: 1.45,
    phase: 5.6,
  },
];

function ParticleField() {
  const ref = useRef();

  const positions = useMemo(() => {
    const count = 1600;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(2.2, 7.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.72;
    }

    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.035;
    ref.current.rotation.x += delta * 0.012;

    const pulse = Math.sin(state.clock.elapsedTime * 0.7) * 0.05 + 1;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#a78bfa"
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function DataStreams() {
  const group = useRef();

  const streams = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const angle = (i / 28) * Math.PI * 2;
      const radius = THREE.MathUtils.randFloat(2.8, 4.7);
      const height = THREE.MathUtils.randFloat(-2.2, 2.2);

      return {
        angle,
        radius,
        height,
        speed: THREE.MathUtils.randFloat(0.25, 0.8),
        color: ["#06b6d4", "#8b5cf6", "#d946ef", "#10b981"][i % 4],
      };
    });
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={group}>
      {streams.map((s, i) => {
        const x = Math.cos(s.angle) * s.radius;
        const z = Math.sin(s.angle) * s.radius;

        return (
          <Float
            key={i}
            speed={s.speed}
            floatIntensity={0.4}
            rotationIntensity={0.25}
          >
            <mesh position={[x, s.height, z]} rotation={[0, -s.angle, 0]}>
              <boxGeometry args={[0.018, 0.018, 0.8]} />
              <meshStandardMaterial
                color={s.color}
                emissive={s.color}
                emissiveIntensity={1.6}
                roughness={0.22}
                metalness={0.55}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function HologramGrid() {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.opacity =
      0.13 + Math.sin(state.clock.elapsedTime * 1.4) * 0.035;
  });

  return (
    <gridHelper
      ref={ref}
      args={[11, 34, "#06b6d4", "#312e81"]}
      position={[0, -2.55, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function CoreSystem() {
  const core = useRef();
  const outer = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();
  const ringD = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (core.current) {
      core.current.rotation.x += delta * 0.22;
      core.current.rotation.y += delta * 0.42;
      core.current.scale.setScalar(1 + Math.sin(t * 1.6) * 0.035);
    }

    if (outer.current) {
      outer.current.rotation.y -= delta * 0.18;
      outer.current.rotation.z += delta * 0.09;
    }

    if (ringA.current) ringA.current.rotation.z += delta * 0.55;
    if (ringB.current) ringB.current.rotation.x += delta * 0.38;
    if (ringC.current) ringC.current.rotation.y -= delta * 0.32;
    if (ringD.current) ringD.current.rotation.z -= delta * 0.22;
  });

  return (
    <group>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.86, 5]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#6d28d9"
          emissiveIntensity={1.1}
          metalness={0.88}
          roughness={0.12}
          transparent
          opacity={0.88}
        />
      </mesh>

      <mesh ref={outer} scale={1.12}>
        <icosahedronGeometry args={[0.9, 2]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.14}
        />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.08, 0, 0]}>
        <torusGeometry args={[1.45, 0.012, 18, 180]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={2.1}
        />
      </mesh>

      <mesh ref={ringB} rotation={[0, Math.PI / 2.25, 0]}>
        <torusGeometry args={[1.85, 0.01, 18, 180]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={1.8}
        />
      </mesh>

      <mesh ref={ringC} rotation={[Math.PI / 2.48, Math.PI / 4, 0]}>
        <torusGeometry args={[2.25, 0.009, 18, 180]} />
        <meshStandardMaterial
          color="#d946ef"
          emissive="#c026d3"
          emissiveIntensity={1.5}
        />
      </mesh>

      <mesh ref={ringD} rotation={[Math.PI / 3.2, -Math.PI / 5, 0]}>
        <torusGeometry args={[2.75, 0.007, 18, 220]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1.25}
          transparent
          opacity={0.78}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.22, 40, 40]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2.9}
          roughness={0.08}
        />
      </mesh>
    </group>
  );
}

function SkillNode({ skill }) {
  const group = useRef();
  const dot = useRef();

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime * skill.speed + skill.phase;
    const x = Math.cos(t) * skill.radius;
    const z = Math.sin(t) * skill.radius * 0.42;
    const y = skill.y + Math.sin(t * 1.7) * 0.12;

    group.current.position.set(x, y, z);
    group.current.lookAt(state.camera.position);

    if (dot.current) {
      dot.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2.8 + skill.phase) * 0.12);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={dot} position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.085, 24, 24]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={2.4}
          roughness={0.1}
        />
      </mesh>

      <mesh>
        <boxGeometry args={[0.95, 0.45, 0.055]} />
        <meshStandardMaterial
          color="#05010f"
          emissive={skill.color}
          emissiveIntensity={0.42}
          metalness={0.45}
          roughness={0.18}
          transparent
          opacity={0.92}
        />
      </mesh>

      <mesh position={[0, 0, 0.036]}>
        <planeGeometry args={[1.02, 0.52]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0.14} />
      </mesh>

      <Text
        position={[0, 0.075, 0.08]}
        fontSize={0.125}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {skill.label}
      </Text>

      <Text
        position={[0, -0.105, 0.08]}
        fontSize={0.07}
        color="#c4b5fd"
        anchorX="center"
        anchorY="middle"
      >
        {skill.sub}
      </Text>
    </group>
  );
}

function HeroTitle() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = 2.05 + Math.sin(state.clock.elapsedTime * 1.15) * 0.04;
    group.current.lookAt(state.camera.position);
  });

  return (
    <group ref={group} position={[0, 2.05, 0.2]}>
      <Text
        fontSize={0.28}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        ENGINEERING INTELLIGENT SYSTEMS
      </Text>

      <Text
        position={[0, -0.34, 0]}
        fontSize={0.105}
        color="#a5b4fc"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        AI • SIGNAL PROCESSING • EMBEDDED SYSTEMS • INTERACTIVE SOFTWARE
      </Text>
    </group>
  );
}

function SceneRig() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.38,
      delta * 2.2
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.22,
      delta * 2.2
    );
  });

  return (
    <group ref={group}>
      <ParticleField />
      <DataStreams />
      <HologramGrid />

      <Float speed={2.1} rotationIntensity={0.28} floatIntensity={0.55}>
        <CoreSystem />
      </Float>

      {SKILLS.map((skill) => (
        <SkillNode key={skill.label} skill={skill} />
      ))}

      <HeroTitle />

      <Sparkles
        count={70}
        scale={[7, 4, 4]}
        size={1.8}
        speed={0.35}
        opacity={0.55}
        color="#c4b5fd"
      />
    </group>
  );
}

export default function WebGLScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#030014]">
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0.15, 7.2], fov: 43 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#030014"]} />

          <fog attach="fog" args={["#030014", 5.5, 12]} />

          <ambientLight intensity={0.85} />

          <pointLight
            position={[3.8, 4.2, 5.4]}
            intensity={8.5}
            color="#06b6d4"
          />

          <pointLight
            position={[-4.2, -1.5, 4.6]}
            intensity={7.5}
            color="#8b5cf6"
          />

          <pointLight
            position={[0, -4.2, 3.8]}
            intensity={5.2}
            color="#d946ef"
          />

          <spotLight
            position={[0, 5.5, 5]}
            angle={0.45}
            penumbra={0.7}
            intensity={3.2}
            color="#ffffff"
          />

          <Stars
            radius={60}
            depth={28}
            count={900}
            factor={2.6}
            saturation={0}
            fade
            speed={0.25}
          />

          <SceneRig />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.075}
            rotateSpeed={0.42}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.7}
          />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,0,20,0.08)_35%,rgba(3,0,20,0.72)_100%)]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030014] to-transparent" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}