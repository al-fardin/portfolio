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

export default function ExperienceOverlay() {
  const sceneMode =
    useGameStore(
      (state) =>
        state.sceneMode
    );

  const continueFromExperience =
    useGameStore(
      (state) =>
        state.continueFromExperience
    );

  useEffect(() => {
    if (
      sceneMode !==
      "experience"
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
        continueFromExperience();
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
    continueFromExperience,
  ]);

  return (
    <AnimatePresence>
      {sceneMode ===
        "experience" && (
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

            <div className="ml-[6vw] w-[48vw] max-w-3xl">

              <motion.p
                className="font-mono text-[10px] tracking-[0.45em] text-orange-300"
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
                04 / EXPERIENCE
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
                THE ROAD
                <br />

                <span className="text-orange-300">
                  SO FAR.
                </span>
              </motion.h1>

              {/* Timeline */}

              <div className="mt-10">

                {experienceMilestones.map(
                  (
                    milestone,
                    index
                  ) => (
                    <motion.div
                      key={
                        milestone.id
                      }
                      className="relative flex gap-6 border-l border-white/15 pb-8 pl-7 last:pb-0"
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          0.9 +
                          index *
                            0.18,
                      }}
                    >
                      <div
                        className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full"
                        style={{
                          background:
                            milestone.color,

                          boxShadow: `0 0 18px ${milestone.color}`,
                        }}
                      />

                      <div className="w-16 shrink-0">
                        <p
                          className="font-mono text-lg"
                          style={{
                            color:
                              milestone.color,
                          }}
                        >
                          {
                            milestone.year
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold tracking-[0.12em]">
                          {
                            milestone.title
                          }
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          {
                            milestone.subtitle
                          }
                        </p>

                        <p className="mt-3 max-w-lg text-xs leading-6 text-white/55">
                          {
                            milestone.description
                          }
                        </p>
                      </div>
                    </motion.div>
                  )
                )}

              </div>

              <motion.button
                type="button"
                onClick={
                  continueFromExperience
                }
                className="pointer-events-auto mt-9 border border-orange-300/30 bg-black/40 px-6 py-3 text-xs tracking-[0.23em] backdrop-blur-xl transition hover:border-orange-300 hover:bg-orange-400/10"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.55,
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
              HIGHWAY COMPLETED
            </p>

            <p className="mt-2 text-sm tracking-[0.2em] text-orange-300">
              EXPERIENCE HIGHWAY
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}