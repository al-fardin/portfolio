"use client";

import {
  motion,
} from "motion/react";

import {
  useGameStore,
} from "@/store/useGameStore";

function formatDistance(
  distance: number
) {
  if (
    distance >= 1000
  ) {
    return `${(
      distance / 1000
    ).toFixed(1)} KM`;
  }

  return `${distance} M`;
}

type SpeedLine = {
  top: string;
  left: string;
  angle: number;
  x: number;
  y: number;
};

const speedLines: SpeedLine[] = [
  {
    top: "15%",
    left: "6%",
    angle: -8,
    x: -70,
    y: -8,
  },

  {
    top: "25%",
    left: "10%",
    angle: -5,
    x: -85,
    y: -5,
  },

  {
    top: "39%",
    left: "4%",
    angle: -3,
    x: -65,
    y: 0,
  },

  {
    top: "57%",
    left: "8%",
    angle: 4,
    x: -80,
    y: 5,
  },

  {
    top: "72%",
    left: "5%",
    angle: 8,
    x: -70,
    y: 10,
  },

  {
    top: "19%",
    left: "88%",
    angle: 8,
    x: 75,
    y: -8,
  },

  {
    top: "31%",
    left: "91%",
    angle: 4,
    x: 90,
    y: -4,
  },

  {
    top: "46%",
    left: "86%",
    angle: 2,
    x: 65,
    y: 0,
  },

  {
    top: "61%",
    left: "90%",
    angle: -4,
    x: 85,
    y: 5,
  },

  {
    top: "77%",
    left: "87%",
    angle: -8,
    x: 75,
    y: 10,
  },

  {
    top: "10%",
    left: "20%",
    angle: -4,
    x: -45,
    y: -6,
  },

  {
    top: "82%",
    left: "76%",
    angle: -5,
    x: 48,
    y: 8,
  },
];

function SpeedEffects({
  speed,
}: {
  speed: number;
}) {
  const strength =
    Math.max(
      0,
      Math.min(
        1,
        (
          speed -
          30
        ) /
          74
      )
    );

  if (
    strength <= 0.02
  ) {
    return null;
  }

  const duration =
    0.62 -
    strength *
      0.34;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* EDGE VIGNETTE */}

      <div
        className="absolute inset-0"
        style={{
          opacity:
            strength *
            0.36,

          background:
            "radial-gradient(circle at center, transparent 38%, rgba(6,10,18,0.05) 55%, rgba(6,10,18,0.65) 100%)",
        }}
      />

      {/* SPEED STREAKS */}

      {speedLines.map(
        (
          line,
          index
        ) => (
          <motion.div
            key={index}
            className="absolute h-px"
            style={{
              top:
                line.top,

              left:
                line.left,

              width: `${
                35 +
                strength *
                  85
              }px`,

              opacity:
                strength *
                0.55,

              transform: `rotate(${line.angle}deg)`,

              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",

              filter:
                "blur(0.2px)",
            }}
            animate={{
              x: [
                0,
                line.x *
                  strength,
              ],

              y: [
                0,
                line.y *
                  strength,
              ],

              opacity: [
                0,
                strength *
                  0.55,
                0,
              ],
            }}
            transition={{
              duration,

              repeat:
                Infinity,

              ease:
                "linear",

              delay:
                index *
                0.035,
            }}
          />
        )
      )}
    </div>
  );
}

export default function HUD() {
  const speed =
    useGameStore(
      (state) =>
        state.speed
    );

  const distance =
    useGameStore(
      (state) =>
        state.distance
    );

  const progress =
    useGameStore(
      (state) =>
        state.journeyProgress
    );

  const sceneMode =
    useGameStore(
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

  const projectsCompleted =
    useGameStore(
      (state) =>
        state.projectsCompleted
    );

  const experienceCompleted =
    useGameStore(
      (state) =>
        state.experienceCompleted
    );

  const achievementsCompleted =
    useGameStore(
      (state) =>
        state.achievementsCompleted
    );

  if (
    sceneMode !==
    "ride"
  ) {
    return null;
  }

  let destination =
    "ABOUT VIEWPOINT";

  let objective =
    "Reach About Viewpoint";

  let number =
    "01";

  let navColor =
    "text-violet-400";

  if (
    aboutCompleted &&
    !skillsCompleted
  ) {
    destination =
      "SKILLS GARAGE";

    objective =
      "Reach Skills Garage";

    number =
      "02";

    navColor =
      "text-cyan-300";
  }

  if (
    skillsCompleted &&
    !projectsCompleted
  ) {
    destination =
      "PROJECT CITY";

    objective =
      "Enter Project City";

    number =
      "03";

    navColor =
      "text-violet-400";
  }

  if (
    projectsCompleted &&
    !experienceCompleted
  ) {
    destination =
      "EXPERIENCE HIGHWAY";

    objective =
      "Follow Experience Highway";

    number =
      "04";

    navColor =
      "text-orange-300";
  }

  if (
    experienceCompleted &&
    !achievementsCompleted
  ) {
    destination =
      "ACHIEVEMENT BRIDGE";

    objective =
      "Cross Achievement Bridge";

    number =
      "05";

    navColor =
      "text-amber-300";
  }

  if (
    achievementsCompleted
  ) {
    destination =
      "CONTACT TOWER";

    objective =
      "Reach the final destination";

    number =
      "06";

    navColor =
      "text-cyan-300";
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-20 select-none text-white">
      {/* ====================== */}
      {/* SPEED FX */}
      {/* ====================== */}

      <SpeedEffects
        speed={speed}
      />

      {/* ====================== */}
      {/* BRAND */}
      {/* ====================== */}

      <div className="absolute left-7 top-7">
        <p className="text-[10px] tracking-[0.45em] text-white/40">
          NEXUS RIDE
        </p>

        <p className="mt-1 text-sm font-medium tracking-wider">
          JOURNEY /{" "}
          {number}
        </p>
      </div>

      {/* ====================== */}
      {/* NAVIGATION */}
      {/* ====================== */}

      <div className="absolute left-1/2 top-7 -translate-x-1/2 text-center">
        <motion.div
          className={`text-3xl leading-none ${navColor}`}
          animate={{
            y:
              speed > 50
                ? [
                    0,
                    -3,
                    0,
                  ]
                : 0,
          }}
          transition={{
            duration:
              0.7,

            repeat:
              speed >
              50
                ? Infinity
                : 0,
          }}
        >
          ↑
        </motion.div>

        <p className="mt-2 text-xs font-semibold tracking-[0.25em]">
          {
            destination
          }
        </p>

        <p className="mt-1 font-mono text-xs text-white/55">
          {formatDistance(
            distance
          )}
        </p>
      </div>

      {/* ====================== */}
      {/* JOURNEY PROGRESS */}
      {/* ====================== */}

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

      {/* ====================== */}
      {/* OBJECTIVE */}
      {/* ====================== */}

      <div className="absolute bottom-7 left-7">
        <p className="text-[9px] tracking-[0.35em] text-white/35">
          OBJECTIVE
        </p>

        <p className="mt-2 text-sm">
          {
            objective
          }
        </p>
      </div>

      {/* ====================== */}
      {/* CONTROLS */}
      {/* ====================== */}

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <p className="font-mono text-[10px] tracking-[0.18em] text-white/30">
          W ACCELERATE
          &nbsp;&nbsp;•&nbsp;&nbsp;
          A D STEER
          &nbsp;&nbsp;•&nbsp;&nbsp;
          S BRAKE
        </p>
      </div>

      {/* ====================== */}
      {/* SPEEDOMETER */}
      {/* ====================== */}

      <div className="absolute bottom-7 right-7 text-right">
        <motion.p
          className="font-mono text-5xl font-light leading-none"
          animate={{
            scale:
              speed >
              80
                ? 1.04
                : 1,
          }}
          transition={{
            duration:
              0.2,
          }}
        >
          {speed
            .toString()
            .padStart(
              3,
              "0"
            )}
        </motion.p>

        <p className="mt-1 text-[10px] tracking-[0.35em] text-white/40">
          KM/H
        </p>

        <p
          className={`mt-2 font-mono text-[9px] ${
            speed >
            80
              ? "text-cyan-200"
              : "text-cyan-300/70"
          }`}
        >
          {speed >
          85
            ? "HIGH SPEED"
            : speed >
                45
              ? "CRUISE"
              : "AUTO"}
        </p>
      </div>
    </div>
  );
}