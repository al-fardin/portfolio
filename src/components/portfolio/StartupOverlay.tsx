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

  const [
    stage,
    setStage,
  ] =
    useState<BootStage>(
      "boot"
    );

  /*
    ==========================
    BOOT SEQUENCE
    ==========================
  */

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
          setStage(
            "world"
          );
        },
        850
      );

    const routeTimer =
      window.setTimeout(
        () => {
          setStage(
            "route"
          );
        },
        1650
      );

    const readyTimer =
      window.setTimeout(
        () => {
          setStage(
            "ready"
          );
        },
        2450
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

  /*
    ENTER KEY
  */

  useEffect(() => {
    if (
      sceneMode !==
      "startup"
    ) {
      return;
    }

    const handleKey =
      (
        event: KeyboardEvent
      ) => {
        if (
          event.key ===
            "Enter" &&
          stage ===
            "ready"
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
    sceneMode !==
    "startup"
  ) {
    return null;
  }

  const ready =
    stage === "ready";

  let status =
    "INITIALIZING SYSTEM";

  let progress =
    "18";

  if (
    stage === "world"
  ) {
    status =
      "LOADING WORLD";

    progress =
      "46";
  }

  if (
    stage === "route"
  ) {
    status =
      "SYNCING JOURNEY";

    progress =
      "78";
  }

  if (
    stage === "ready"
  ) {
    status =
      "IGNITION READY";

    progress =
      "100";
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] overflow-hidden text-white"
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
        {/* ===================== */}
        {/* DARK CINEMATIC FILTER */}
        {/* ===================== */}

        <motion.div
          className="absolute inset-0 bg-black"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity:
              ready
                ? 0.34
                : 0.74,
          }}
          transition={{
            duration:
              1.2,
          }}
        />

        {/* ===================== */}
        {/* CENTER GLOW */}
        {/* ===================== */}

        <motion.div
          className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.18), rgba(34,211,238,0.05) 38%, transparent 70%)",
          }}
          animate={{
            opacity:
              ready
                ? 1
                : 0.45,

            scale:
              ready
                ? 1.1
                : 0.9,
          }}
          transition={{
            duration: 1.4,
          }}
        />

        {/* ===================== */}
        {/* SCAN LINES */}
        {/* ===================== */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,0.05) 4px)",
          }}
        />

        {/* ===================== */}
        {/* TOP LEFT SYSTEM */}
        {/* ===================== */}

        <motion.div
          className="absolute left-7 top-7 font-mono"
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.25,
          }}
        >
          <p className="text-[9px] tracking-[0.38em] text-white/30">
            NEXUS SYSTEM
          </p>

          <p className="mt-2 text-[10px] tracking-[0.18em] text-cyan-300/70">
            ONLINE
          </p>
        </motion.div>

        {/* ===================== */}
        {/* TOP RIGHT */}
        {/* ===================== */}

        <motion.div
          className="absolute right-7 top-7 text-right font-mono"
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.3,
          }}
        >
          <p className="text-[9px] tracking-[0.35em] text-white/25">
            ROUTE
          </p>

          <p className="mt-2 text-[10px] tracking-[0.18em] text-violet-300/80">
            06 DESTINATIONS
          </p>
        </motion.div>

        {/* ===================== */}
        {/* CENTER CONTENT */}
        {/* ===================== */}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-3xl px-8 text-center">

            {/* SYMBOL */}

            <motion.div
              className="mx-auto flex h-16 w-16 items-center justify-center border border-violet-300/30 bg-black/30 backdrop-blur-xl"
              initial={{
                opacity: 0,
                scale: 0.6,
                rotate: -45,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 45,
              }}
              transition={{
                delay: 0.35,
                duration: 0.8,
              }}
            >
              <motion.div
                className="h-5 w-5 border border-cyan-300"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* SMALL TITLE */}

            <motion.p
              className="mt-8 font-mono text-[10px] tracking-[0.6em] text-white/35"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.55,
              }}
            >
              INTERACTIVE PORTFOLIO
            </motion.p>

            {/* MAIN LOGO */}

            <motion.h1
              className="mt-5 text-5xl font-semibold tracking-[-0.055em] md:text-8xl"
              initial={{
                opacity: 0,
                y: 28,
                filter:
                  "blur(12px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter:
                  "blur(0px)",
              }}
              transition={{
                delay: 0.7,
                duration: 1,
              }}
            >
              NEXUS
              <span className="text-violet-400">
                {" "}
                RIDE
              </span>
            </motion.h1>

            {/* DIVIDER */}

            <motion.div
              className="mx-auto mt-7 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
              initial={{
                width: 0,
              }}
              animate={{
                width:
                  "70%",
              }}
              transition={{
                delay: 0.9,
                duration: 1,
              }}
            />

            {/* TAGLINE */}

            <motion.p
              className="mx-auto mt-6 max-w-xl text-xs leading-6 tracking-[0.12em] text-white/45 md:text-sm"
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
              A CINEMATIC JOURNEY
              THROUGH CODE, PROJECTS
              AND ENGINEERING.
            </motion.p>

            {/* ================= */}
            {/* SYSTEM STATUS */}
            {/* ================= */}

            <motion.div
              className="mx-auto mt-9 max-w-sm"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.75,
              }}
            >
              <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.22em]">
                <AnimatePresence
                  mode="wait"
                >
                  <motion.span
                    key={
                      status
                    }
                    className={
                      ready
                        ? "text-cyan-300"
                        : "text-white/35"
                    }
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                    }}
                  >
                    {status}
                  </motion.span>
                </AnimatePresence>

                <span className="text-white/25">
                  {progress}%
                </span>
              </div>

              {/* PROGRESS TRACK */}

              <div className="mt-3 h-[2px] w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-300"
                  initial={{
                    width:
                      "5%",
                  }}
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration:
                      0.75,

                    ease:
                      "easeOut",
                  }}
                />
              </div>
            </motion.div>

            {/* ================= */}
            {/* START BUTTON */}
            {/* ================= */}

            <AnimatePresence>
              {ready && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration:
                      0.6,
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={
                      startJourney
                    }
                    className="pointer-events-auto mt-9 border border-cyan-300/40 bg-black/45 px-8 py-4 text-xs tracking-[0.32em] text-white backdrop-blur-xl transition hover:border-cyan-200 hover:bg-cyan-300/10"
                    whileHover={{
                      scale:
                        1.04,
                    }}
                    whileTap={{
                      scale:
                        0.97,
                    }}
                  >
                    START JOURNEY

                    <span className="ml-5 font-mono text-white/35">
                      ENTER ↵
                    </span>
                  </motion.button>

                  <motion.p
                    className="mt-5 font-mono text-[8px] tracking-[0.28em] text-white/25"
                    animate={{
                      opacity: [
                        0.3,
                        0.8,
                        0.3,
                      ],
                    }}
                    transition={{
                      duration:
                        1.8,

                      repeat:
                        Infinity,
                    }}
                  >
                    IGNITION SYSTEM READY
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ===================== */}
        {/* BOTTOM HUD */}
        {/* ===================== */}

        <motion.div
          className="absolute bottom-7 left-7 font-mono"
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
          <p className="text-[8px] tracking-[0.3em] text-white/20">
            CONTROL SYSTEM
          </p>

          <p className="mt-2 text-[9px] tracking-[0.18em] text-white/35">
            W / S / A / D
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-7 right-7 text-right font-mono"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.1,
          }}
        >
          <p className="text-[8px] tracking-[0.3em] text-white/20">
            EXPERIENCE
          </p>

          <p className="mt-2 text-[9px] tracking-[0.18em] text-white/35">
            3D / INTERACTIVE
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}