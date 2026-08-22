"use client";

import {
  useEffect,
} from "react";

import {
  useIntroFlow,
} from "@/store/useIntroFlow";

export default function CafeStartOverlay() {
  const stage =
    useIntroFlow(
      (state) =>
        state.stage
    );

  const assetsReady =
    useIntroFlow(
      (state) =>
        state.assetsReady
    );

  const setStage =
    useIntroFlow(
      (state) =>
        state.setStage
    );

  useEffect(() => {
    /*
      Loading complete না হলে
      scroll/W listener-ই attach হবে না।
    */

    if (
      stage !== "cafe" ||
      !assetsReady
    ) {
      return;
    }

    const handleWheel = (
      event: WheelEvent
    ) => {
      if (
        event.deltaY >
        0
      ) {
        setStage(
          "walk"
        );
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "w" ||
        event.key === "W" ||
        event.key ===
          "ArrowUp"
      ) {
        setStage(
          "walk"
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
  ]);

  if (
    stage !== "cafe" ||
    !assetsReady
  ) {
    return null;
  }

  return (
    <>
      {/* =====================================
          TOP LEFT
      ===================================== */}

      <div
        style={{
          position:
            "absolute",

          top:
            "6vh",

          left:
            "5vw",

          zIndex: 20,

          color:
            "white",

          pointerEvents:
            "none",

          animation:
            "cafeReveal 900ms cubic-bezier(.22,.61,.36,1) both",
        }}
      >
        <p
          style={{
            margin: 0,

            fontSize:
              "10px",

            letterSpacing:
              "0.4em",

            opacity:
              0.5,
          }}
        >
          00 / ARRIVAL
        </p>

        <h2
          style={{
            margin:
              "10px 0 0",

            fontSize:
              "20px",

            fontWeight:
              500,

            letterSpacing:
              "0.15em",
          }}
        >
          CAFÉ START
        </h2>
      </div>

      {/* =====================================
          BOTTOM
      ===================================== */}

      <div
        style={{
          position:
            "absolute",

          bottom:
            "6vh",

          left:
            "50%",

          transform:
            "translateX(-50%)",

          zIndex: 20,

          textAlign:
            "center",

          color:
            "white",

          pointerEvents:
            "none",

          animation:
            "cafeBottomReveal 1.1s 250ms cubic-bezier(.22,.61,.36,1) both",
        }}
      >
        <p
          style={{
            margin: 0,

            fontSize:
              "9px",

            letterSpacing:
              "0.42em",

            opacity:
              0.55,
          }}
        >
          BEGIN THE JOURNEY
        </p>

        <div
          style={{
            marginTop:
              "12px",

            fontSize:
              "22px",

            opacity:
              0.85,

            animation:
              "introArrow 1.5s ease-in-out infinite",
          }}
        >
          ↓
        </div>

        <p
          style={{
            margin:
              "8px 0 0",

            fontSize:
              "10px",

            letterSpacing:
              "0.2em",

            opacity:
              0.45,
          }}
        >
          SCROLL OR PRESS W
        </p>
      </div>

      <style>
        {`
          @keyframes cafeReveal {
            from {
              opacity: 0;
              transform: translateY(-16px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes cafeBottomReveal {
            from {
              opacity: 0;
              transform:
                translateX(-50%)
                translateY(16px);
            }

            to {
              opacity: 1;
              transform:
                translateX(-50%)
                translateY(0);
            }
          }

          @keyframes introArrow {
            0%, 100% {
              transform:
                translateY(0);

              opacity: .45;
            }

            50% {
              transform:
                translateY(7px);

              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}