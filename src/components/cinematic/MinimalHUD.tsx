"use client";

import {
  motion,
} from "motion/react";

import {
  useJourneyStore,
} from "@/store/useJourneyStore";

export default function MinimalHUD() {
  const started =
    useJourneyStore(
      (state) =>
        state.started
    );

  const progress =
    useJourneyStore(
      (state) =>
        state.progress
    );

  if (!started) {
    return null;
  }

  const reachedEnd =
    progress >= 0.215;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 select-none text-[#20272a]">
      {/* BRAND */}

      <motion.div
        className="absolute left-8 top-7"
        initial={{
          opacity: 0,
          x: -8,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
      >
        <p className="text-[10px] font-semibold tracking-[0.32em]">
          NEXUS
        </p>

        <p className="mt-1 font-mono text-[7px] tracking-[0.3em] opacity-30">
          DIGITAL JOURNEY
        </p>
      </motion.div>

      {/* RIGHT */}

      <motion.div
        className="absolute right-8 top-7 text-right"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        <p className="font-mono text-[7px] tracking-[0.3em] opacity-35">
          01 / CITY
        </p>

        <p className="mt-2 text-[9px] font-medium tracking-[0.22em]">
          ARRIVAL
        </p>
      </motion.div>

      {/* SCROLL */}

      {!reachedEnd && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <p className="font-mono text-[7px] tracking-[0.38em] opacity-35">
            SCROLL TO EXPLORE
          </p>

          <motion.div
            className="mt-3"
            animate={{
              y: [
                0,
                5,
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
        </motion.div>
      )}

      {/* PREVIEW END */}

      {reachedEnd && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <p className="font-mono text-[7px] tracking-[0.36em] opacity-40">
            CITY ARRIVAL
          </p>

          <p className="mt-2 text-[9px] tracking-[0.18em] opacity-70">
            NEXT — ABOUT
          </p>
        </motion.div>
      )}

      {/* PROGRESS */}

      <div className="absolute bottom-0 left-0 h-px w-full bg-black/10">
        <motion.div
          className="h-full bg-[#7d6452]"
          animate={{
            width: `${Math.min(
              100,
              (
                progress /
                0.22
              ) *
                100
            )}%`,
          }}
        />
      </div>
    </div>
  );
}