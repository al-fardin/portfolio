"use client";

import {
  Canvas,
} from "@react-three/fiber";

import * as THREE from "three";

import PostProcessing from "@/components/game/PostProcessing";

import World from "@/components/world/World";

export default function GameCanvas() {
  return (
    <div
      className="game-container"
      style={{
        position:
          "absolute",

        inset: 0,

        width:
          "100%",

        height:
          "100%",

        overflow:
          "hidden",

        background:
          "#030509",
      }}
    >
      <Canvas
        shadows
        dpr={[
          1,
          1.5,
        ]}
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

          alpha: false,
        }}
        onCreated={({
          gl,
        }) => {
          /*
            =====================
            CINEMATIC COLOR
            =====================
          */

          gl.toneMapping =
            THREE.ACESFilmicToneMapping;

          gl.toneMappingExposure =
            1.05;

          gl.outputColorSpace =
            THREE.SRGBColorSpace;

          /*
            Better shadows / lights
          */

          gl.shadowMap.enabled =
            true;

          gl.shadowMap.type =
            THREE.PCFSoftShadowMap;
        }}
        style={{
          position:
            "absolute",

          inset: 0,

          width:
            "100%",

          height:
            "100%",

          display:
            "block",
        }}
      >
        {/* ==================== */}
        {/* 3D WORLD */}
        {/* ==================== */}

        <World />

        {/* ==================== */}
        {/* CINEMATIC EFFECTS */}
        {/* ==================== */}

        <PostProcessing />
      </Canvas>
    </div>
  );
}