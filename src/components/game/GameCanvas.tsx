"use client";

import {
  Suspense,
  useEffect,
} from "react";

import {
  Canvas,
} from "@react-three/fiber";

import * as THREE from "three";

import IntroWorld from "@/components/intro/IntroWorld";
import CafeStartOverlay from "@/components/intro/CafeStartOverlay";
import MosqueIntroOverlay from "@/components/intro/MosqueIntroOverlay";
import IntroTransition from "@/components/intro/IntroTransition";
import LoadingScreen from "@/components/intro/LoadingScreen";

import BikeJourneyWorld from "@/components/ride/BikeJourneyWorld";
import RidePromptOverlay from "@/components/ride/RidePromptOverlay";

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

  const assetsReady =
    useIntroFlow(
      (state) =>
        state.assetsReady
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
     CAFÉ → MOSQUE INPUT
  ========================================= */

  useEffect(() => {
    /*
      World fully loaded না হলে
      কোনো journey input নেই।
    */

    if (
      stage !== "walk" ||
      !assetsReady
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
        event.key !== "w" &&
        event.key !== "W" &&
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
    assetsReady,
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
          "#050608",
      }}
    >
      {/* =====================================
          3D WORLD LOADS BEHIND LOADER
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

          near: 0.1,

          far: 1200,
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
      >
        <Suspense
          fallback={null}
        >
          {stage ===
          "bike" ? (
            <BikeJourneyWorld />
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
          LOADING SCREEN

          Always above everything until
          all tracked 3D assets are ready.
      ===================================== */}

      <LoadingScreen />

      {/* =====================================
          UI
      ===================================== */}

      <CafeStartOverlay />

      <MosqueIntroOverlay />

      <IntroTransition />

      <RidePromptOverlay />

      {/* =====================================
          WALK PROGRESS

          loading complete না হলে hide।
      ===================================== */}

      {stage === "walk" &&
        assetsReady && (
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