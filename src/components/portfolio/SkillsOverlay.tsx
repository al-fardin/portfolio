"use client";

import { useEffect } from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import { useGameStore } from "@/store/useGameStore";

const skills = [
  "C / C++",
  "JAVA",
  "JAVASCRIPT",
  "REACT",
  "NODE.JS",
  "GO",
  "GIT",
  "AI / ML",
];

export default function SkillsOverlay() {
  const sceneMode = useGameStore(
    (state) => state.sceneMode
  );

  const continueFromSkills =
    useGameStore(
      (state) =>
        state.continueFromSkills
    );

  useEffect(() => {
    if (
      sceneMode !== "skills"
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
        continueFromSkills();
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
    continueFromSkills,
  ]);

  return (
    <AnimatePresence>
      {sceneMode ===
        "skills" && (
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
          transition={{
            duration: 0.8,
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

            <div className="ml-[6vw] w-[42vw] max-w-2xl">

              <motion.p
                className="font-mono text-[11px] tracking-[0.45em] text-violet-300"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                }}
              >
                02 / SKILLS
              </motion.p>

              <motion.h1
                className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl"
                initial={{
                  opacity: 0,
                  y: 35,
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
                TOOLS I
                <br />

                <span className="text-cyan-300">
                  BUILD WITH.
                </span>
              </motion.h1>

              <motion.div
                className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4"
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.9,
                }}
              >
                {skills.map(
                  (
                    skill,
                    index
                  ) => (
                    <motion.div
                      key={skill}
                      className="border border-white/10 bg-black/30 px-4 py-4 font-mono text-[10px] tracking-[0.15em] text-white/65 backdrop-blur-xl"
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay:
                          1 +
                          index *
                            0.06,
                      }}
                    >
                      <span className="mr-2 text-violet-400">
                        ◆
                      </span>

                      {skill}
                    </motion.div>
                  )
                )}
              </motion.div>

              <motion.p
                className="mt-7 max-w-xl text-sm leading-7 text-white/50"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1.4,
                }}
              >
                Different tools for
                different problems —
                from systems and backend
                development to modern web
                experiences and machine
                learning.
              </motion.p>

              <motion.button
                type="button"
                onClick={
                  continueFromSkills
                }
                className="pointer-events-auto mt-8 border border-cyan-400/30 bg-black/35 px-6 py-3 text-xs tracking-[0.25em] backdrop-blur-xl transition hover:border-cyan-300 hover:bg-cyan-400/10"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.6,
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
              delay: 1.5,
            }}
          >
            <p className="font-mono text-[9px] tracking-[0.35em] text-white/30">
              LOCATION DISCOVERED
            </p>

            <p className="mt-2 text-sm tracking-[0.2em] text-cyan-300">
              SKILLS GARAGE
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}