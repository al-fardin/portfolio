"use client";

import {
  useEffect,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  achievementMilestones,
} from "@/data/achievements";

import {
  useGameStore,
} from "@/store/useGameStore";

export default function AchievementToast() {
  const activeId =
    useGameStore(
      (state) =>
        state.activeAchievementMilestone
    );

  const clear =
    useGameStore(
      (state) =>
        state.clearAchievementMilestone
    );

  const achievement =
    achievementMilestones.find(
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
        3000
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
      {achievement && (
        <motion.div
          className="pointer-events-none fixed left-1/2 top-28 z-30 w-[360px] -translate-x-1/2 border border-white/10 bg-black/65 px-6 py-5 text-white shadow-2xl backdrop-blur-xl"
          initial={{
            opacity: 0,
            y: -30,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.96,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <div className="flex items-center justify-between">

            <p
              className="font-mono text-[9px] tracking-[0.3em]"
              style={{
                color:
                  achievement.color,
              }}
            >
              ACHIEVEMENT CORE
            </p>

            <p className="font-mono text-[9px] text-white/30">
              {
                achievement.number
              } / 03
            </p>

          </div>

          <div className="mt-4 flex items-center gap-4">

            <div
              className="flex h-12 w-12 items-center justify-center border font-mono text-lg"
              style={{
                borderColor:
                  achievement.color,

                color:
                  achievement.color,

                boxShadow: `0 0 24px ${achievement.color}35`,
              }}
            >
              ◆
            </div>

            <div>
              <p className="text-base font-semibold tracking-[0.12em]">
                {
                  achievement.title
                }
              </p>

              <p className="mt-1 text-xs text-white/45">
                {
                  achievement.subtitle
                }
              </p>
            </div>

          </div>

          <div
            className="mt-4 h-px"
            style={{
              background:
                achievement.color,

              opacity:
                0.3,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}