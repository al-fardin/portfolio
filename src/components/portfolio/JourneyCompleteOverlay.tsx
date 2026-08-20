"use client";

import {
  motion,
} from "motion/react";

import {
  RotateCcw,
} from "lucide-react";

import {
  useGameStore,
} from "@/store/useGameStore";

export default function JourneyCompleteOverlay() {
  const sceneMode =
    useGameStore(
      (state) =>
        state.sceneMode
    );

  if (
    sceneMode !==
    "complete"
  ) {
    return null;
  }

  const exploreAgain = () => {
    window.location.reload();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#030509] text-white"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1.2,
      }}
    >
      {/* Background glow */}

      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="absolute left-[35%] top-[55%] h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[130px]" />

      {/* Main */}

      <div className="relative z-10 px-6 text-center">

        <motion.p
          className="font-mono text-[10px] tracking-[0.5em] text-cyan-300"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
        >
          JOURNEY COMPLETE
        </motion.p>

        <motion.div
          className="mx-auto mt-8 flex h-32 w-32 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/5"
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.7,
            duration: 0.8,
          }}
        >
          <div>
            <p className="font-mono text-4xl font-light">
              100
            </p>

            <p className="mt-1 font-mono text-[9px] tracking-[0.25em] text-white/35">
              PERCENT
            </p>
          </div>
        </motion.div>

        <motion.h1
          className="mt-9 text-4xl font-semibold tracking-[-0.04em] md:text-6xl"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.95,
          }}
        >
          THANKS FOR
          <br />

          <span className="text-cyan-300">
            TAKING THE RIDE.
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/45"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.2,
          }}
        >
          You&apos;ve reached the end
          of the main journey — but
          there is always another road
          ahead.
        </motion.p>

        <motion.button
          type="button"
          onClick={exploreAgain}
          className="mt-9 inline-flex items-center gap-3 border border-white/15 bg-white/5 px-6 py-3 text-xs tracking-[0.22em] transition hover:border-cyan-300/60 hover:bg-cyan-400/10"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.4,
          }}
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          <RotateCcw
            size={15}
          />

          EXPLORE AGAIN
        </motion.button>

        <motion.p
          className="mt-8 font-mono text-[8px] tracking-[0.35em] text-white/20"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.7,
          }}
        >
          NEXUS RIDE / PORTFOLIO
        </motion.p>

      </div>
    </motion.div>
  );
}