"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useGameStore,
} from "@/store/useGameStore";

type BootStage =
  | "boot"
  | "world"
  | "route"
  | "ready";

export default function StartupOverlay() {
  const sceneMode =
    useGameStore(
      (state) =>
        state.sceneMode
    );

  const startJourney =
    useGameStore(
      (state) =>
        state.startJourney
    );

  const [stage, setStage] =
    useState<BootStage>(
      "boot"
    );

  useEffect(() => {
    if (
      sceneMode !==
      "startup"
    ) {
      return;
    }

    setStage("boot");

    const worldTimer =
      window.setTimeout(
        () => {
          setStage("world");
        },
        650
      );

    const routeTimer =
      window.setTimeout(
        () => {
          setStage("route");
        },
        1250
      );

    const readyTimer =
      window.setTimeout(
        () => {
          setStage("ready");
        },
        1850
      );

    return () => {
      window.clearTimeout(
        worldTimer
      );

      window.clearTimeout(
        routeTimer
      );

      window.clearTimeout(
        readyTimer
      );
    };
  }, [sceneMode]);

  useEffect(() => {
    if (
      sceneMode !==
      "startup"
    ) {
      return;
    }

    const handleKey = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
          "Enter" &&
        stage === "ready"
      ) {
        startJourney();
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
    stage,
    startJourney,
  ]);

  if (
    sceneMode !== "startup"
  ) {
    return null;
  }

  const ready =
    stage === "ready";

  let progress = 18;

  if (stage === "world") {
    progress = 48;
  }

  if (stage === "route") {
    progress = 78;
  }

  if (stage === "ready") {
    progress = 100;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] overflow-hidden"
        initial={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        {/* SOFT IVORY FILTER */}

        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "#eee9df",
          }}
          animate={{
            opacity: ready
              ? 0.78
              : 0.96,
          }}
          transition={{
            duration: 1.2,
          }}
        />

        {/* SUN GLOW */}

        <motion.div
          className="absolute -right-[10vw] -top-[20vh] h-[65vw] w-[65vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(225,119,95,.28), rgba(230,168,92,.10) 40%, transparent 70%)",
          }}
          animate={{
            scale: ready
              ? 1.08
              : 0.94,
          }}
          transition={{
            duration: 1.4,
          }}
        />

        {/* LEFT DECORATION */}

        <motion.div
          className="absolute bottom-0 left-[5vw] h-[26vh] w-[7vw] rounded-t-full bg-[#8ba59c]/40"
          initial={{
            y: 100,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.9,
          }}
        />

        <motion.div
          className="absolute bottom-0 left-[11vw] h-[17vh] w-[10vw] rounded-t-[4rem] bg-[#d18b70]/45"
          initial={{
            y: 120,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            delay: 0.45,
            duration: 0.9,
          }}
        />

        {/* TOP */}

        <div className="absolute left-8 top-7 text-[#26303b]">
          <p className="text-xs font-semibold tracking-[0.28em]">
            NEXUS
          </p>

          <p className="mt-1 font-mono text-[8px] tracking-[0.3em] opacity-40">
            DIGITAL WORLD
          </p>
        </div>

        <div className="absolute right-8 top-7 text-right font-mono text-[#26303b]/40">
          <p className="text-[8px] tracking-[0.3em]">
            06 CHAPTERS
          </p>
        </div>

        {/* MAIN */}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-5xl px-8 text-center text-[#26303b]">

            <motion.p
              className="font-mono text-[9px] tracking-[0.55em] opacity-45"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 0.45,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
            >
              AN INTERACTIVE PORTFOLIO
            </motion.p>

            <motion.h1
              className="mt-5 text-7xl font-semibold tracking-[-0.075em] md:text-[9rem]"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
                duration: 0.9,
              }}
            >
              NEXUS
            </motion.h1>

            <motion.div
              className="mx-auto mt-1 h-[3px] bg-[#e1775f]"
              initial={{
                width: 0,
              }}
              animate={{
                width: "110px",
              }}
              transition={{
                delay: 0.75,
                duration: 0.8,
              }}
            />

            <motion.p
              className="mx-auto mt-7 max-w-lg text-xs leading-6 tracking-[0.13em] text-[#26303b]/55"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
              }}
            >
              RIDE THROUGH A SMALL
              DIGITAL WORLD BUILT
              AROUND CODE, IDEAS
              AND PROJECTS.
            </motion.p>

            {/* LOADER */}

            <motion.div
              className="mx-auto mt-9 w-[230px]"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.65,
              }}
            >
              <div className="h-[2px] overflow-hidden bg-[#26303b]/10">
                <motion.div
                  className="h-full bg-[#e1775f]"
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.55,
                  }}
                />
              </div>

              <div className="mt-3 flex justify-between font-mono text-[7px] tracking-[0.25em] text-[#26303b]/35">
                <span>
                  WORLD LOADING
                </span>

                <span>
                  {progress}%
                </span>
              </div>
            </motion.div>

            {/* START */}

            <AnimatePresence>
              {ready && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={
                      startJourney
                    }
                    className="pointer-events-auto mt-9 rounded-full border border-[#26303b]/20 bg-[#f6f1e8]/70 px-9 py-4 text-[10px] font-medium tracking-[0.28em] text-[#26303b] backdrop-blur-md transition hover:border-[#e1775f] hover:bg-[#f8f3eb]"
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    START RIDE
                  </motion.button>

                  <p className="mt-5 font-mono text-[8px] tracking-[0.3em] text-[#26303b]/30">
                    SCROLL TO EXPLORE
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="absolute bottom-7 left-8 font-mono text-[8px] tracking-[0.25em] text-[#26303b]/30">
          SCROLL / SWIPE
        </div>

        <div className="absolute bottom-7 right-8 font-mono text-[8px] tracking-[0.25em] text-[#26303b]/30">
          PORTFOLIO 2026
        </div>
      </motion.div>
    </AnimatePresence>
  );
}