"use client";

import { useEffect } from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import { useGameStore } from "@/store/useGameStore";

export default function ContactOverlay() {
  const sceneMode = useGameStore(
    (state) => state.sceneMode
  );

  const completeJourney = useGameStore(
    (state) => state.completeJourney
  );

  useEffect(() => {
    if (sceneMode !== "contact") {
      return;
    }

    const handleKey = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Enter") {
        completeJourney();
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
    completeJourney,
  ]);

  return (
    <AnimatePresence>
      {sceneMode === "contact" && (
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
          {/* TOP CINEMATIC BAR */}
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
            }}
          />

          {/* BOTTOM CINEMATIC BAR */}
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
            }}
          />

          {/* MAIN CONTENT */}
          <div className="absolute inset-0 flex items-center">
            <div className="ml-[6vw] max-w-2xl">

              {/* SECTION NUMBER */}
              <motion.p
                className="font-mono text-[10px] tracking-[0.45em] text-cyan-300"
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
                06 / CONTACT
              </motion.p>

              {/* TITLE */}
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
                  duration: 0.75,
                }}
              >
                LET&apos;S BUILD
                <br />

                <span className="text-cyan-300">
                  SOMETHING
                </span>

                <br />

                GREAT.
              </motion.h1>

              {/* DESCRIPTION */}
              <motion.p
                className="mt-7 max-w-lg text-sm leading-7 text-white/55 md:text-base"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1,
                }}
              >
                Have an idea, project,
                collaboration or opportunity?
                The journey does not have to
                end here.
              </motion.p>

              {/* CONTACT CARDS */}
              <motion.div
                className="pointer-events-auto mt-8 grid max-w-xl gap-2 md:grid-cols-3"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.15,
                }}
              >

                {/* EMAIL */}
                <a
                  href="mailto:your@email.com"
                  className="group border border-white/10 bg-black/35 p-4 backdrop-blur-xl transition hover:border-cyan-300/60 hover:bg-cyan-400/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center border border-cyan-300/30 font-mono text-xs text-cyan-300">
                    @
                  </div>

                  <p className="mt-4 font-mono text-[9px] tracking-[0.2em] text-white/35">
                    EMAIL
                  </p>

                  <p className="mt-1 text-xs text-white/70">
                    Send a message
                  </p>
                </a>

                {/* GITHUB */}
                <a
                  href="https://github.com/al-fardin"
                  target="_blank"
                  rel="noreferrer"
                  className="group border border-white/10 bg-black/35 p-4 backdrop-blur-xl transition hover:border-violet-300/60 hover:bg-violet-400/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center border border-violet-300/30 font-mono text-[10px] text-violet-300">
                    GH
                  </div>

                  <p className="mt-4 font-mono text-[9px] tracking-[0.2em] text-white/35">
                    GITHUB
                  </p>

                  <p className="mt-1 text-xs text-white/70">
                    View my work
                  </p>
                </a>

                {/* LINKEDIN */}
                <a
                  href="#"
                  className="group border border-white/10 bg-black/35 p-4 backdrop-blur-xl transition hover:border-cyan-300/60 hover:bg-cyan-400/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center border border-cyan-300/30 font-mono text-[10px] text-cyan-300">
                    IN
                  </div>

                  <p className="mt-4 font-mono text-[9px] tracking-[0.2em] text-white/35">
                    LINKEDIN
                  </p>

                  <p className="mt-1 text-xs text-white/70">
                    Connect with me
                  </p>
                </a>

              </motion.div>

              {/* COMPLETE BUTTON */}
              <motion.button
                type="button"
                onClick={completeJourney}
                className="pointer-events-auto mt-9 border border-cyan-300/35 bg-black/45 px-7 py-3 text-xs tracking-[0.24em] backdrop-blur-xl transition hover:border-cyan-300 hover:bg-cyan-400/10"
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
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                COMPLETE JOURNEY

                <span className="ml-4 text-white/35">
                  ENTER ↵
                </span>
              </motion.button>

            </div>
          </div>

          {/* BOTTOM RIGHT LOCATION */}
          <motion.div
            className="absolute bottom-[9vh] right-[5vw] text-right"
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
            <p className="font-mono text-[9px] tracking-[0.35em] text-white/25">
              FINAL DESTINATION
            </p>

            <p className="mt-2 text-sm tracking-[0.2em] text-cyan-300">
              CONTACT TOWER
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}