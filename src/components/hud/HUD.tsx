"use client";

import { useGameStore } from "@/store/useGameStore";

function formatDistance(
  distance: number
) {
  if (distance >= 1000) {
    return `${(
      distance / 1000
    ).toFixed(1)} KM`;
  }

  return `${distance} M`;
}

export default function HUD() {
  const speed = useGameStore(
    (state) => state.speed
  );

  const distance = useGameStore(
    (state) => state.distance
  );

  const progress = useGameStore(
    (state) =>
      state.journeyProgress
  );

  const sceneMode = useGameStore(
    (state) =>
      state.sceneMode
  );

  const aboutCompleted =
    useGameStore(
      (state) =>
        state.aboutCompleted
    );

  const skillsCompleted =
    useGameStore(
      (state) =>
        state.skillsCompleted
    );

  if (
    sceneMode !== "ride"
  ) {
    return null;
  }

  let destination =
    "ABOUT VIEWPOINT";

  let objective =
    "Reach About Viewpoint";

  let journeyNumber =
    "01";

  if (
    aboutCompleted &&
    !skillsCompleted
  ) {
    destination =
      "SKILLS GARAGE";

    objective =
      "Reach Skills Garage";

    journeyNumber =
      "02";
  }

  if (
    skillsCompleted
  ) {
    destination =
      "PROJECT CITY";

    objective =
      "Continue toward Project City";

    journeyNumber =
      "03";
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-20 select-none text-white">

      {/* Brand */}
      <div className="absolute left-7 top-7">

        <p className="text-[10px] tracking-[0.45em] text-white/40">
          NEXUS RIDE
        </p>

        <p className="mt-1 text-sm font-medium tracking-wider">
          JOURNEY / {journeyNumber}
        </p>

      </div>

      {/* Navigation */}
      <div className="absolute left-1/2 top-7 -translate-x-1/2 text-center">

        <div className="text-3xl leading-none text-violet-400">
          ↑
        </div>

        <p className="mt-2 text-xs font-semibold tracking-[0.25em]">
          {destination}
        </p>

        <p className="mt-1 font-mono text-xs text-white/55">
          {formatDistance(
            distance
          )}
        </p>

      </div>

      {/* Progress */}
      <div className="absolute right-7 top-7 text-right">

        <p className="text-[10px] tracking-[0.3em] text-white/40">
          JOURNEY
        </p>

        <p className="mt-1 text-2xl font-light">
          {progress
            .toString()
            .padStart(
              2,
              "0"
            )}
          %
        </p>

      </div>

      {/* Objective */}
      <div className="absolute bottom-7 left-7">

        <p className="text-[9px] tracking-[0.35em] text-white/35">
          OBJECTIVE
        </p>

        <p className="mt-2 text-sm">
          {objective}
        </p>

      </div>

      {/* Controls */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">

        <p className="font-mono text-[10px] tracking-[0.18em] text-white/30">
          W ACCELERATE
          &nbsp;&nbsp;•&nbsp;&nbsp;
          A D STEER
          &nbsp;&nbsp;•&nbsp;&nbsp;
          S BRAKE
        </p>

      </div>

      {/* Speed */}
      <div className="absolute bottom-7 right-7 text-right">

        <p className="font-mono text-5xl font-light leading-none">
          {speed
            .toString()
            .padStart(
              3,
              "0"
            )}
        </p>

        <p className="mt-1 text-[10px] tracking-[0.35em] text-white/40">
          KM/H
        </p>

        <p className="mt-2 font-mono text-[9px] text-violet-300/70">
          AUTO
        </p>

      </div>

    </div>
  );
}