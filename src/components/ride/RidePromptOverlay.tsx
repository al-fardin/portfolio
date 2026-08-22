"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useIntroFlow,
} from "@/store/useIntroFlow";

export default function RidePromptOverlay() {
  const stage =
    useIntroFlow(
      (state) =>
        state.stage
    );

  const [
    started,
    setStarted,
  ] = useState(false);

  useEffect(() => {
    if (
      stage !== "bike"
    ) {
      setStarted(false);
      return;
    }

    const start = () => {
      setStarted(true);
    };

    const key = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
          "w" ||
        event.key ===
          "W" ||
        event.key ===
          "ArrowUp"
      ) {
        setStarted(true);
      }
    };

    window.addEventListener(
      "wheel",
      start,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "keydown",
      key
    );

    return () => {
      window.removeEventListener(
        "wheel",
        start
      );

      window.removeEventListener(
        "keydown",
        key
      );
    };
  }, [stage]);

  if (
    stage !== "bike" ||
    started
  ) {
    return null;
  }

  return (
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

        zIndex: 35,

        pointerEvents:
          "none",

        textAlign:
          "center",

        color:
          "white",
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
            0.62,
        }}
      >
        SCROLL TO RIDE
      </p>

      <div
        style={{
          marginTop:
            "10px",

          fontSize:
            "22px",

          animation:
            "rideArrow 1.5s ease-in-out infinite",
        }}
      >
        ↓
      </div>

      <style>
        {`
          @keyframes rideArrow {
            0%, 100% {
              transform: translateY(0);
              opacity: .4;
            }

            50% {
              transform: translateY(7px);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}