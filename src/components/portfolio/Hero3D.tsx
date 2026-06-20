import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const count = reduced ? 800 : 2200;

  const positions = (() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  })();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const speed = reduced ? 0.02 : 0.08;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * speed * 0.4;
    if (!reduced) {
      ref.current.rotation.y += (mouse.current.x * 0.3 - ref.current.rotation.y * 0.02) * delta;
      ref.current.rotation.x += (mouse.current.y * 0.2 - ref.current.rotation.x * 0.02) * delta;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#E8B257"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

function Wireframe({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const s = reduced ? 0.05 : 0.15;
    ref.current.rotation.x += delta * s;
    ref.current.rotation.y += delta * s * 0.7;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#E8B257" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 640px)");
    const update = () => setReduced(mq.matches || small.matches);
    update();
    mq.addEventListener("change", update);
    small.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      small.removeEventListener("change", update);
    };
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <ParticleField reduced={reduced} />
      {!reduced && <Wireframe reduced={reduced} />}
    </Canvas>
  );
}