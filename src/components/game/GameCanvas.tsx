"use client";

import { Canvas } from "@react-three/fiber";
import World from "@/components/world/World";

export default function GameCanvas() {
  return (
    <div
      className="game-container"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#10151c",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 4.5, 10],
          fov: 55,
          near: 0.1,
          far: 1000,
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <World />
      </Canvas>
    </div>
  );
}