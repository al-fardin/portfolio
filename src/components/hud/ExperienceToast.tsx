"use client";

import {
  useEffect,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  experienceMilestones,
} from "@/data/experience";

import {
  useGameStore,
} from "@/store/useGameStore";

export default function ExperienceToast() {
  const activeId =
    useGameStore(
      (state) =>
        state.activeExperienceMilestone
    );

  const clear =
    useGameStore(
      (state) =>
        state.clearExperienceMilestone
    );

  const milestone =
    experienceMilestones.find(
      (item) =>
        item.id === activeId
    );

  useEffect(() => {
    if (!activeId) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          clear();
        },
        2800
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    activeId,
    clear,
  ]);

  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          className="pointer-events-none fixed right-7 top-28 z-30 w-[310px] border border-white/10 bg-black/60 p-5 text-white shadow-2xl backdrop-blur-xl"
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: 40,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.32em]"
            style={{
              color:
                milestone.color,
            }}
          >
            MILESTONE DISCOVERED
          </p>

          <div className="mt-4 flex items-start gap-4">
            <p
              className="font-mono text-3xl font-light"
              style={{
                color:
                  milestone.color,
              }}
            >
              {
                milestone.year
              }
            </p>

            <div>
              <p className="text-sm font-semibold tracking-[0.12em]">
                {
                  milestone.title
                }
              </p>

              <p className="mt-1 text-xs text-white/45">
                {
                  milestone.subtitle
                }
              </p>
            </div>
          </div>

          <div
            className="mt-4 h-px w-full"
            style={{
              background:
                milestone.color,
              opacity:
                0.35,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}