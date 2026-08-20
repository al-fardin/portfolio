"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import World from "@/components/world/World";

export default function GameCanvas() {
  return (
    <Canvas
      shadows
      camera={{
        position: [6, 5, 8],
        fov: 50,
      }}
    >
      <World />
      <OrbitControls />
    </Canvas>
  );
}