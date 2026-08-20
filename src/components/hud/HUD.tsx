"use client";

import {
  motion,
} from "motion/react";

import {
  useGameStore,
} from "@/store/useGameStore";

export default function HUD() {
  const sceneMode =
    useGameStore(
      (state) =>
        state.sceneMode
    );

  const progress =
    useGameStore(
      (state) =>
        state.journeyProgress
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
    sceneMode !== "ride"
  ) {
    return null;
  }

  let section = "01";
  let destination =
    "ABOUT";

  if (
    aboutCompleted &&
    !skillsCompleted
  ) {
    section = "02";
    destination =
      "SKILLS";
  }

  if (
    skillsCompleted &&
    !projectsCompleted
  ) {
    section = "03";
    destination =
      "PROJECTS";
  }

  if (
    projectsCompleted &&
    !experienceCompleted
  ) {
    section = "04";
    destination =
      "EXPERIENCE";
  }

  if (
    experienceCompleted &&
    !achievementsCompleted
  ) {
    section = "05";
    destination =
      "ACHIEVEMENTS";
  }

  if (
    achievementsCompleted
  ) {
    section = "06";
    destination =
      "CONTACT";
  }

  const night =
    progress >= 73;

  const mainColor =
    night
      ? "text-[#f1ece4]"
      : "text-[#28323a]";

  const mutedColor =
    night
      ? "text-[#f1ece4]/45"
      : "text-[#28323a]/45";

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-20 select-none ${mainColor}`}
    >
      {/* BRAND */}

      <motion.div
        className="absolute left-8 top-7"
        initial={{
          opacity: 0,
          x: -10,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
      >
        <p className="text-xs font-semibold tracking-[0.25em]">
          NEXUS
        </p>

        <p
          className={`mt-1 font-mono text-[7px] tracking-[0.32em] ${mutedColor}`}
        >
          DIGITAL JOURNEY
        </p>
      </motion.div>

      {/* CHAPTER */}

      <motion.div
        className="absolute right-8 top-7 text-right"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        <p
          className={`font-mono text-[8px] tracking-[0.3em] ${mutedColor}`}
        >
          {section} / 06
        </p>

        <p className="mt-2 text-[10px] font-medium tracking-[0.2em]">
          {destination}
        </p>
      </motion.div>

      {/* SCROLL */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p
          className={`font-mono text-[7px] tracking-[0.4em] ${mutedColor}`}
        >
          SCROLL TO EXPLORE
        </p>

        <motion.div
          className="mt-3 text-lg"
          animate={{
            y: [
              0,
              6,
              0,
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          ↓
        </motion.div>
      </div>

      {/* PROGRESS */}

      <div
        className={`absolute bottom-0 left-0 h-[2px] w-full ${
          night
            ? "bg-white/10"
            : "bg-black/10"
        }`}
      >
        <motion.div
          className={
            night
              ? "h-full bg-[#e5b780]"
              : "h-full bg-[#e1775f]"
          }
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.4,
          }}
        />
      </div>
    </div>
  );
}