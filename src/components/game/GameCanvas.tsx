"use client";

import {
  Suspense,
  useEffect,
} from "react";

import {
  Canvas,
} from "@react-three/fiber";

import * as THREE from "three";

import CinematicWorld from "@/components/cinematic/CinematicWorld";

import IntroWorld from "@/components/intro/IntroWorld";

import CafeStartOverlay from "@/components/intro/CafeStartOverlay";

import MosqueIntroOverlay from "@/components/intro/MosqueIntroOverlay";

import IntroTransition from "@/components/intro/IntroTransition";

import {
  useIntroFlow,
} from "@/store/useIntroFlow";

export default function GameCanvas() {
  const stage =
    useIntroFlow(
      (state) =>
        state.stage
    );

  const walkProgress =
    useIntroFlow(
      (state) =>
        state.walkProgress
    );

  const setWalkProgress =
    useIntroFlow(
      (state) =>
        state.setWalkProgress
    );

  const setStage =
    useIntroFlow(
      (state) =>
        state.setStage
    );

  /* =========================================
     TEMP WALK CONTROL

     পরে actual character/camera movement
     IntroWorld-এর ভিতরে করব।
  ========================================= */

  useEffect(() => {
    if (
      stage !== "walk"
    ) {
      return;
    }

    const handleWheel = (
      event: WheelEvent
    ) => {
      const current =
        useIntroFlow
          .getState()
          .walkProgress;

      const amount =
        event.deltaY > 0
          ? 1.5
          : -1;

      const next =
        THREE.MathUtils.clamp(
          current +
            amount,
          0,
          100
        );

      setWalkProgress(
        next
      );

      if (
        next >= 100
      ) {
        setStage(
          "mosque"
        );
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key !==
          "w" &&
        event.key !==
          "W" &&
        event.key !==
          "ArrowUp"
      ) {
        return;
      }

      const current =
        useIntroFlow
          .getState()
          .walkProgress;

      const next =
        THREE.MathUtils.clamp(
          current + 3,
          0,
          100
        );

      setWalkProgress(
        next
      );

      if (
        next >= 100
      ) {
        setStage(
          "mosque"
        );
      }
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    stage,
    setStage,
    setWalkProgress,
  ]);

  return (
    <div
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
          "#111820",
      }}
    >
      {/* =====================================
          ONLY ONE R3F CANVAS
      ===================================== */}

      <Canvas
        shadows
        dpr={[
          1,
          1.5,
        ]}
        camera={{
          position: [
            0,
            3.5,
            12,
          ],

          fov: 48,

          near:
            0.1,

          far:
            1200,
        }}
        gl={{
          antialias:
            true,

          alpha:
            false,

          powerPreference:
            "high-performance",
        }}
        onCreated={({
          gl,
        }) => {
          gl.toneMapping =
            THREE.ACESFilmicToneMapping;

          gl.toneMappingExposure =
            1;

          gl.outputColorSpace =
            THREE.SRGBColorSpace;

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
        }}
      >
        <Suspense
          fallback={null}
        >
          {stage ===
          "bike" ? (
            <CinematicWorld />
          ) : (
            <IntroWorld
              stage={
                stage
              }
              walkProgress={
                walkProgress
              }
            />
          )}
        </Suspense>
      </Canvas>

      {/* =====================================
          HTML UI MUST STAY OUTSIDE CANVAS
      ===================================== */}

      <CafeStartOverlay />

      <MosqueIntroOverlay />

      <IntroTransition />

      {/* =====================================
          WALK INDICATOR
      ===================================== */}

      {stage ===
        "walk" && (
        <div
          style={{
            position:
              "absolute",

            left:
              "50%",

            bottom:
              "6vh",

            transform:
              "translateX(-50%)",

            zIndex: 20,

            width:
              "min(360px, 72vw)",

            pointerEvents:
              "none",
          }}
        >
          <div
            style={{
              height:
                "3px",

              background:
                "rgba(255,255,255,0.16)",

              overflow:
                "hidden",
            }}
          >
            <div
              style={{
                width:
                  `${walkProgress}%`,

                height:
                  "100%",

                background:
                  "rgba(255,255,255,0.9)",

                transition:
                  "width 120ms linear",
              }}
            />
          </div>

          <p
            style={{
              margin:
                "12px 0 0",

              textAlign:
                "center",

              color:
                "rgba(255,255,255,0.72)",

              fontSize:
                "10px",

              letterSpacing:
                "0.28em",
            }}
          >
            MOVE TOWARD
            THE MOSQUE
          </p>
        </div>
      )}
    </div>
  );
}