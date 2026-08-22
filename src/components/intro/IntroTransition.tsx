"use client";

import {
  useIntroFlow,
} from "@/store/useIntroFlow";

export default function IntroTransition() {
  const stage =
    useIntroFlow(
      (state) =>
        state.stage
    );

  if (
    stage !==
    "transition"
  ) {
    return null;
  }

  return (
    <div
      style={{
        position:
          "absolute",

        inset: 0,

        zIndex: 28,

        pointerEvents:
          "none",
      }}
    >
      {/* cinematic top bar */}

      <div
        style={{
          position:
            "absolute",

          top: 0,

          left: 0,

          right: 0,

          height:
            "5vh",

          background:
            "#050609",

          animation:
            "cinematicBarTop 900ms ease forwards",
        }}
      />

      {/* cinematic bottom bar */}

      <div
        style={{
          position:
            "absolute",

          bottom: 0,

          left: 0,

          right: 0,

          height:
            "5vh",

          background:
            "#050609",

          animation:
            "cinematicBarBottom 900ms ease forwards",
        }}
      />

      {/* tiny chapter label */}

      <div
        style={{
          position:
            "absolute",

          top:
            "7vh",

          right:
            "5vw",

          color:
            "rgba(255,255,255,0.5)",

          fontSize:
            "9px",

          letterSpacing:
            "0.4em",

          animation:
            "chapterFade 1.2s ease forwards",
        }}
      >
        NEXT CHAPTER
      </div>

      <style>
        {`
          @keyframes cinematicBarTop {
            from {
              transform: translateY(-100%);
            }

            to {
              transform: translateY(0);
            }
          }

          @keyframes cinematicBarBottom {
            from {
              transform: translateY(100%);
            }

            to {
              transform: translateY(0);
            }
          }

          @keyframes chapterFade {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}