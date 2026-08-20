"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

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
        background: "#050812",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [
            0,
            4.5,
            10,
          ],
          fov: 55,
          near: 0.1,
          far: 1200,
        }}
        gl={{
          antialias: true,
          powerPreference:
            "high-performance",
        }}
        onCreated={({
          gl,
          scene,
        }) => {
          gl.toneMapping =
            THREE.ACESFilmicToneMapping;

          gl.toneMappingExposure =
            1.05;

          gl.outputColorSpace =
            THREE.SRGBColorSpace;

          scene.background =
            new THREE.Color(
              "#050812"
            );
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