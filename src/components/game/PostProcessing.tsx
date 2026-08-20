"use client";

import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

import {
  BlendFunction,
} from "postprocessing";

export default function PostProcessing() {
  return (
    <EffectComposer
      multisampling={4}
    >
      {/* ======================= */}
      {/* NEON / EMISSIVE BLOOM */}
      {/* ======================= */}

      <Bloom
        intensity={0.75}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.75}
        mipmapBlur
      />

      {/* ======================= */}
      {/* CINEMATIC VIGNETTE */}
      {/* ======================= */}

      <Vignette
        eskil={false}
        offset={0.18}
        darkness={0.72}
      />

      {/* ======================= */}
      {/* SUBTLE FILM GRAIN */}
      {/* ======================= */}

      <Noise
        opacity={0.018}
        premultiply
        blendFunction={
          BlendFunction.SOFT_LIGHT
        }
      />
    </EffectComposer>
  );
}