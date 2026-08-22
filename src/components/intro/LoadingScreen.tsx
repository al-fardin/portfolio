"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useProgress,
} from "@react-three/drei";

import {
  useIntroFlow,
} from "@/store/useIntroFlow";

function getStatus(
  progress: number
) {
  if (progress < 15) {
    return "INITIALIZING";
  }

  if (progress < 38) {
    return "BUILDING CITY";
  }

  if (progress < 62) {
    return "LOADING ENVIRONMENT";
  }

  if (progress < 82) {
    return "CALIBRATING JOURNEY";
  }

  if (progress < 99) {
    return "FINALIZING WORLD";
  }

  return "WORLD READY";
}

export default function LoadingScreen() {
  const {
    active,
    progress,
  } = useProgress();

  const setAssetsReady =
    useIntroFlow(
      (state) =>
        state.setAssetsReady
    );

  const assetsReady =
    useIntroFlow(
      (state) =>
        state.assetsReady
    );

  const [
    completed,
    setCompleted,
  ] = useState(false);

  const [
    exiting,
    setExiting,
  ] = useState(false);

  const startedExit =
    useRef(false);

  /*
    useProgress can return decimals.
  */

  const visibleProgress =
    Math.min(
      100,
      Math.max(
        0,
        Math.round(progress)
      )
    );

  useEffect(() => {
    /*
      Important:

      Initial loader state can be:
      active=false
      progress=0

      তাই শুধু !active দেখে ready করছি না।
    */

    const completelyLoaded =
      !active &&
      progress >= 99.9;

    if (
      !completelyLoaded ||
      startedExit.current
    ) {
      return;
    }

    startedExit.current =
      true;

    setCompleted(true);

    /*
      WORLD READY text
      একটু দেখাবে।
    */

    const exitTimer =
      window.setTimeout(
        () => {
          setExiting(true);
        },
        500
      );

    /*
      Fade complete হওয়ার পরে
      café interaction enable.
    */

    const readyTimer =
      window.setTimeout(
        () => {
          setAssetsReady(
            true
          );
        },
        1250
      );

    return () => {
      window.clearTimeout(
        exitTimer
      );

      window.clearTimeout(
        readyTimer
      );
    };
  }, [
    active,
    progress,
    setAssetsReady,
  ]);

  if (assetsReady) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",

        inset: 0,

        zIndex: 999,

        overflow: "hidden",

        background:
          "#050608",

        color: "#f5f5f4",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        pointerEvents: "auto",

        opacity:
          exiting
            ? 0
            : 1,

        transform:
          exiting
            ? "scale(1.025)"
            : "scale(1)",

        transition:
          "opacity 700ms cubic-bezier(.4,0,.2,1), transform 900ms cubic-bezier(.4,0,.2,1)",
      }}
    >
      {/* =====================================
          BACKGROUND GRID
      ===================================== */}

      <div
        style={{
          position:
            "absolute",

          inset: 0,

          opacity:
            0.18,

          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            )
          `,

          backgroundSize:
            "54px 54px",

          maskImage:
            "radial-gradient(circle at center, black 15%, transparent 76%)",
        }}
      />

      {/* =====================================
          TOP LEFT BRAND
      ===================================== */}

      <div
        style={{
          position:
            "absolute",

          top:
            "5vh",

          left:
            "5vw",
        }}
      >
        <p
          style={{
            margin: 0,

            fontSize:
              "10px",

            letterSpacing:
              "0.52em",

            opacity:
              0.48,
          }}
        >
          NEXUS
        </p>

        <p
          style={{
            margin:
              "8px 0 0",

            fontSize:
              "8px",

            letterSpacing:
              "0.34em",

            opacity:
              0.22,
          }}
        >
          DIGITAL JOURNEY
        </p>
      </div>

      {/* =====================================
          TOP RIGHT SYSTEM
      ===================================== */}

      <div
        style={{
          position:
            "absolute",

          top:
            "5vh",

          right:
            "5vw",

          textAlign:
            "right",
        }}
      >
        <p
          style={{
            margin: 0,

            fontSize:
              "8px",

            letterSpacing:
              "0.35em",

            opacity:
              0.32,
          }}
        >
          SYSTEM / 00
        </p>

        <p
          style={{
            margin:
              "8px 0 0",

            fontSize:
              "8px",

            letterSpacing:
              "0.2em",

            opacity:
              0.18,
          }}
        >
          WORLD LINK
        </p>
      </div>

      {/* =====================================
          MAIN LOADER
      ===================================== */}

      <div
        style={{
          position:
            "relative",

          width:
            "min(460px, 78vw)",

          display:
            "flex",

          flexDirection:
            "column",

          alignItems:
            "center",
        }}
      >
        {/* orbital loader */}

        <div
          style={{
            position:
              "relative",

            width:
              "132px",

            height:
              "132px",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",
          }}
        >
          {/* outer broken ring */}

          <div
            className="nexus-loader-ring nexus-ring-one"
          />

          {/* second ring */}

          <div
            className="nexus-loader-ring nexus-ring-two"
          />

          {/* centre logo */}

          <div
            style={{
              position:
                "relative",

              width:
                "58px",

              height:
                "58px",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              border:
                "1px solid rgba(255,255,255,0.18)",

              transform:
                "rotate(45deg)",
            }}
          >
            <span
              style={{
                transform:
                  "rotate(-45deg)",

                fontSize:
                  "19px",

                fontWeight:
                  500,

                letterSpacing:
                  "0.08em",
              }}
            >
              N
            </span>
          </div>

          {/* scanning dot */}

          <div
            className="nexus-orbit-dot"
          />
        </div>

        {/* =================================
            STATUS
        ================================= */}

        <p
          style={{
            margin:
              "32px 0 0",

            minHeight:
              "15px",

            fontSize:
              "9px",

            letterSpacing:
              "0.48em",

            opacity:
              completed
                ? 0.9
                : 0.52,

            transition:
              "opacity 300ms ease",
          }}
        >
          {completed
            ? "WORLD READY"
            : getStatus(
                visibleProgress
              )}
        </p>

        {/* percentage */}

        <div
          style={{
            marginTop:
              "12px",

            display:
              "flex",

            alignItems:
              "flex-end",

            gap:
              "4px",
          }}
        >
          <span
            style={{
              fontSize:
                "38px",

              lineHeight: 1,

              fontWeight:
                300,

              letterSpacing:
                "-0.05em",

              fontVariantNumeric:
                "tabular-nums",
            }}
          >
            {String(
              visibleProgress
            ).padStart(
              2,
              "0"
            )}
          </span>

          <span
            style={{
              paddingBottom:
                "4px",

              fontSize:
                "9px",

              letterSpacing:
                "0.15em",

              opacity:
                0.35,
            }}
          >
            %
          </span>
        </div>

        {/* =================================
            PROGRESS RAIL
        ================================= */}

        <div
          style={{
            position:
              "relative",

            marginTop:
              "25px",

            width:
              "100%",

            height:
              "1px",

            background:
              "rgba(255,255,255,0.12)",
          }}
        >
          <div
            style={{
              position:
                "absolute",

              left: 0,

              top:
                "-1px",

              width:
                `${visibleProgress}%`,

              height:
                "3px",

              background:
                "linear-gradient(90deg, rgba(255,255,255,0.25), #ffffff)",

              boxShadow:
                "0 0 14px rgba(255,255,255,0.35)",

              transition:
                "width 280ms ease-out",
            }}
          />

          {/* moving scan */}

          {!completed && (
            <div
              className="nexus-progress-scan"
            />
          )}
        </div>

        {/* bottom technical info */}

        <div
          style={{
            marginTop:
              "18px",

            width:
              "100%",

            display:
              "flex",

            justifyContent:
              "space-between",

            fontSize:
              "7px",

            letterSpacing:
              "0.2em",

            opacity:
              0.2,
          }}
        >
          <span>
            ENVIRONMENT
          </span>

          <span>
            RENDER ENGINE
          </span>

          <span>
            READY
          </span>
        </div>
      </div>

      {/* =====================================
          PERSPECTIVE ROAD AT BOTTOM
      ===================================== */}

      <div
        className="nexus-road nexus-road-left"
      />

      <div
        className="nexus-road nexus-road-right"
      />

      <div
        className="nexus-road-center"
      />

      {/* =====================================
          CSS
      ===================================== */}

      <style>
        {`
          .nexus-loader-ring {
            position: absolute;
            border-radius: 50%;
            border-style: solid;
          }

          .nexus-ring-one {
            inset: 0;

            border-width: 1px;
            border-color:
              rgba(255,255,255,.42)
              transparent
              rgba(255,255,255,.08)
              transparent;

            animation:
              nexusSpin 2.1s linear infinite;
          }

          .nexus-ring-two {
            inset: 14px;

            border-width: 1px;

            border-color:
              transparent
              rgba(255,255,255,.13)
              transparent
              rgba(255,255,255,.48);

            animation:
              nexusSpinReverse 1.45s linear infinite;
          }

          .nexus-orbit-dot {
            position: absolute;

            width: 5px;
            height: 5px;

            border-radius: 50%;

            background: white;

            box-shadow:
              0 0 9px white,
              0 0 20px rgba(255,255,255,.55);

            animation:
              nexusOrbit 2.1s linear infinite;
          }

          .nexus-progress-scan {
            position: absolute;

            top: -3px;

            width: 34px;
            height: 7px;

            background:
              radial-gradient(
                ellipse at center,
                rgba(255,255,255,.9),
                rgba(255,255,255,0)
              );

            animation:
              nexusScan 1.8s ease-in-out infinite;
          }

          .nexus-road {
            position: absolute;

            bottom: -10vh;

            width: 1px;
            height: 32vh;

            background:
              linear-gradient(
                to top,
                rgba(255,255,255,.2),
                rgba(255,255,255,0)
              );

            transform-origin:
              bottom center;

            opacity: .2;
          }

          .nexus-road-left {
            left: calc(50% - 9px);

            transform:
              rotate(22deg);
          }

          .nexus-road-right {
            left: calc(50% + 9px);

            transform:
              rotate(-22deg);
          }

          .nexus-road-center {
            position: absolute;

            bottom: 0;

            left: 50%;

            width: 1px;
            height: 13vh;

            opacity: .12;

            background:
              repeating-linear-gradient(
                to top,
                transparent 0px,
                transparent 12px,
                white 13px,
                white 17px
              );
          }

          @keyframes nexusSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @keyframes nexusSpinReverse {
            from {
              transform: rotate(360deg);
            }

            to {
              transform: rotate(0deg);
            }
          }

          @keyframes nexusOrbit {
            from {
              transform:
                rotate(0deg)
                translateX(66px)
                rotate(0deg);
            }

            to {
              transform:
                rotate(360deg)
                translateX(66px)
                rotate(-360deg);
            }
          }

          @keyframes nexusScan {
            0% {
              left: -10px;
              opacity: 0;
            }

            20% {
              opacity: 1;
            }

            80% {
              opacity: 1;
            }

            100% {
              left: calc(100% - 20px);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}