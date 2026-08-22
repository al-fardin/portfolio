"use client";

import {
  useEffect,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useJourneyStore,
} from "@/store/useJourneyStore";

function RiderIllustration() {
  return (
    <svg
      width="150"
      height="90"
      viewBox="0 0 150 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* wheels */}

      <circle
        cx="38"
        cy="68"
        r="15"
        stroke="#252A2D"
        strokeWidth="5"
      />

      <circle
        cx="110"
        cy="68"
        r="15"
        stroke="#252A2D"
        strokeWidth="5"
      />

      {/* motorcycle body */}

      <path
        d="
          M38 65
          L56 49
          L89 49
          L108 65
        "
        stroke="#252A2D"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="
          M55 49
          L68 63
          L90 49
        "
        stroke="#9B6954"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* handle */}

      <path
        d="
          M89 49
          L101 37
          L111 38
        "
        stroke="#252A2D"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* rider body */}

      <path
        d="
          M69 22
          L78 45
          L93 50
        "
        stroke="#3E4446"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* rider arm */}

      <path
        d="
          M75 31
          L91 39
          L101 38
        "
        stroke="#3E4446"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* helmet */}

      <circle
        cx="66"
        cy="16"
        r="11"
        fill="#252A2D"
      />

      <path
        d="
          M66 14
          L75 17
        "
        stroke="#81939C"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function IntroScreen() {
  const introPhase =
    useJourneyStore(
      (state) =>
        state.introPhase
    );

  const beginIntroTransition =
    useJourneyStore(
      (state) =>
        state.beginIntroTransition
    );

  const finishIntroTransition =
    useJourneyStore(
      (state) =>
        state.finishIntroTransition
    );

  /*
    After rider crosses,
    reveal 3D world.
  */

  useEffect(() => {
    if (
      introPhase !==
      "departing"
    ) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          finishIntroTransition();
        },
        1650
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    introPhase,
    finishIntroTransition,
  ]);

  if (
    introPhase ===
    "world"
  ) {
    return null;
  }

  const departing =
    introPhase ===
    "departing";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden bg-[#e8e3da] text-[#252a2d]"
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        {/* ================== */}
        {/* SKY GLOW */}
        {/* ================== */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 72% 18%, rgba(196,151,119,.18), transparent 36%), linear-gradient(180deg, #ece7de 0%, #e4ddd3 100%)",
          }}
        />

        {/* ================== */}
        {/* BRAND */}
        {/* ================== */}

        <motion.div
          className="absolute left-8 top-7 z-10"
          animate={{
            opacity:
              departing
                ? 0
                : 1,
          }}
        >
          <p className="text-[11px] font-semibold tracking-[0.32em]">
            NEXUS
          </p>

          <p className="mt-1 font-mono text-[7px] tracking-[0.32em] opacity-35">
            INTERACTIVE PORTFOLIO
          </p>
        </motion.div>

        {/* ================== */}
        {/* MAIN TEXT */}
        {/* ================== */}

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity:
              departing
                ? 0
                : 1,

            y:
              departing
                ? -20
                : 0,
          }}
          transition={{
            duration: 0.45,
          }}
        >
          <div className="-mt-[8vh] px-6 text-center">
            <motion.p
              className="font-mono text-[8px] tracking-[0.52em] opacity-40"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 0.4,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
            >
              STEP INTO MY WORLD
            </motion.p>

            <motion.h1
              className="mt-5 text-7xl font-semibold tracking-[-0.075em] md:text-[9rem]"
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.85,
              }}
            >
              NEXUS
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-md text-[10px] leading-6 tracking-[0.14em] opacity-45"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 0.45,
              }}
              transition={{
                delay: 0.7,
              }}
            >
              A CINEMATIC JOURNEY
              THROUGH CODE,
              PROJECTS AND IDEAS.
            </motion.p>

            <motion.button
              type="button"
              onClick={
                beginIntroTransition
              }
              className="mt-8 rounded-full border border-[#252a2d]/20 bg-white/20 px-9 py-4 text-[9px] font-medium tracking-[0.3em] transition hover:bg-white/45"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.85,
              }}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              START JOURNEY
            </motion.button>
          </div>
        </motion.div>

        {/* ================== */}
        {/* DISTANT CITY */}
        {/* ================== */}

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[28vh]"
          animate={{
            opacity:
              departing
                ? 0.7
                : 1,
          }}
        >
          <div className="absolute bottom-0 left-[4%] h-[55%] w-[7%] bg-[#858d8b]" />

          <div className="absolute bottom-0 left-[13%] h-[32%] w-[10%] bg-[#a39b90]" />

          <div className="absolute bottom-0 left-[25%] h-[46%] w-[6%] bg-[#737e80]" />

          <div className="absolute bottom-0 left-[34%] h-[26%] w-[12%] bg-[#aaa397]" />

          <div className="absolute bottom-0 right-[34%] h-[36%] w-[8%] bg-[#949187]" />

          <div className="absolute bottom-0 right-[22%] h-[52%] w-[7%] bg-[#737e80]" />

          <div className="absolute bottom-0 right-[9%] h-[31%] w-[11%] bg-[#a59b8e]" />

          {/* road */}

          <div
            className="absolute bottom-0 left-[22%] right-[22%] h-[15%]"
            style={{
              clipPath:
                "polygon(34% 0, 66% 0, 100% 100%, 0 100%)",

              background:
                "#666967",
            }}
          />
        </motion.div>

        {/* ================== */}
        {/* RIDER TRANSITION */}
        {/* ================== */}

        <AnimatePresence>
          {departing && (
            <motion.div
              className="absolute bottom-[8vh] z-20"
              initial={{
                left: "-15%",
                scale: 0.85,
              }}
              animate={{
                left: "110%",
                scale: 1.08,
              }}
              transition={{
                duration: 1.35,
                ease: [
                  0.35,
                  0,
                  0.2,
                  1,
                ],
              }}
            >
              <RiderIllustration />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================== */}
        {/* CINEMATIC WIPE */}
        {/* ================== */}

        <AnimatePresence>
          {departing && (
            <motion.div
              className="absolute inset-y-0 right-0 z-30 bg-[#252a2d]"
              initial={{
                width: "0%",
              }}
              animate={{
                width: "110%",
              }}
              transition={{
                delay: 0.75,
                duration: 0.78,
                ease: [
                  0.65,
                  0,
                  0.25,
                  1,
                ],
              }}
            />
          )}
        </AnimatePresence>

        {/* footer */}

        {!departing && (
          <>
            <div className="absolute bottom-7 left-8 font-mono text-[7px] tracking-[0.28em] opacity-30">
              SCROLL / SWIPE
            </div>

            <div className="absolute bottom-7 right-8 font-mono text-[7px] tracking-[0.28em] opacity-30">
              06 CHAPTERS
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}