"use client";

import { useEffect } from "react";
import { useIntroFlow } from "@/store/useIntroFlow";

export default function IntroTransition() {
  const stage = useIntroFlow((s) => s.stage);
  const setStage = useIntroFlow((s) => s.setStage);

  useEffect(() => {
    if (stage !== "transition") return;

    const t = setTimeout(() => {
      setStage("bike");
    }, 1600);

    return () => clearTimeout(t);
  }, [stage, setStage]);

  if (stage !== "transition") return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.82)",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            letterSpacing: "0.36em",
            opacity: 0.7,
          }}
        >
          PREPARING JOURNEY
        </p>

        <h2
          style={{
            margin: "16px 0 10px",
            fontSize: "clamp(28px, 4.5vw, 48px)",
            fontWeight: 800,
          }}
        >
          Let’s Begin the Ride
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "15px",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          Loading the next cinematic sequence...
        </p>
      </div>
    </div>
  );
}