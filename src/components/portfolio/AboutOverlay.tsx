"use client";

import {
  useEffect,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useGameStore,
} from "@/store/useGameStore";

export default function AboutOverlay() {
  const sceneMode =
    useGameStore(
      (state) =>
        state.sceneMode
    );

  const continueJourney =
    useGameStore(
      (state) =>
        state.continueJourney
    );

  /*
    ENTER key =
    continue journey
  */

  useEffect(() => {
    if (
      sceneMode !== "about"
    ) {
      return;
    }

    const handleKey =
      (
        event: KeyboardEvent
      ) => {
        if (
          event.key ===
          "Enter"
        ) {
          continueJourney();
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
    continueJourney,
  ]);

  return (
    <AnimatePresence>
      {sceneMode ===
        "about" && (
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
          {/* Cinematic top bar */}
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
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
          />

          {/* Cinematic bottom bar */}
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
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
          />

          {/* About content */}
          <div className="absolute inset-0 flex items-center">
            <div className="ml-[7vw] max-w-xl">

              <motion.p
                className="font-mono text-[11px] tracking-[0.45em] text-cyan-300"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
              >
                01 / ABOUT
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
                  delay: 0.7,
                  duration: 0.8,
                }}
              >
                THE PERSON
                <br />
                BEHIND
                <br />

                <span className="text-violet-400">
                  THE CODE.
                </span>
              </motion.h1>

              <motion.div
                className="mt-8 max-w-md"
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1,
                  duration: 0.7,
                }}
              >
                <p className="text-sm leading-7 text-white/65 md:text-base">
                  I&apos;m a CSE engineer
                  focused on building
                  software, exploring new
                  technologies, and turning
                  ideas into interactive
                  digital experiences.
                </p>

                <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] tracking-wider text-white/55">

                  <span className="border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-md">
                    SOFTWARE
                  </span>

                  <span className="border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-md">
                    WEB
                  </span>

                  <span className="border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-md">
                    AI / ML
                  </span>

                  <span className="border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-md">
                    PROBLEM SOLVING
                  </span>

                </div>
              </motion.div>

              <motion.button
                type="button"
                onClick={
                  continueJourney
                }
                className="pointer-events-auto mt-10 border border-white/20 bg-black/35 px-6 py-3 text-xs tracking-[0.25em] text-white backdrop-blur-xl transition hover:border-violet-400 hover:bg-violet-500/10"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.25,
                  duration: 0.6,
                }}
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                CONTINUE JOURNEY
                <span className="ml-4 text-white/40">
                  ENTER ↵
                </span>
              </motion.button>

            </div>
          </div>

          {/* Location label */}
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
            <p className="font-mono text-[9px] tracking-[0.35em] text-white/30">
              LOCATION DISCOVERED
            </p>

            <p className="mt-2 text-sm tracking-[0.2em] text-white/70">
              ABOUT VIEWPOINT
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}