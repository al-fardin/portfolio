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

export default function AchievementOverlay() {
  const sceneMode =
    useGameStore(
      (state) =>
        state.sceneMode
    );

  const continueFromAchievements =
    useGameStore(
      (state) =>
        state.continueFromAchievements
    );

  useEffect(() => {
    if (
      sceneMode !==
      "achievements"
    ) {
      return;
    }

    const handleKey = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
        "Enter"
      ) {
        continueFromAchievements();
      }
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, [
    sceneMode,
    continueFromAchievements,
  ]);

  return (
    <AnimatePresence>
      {sceneMode ===
        "achievements" && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 text-white"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          {/* Cinematic bars */}

          <motion.div
            className="absolute left-0 right-0 top-0 h-[6vh] bg-black"
            initial={{
              y: "-100%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "-100%",
            }}
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[6vh] bg-black"
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "100%",
            }}
          />

          <div className="absolute inset-0 flex items-center">

            <div className="ml-[6vw] w-[50vw] max-w-3xl">

              <motion.p
                className="font-mono text-[10px] tracking-[0.45em] text-amber-300"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                }}
              >
                05 / ACHIEVEMENTS
              </motion.p>

              <motion.h1
                className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.7,
                }}
              >
                MILESTONES
                <br />

                <span className="text-amber-300">
                  UNLOCKED.
                </span>
              </motion.h1>

              <div className="mt-9 grid gap-3">

                {achievementMilestones.map(
                  (
                    achievement,
                    index
                  ) => (
                    <motion.div
                      key={
                        achievement.id
                      }
                      className="border border-white/10 bg-black/30 p-4 backdrop-blur-xl"
                      initial={{
                        opacity: 0,
                        x: -25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          0.9 +
                          index *
                            0.15,
                      }}
                    >
                      <div className="flex items-start gap-5">

                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center border font-mono text-sm"
                          style={{
                            borderColor:
                              achievement.color,

                            color:
                              achievement.color,
                          }}
                        >
                          {
                            achievement.number
                          }
                        </div>

                        <div>
                          <p
                            className="text-sm font-semibold tracking-[0.12em]"
                            style={{
                              color:
                                achievement.color,
                            }}
                          >
                            {
                              achievement.title
                            }
                          </p>

                          <p className="mt-1 text-xs text-white/45">
                            {
                              achievement.subtitle
                            }
                          </p>

                          <p className="mt-3 max-w-xl text-xs leading-6 text-white/55">
                            {
                              achievement.description
                            }
                          </p>
                        </div>

                      </div>
                    </motion.div>
                  )
                )}

              </div>

              <motion.button
                type="button"
                onClick={
                  continueFromAchievements
                }
                className="pointer-events-auto mt-8 border border-amber-300/35 bg-black/40 px-6 py-3 text-xs tracking-[0.23em] backdrop-blur-xl transition hover:border-amber-300 hover:bg-amber-400/10"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.5,
                }}
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                CONTINUE JOURNEY

                <span className="ml-4 text-white/35">
                  ENTER ↵
                </span>
              </motion.button>

            </div>
          </div>

          <motion.div
            className="absolute bottom-[9vh] right-[5vw] text-right"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.3,
            }}
          >
            <p className="font-mono text-[9px] tracking-[0.35em] text-white/25">
              BRIDGE CROSSED
            </p>

            <p className="mt-2 text-sm tracking-[0.2em] text-amber-300">
              ACHIEVEMENT BRIDGE
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}