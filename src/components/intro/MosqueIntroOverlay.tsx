"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useIntroFlow,
} from "@/store/useIntroFlow";

export default function MosqueIntroOverlay() {
  const stage =
    useIntroFlow(
      (state) =>
        state.stage
    );

  const setStage =
    useIntroFlow(
      (state) =>
        state.setStage
    );

  const [
    visible,
    setVisible,
  ] = useState(false);

  /*
    Camera mosque-এর পিছনে
    establish হওয়ার জন্য
    একটু সময় দিচ্ছি।

    তারপর text fade-in হবে।
  */

  useEffect(() => {
    if (
      stage !== "mosque"
    ) {
      setVisible(
        false
      );

      return;
    }

    const timer =
      window.setTimeout(
        () => {
          setVisible(
            true
          );
        },
        900
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [stage]);

  if (
    stage !== "mosque"
  ) {
    return null;
  }

  return (
    <div
      style={{
        position:
          "absolute",

        inset: 0,

        zIndex: 25,

        pointerEvents:
          "none",

        /*
          Left side subtle
          cinematic shade.

          Mosque side mostly untouched.
        */

        background:
          "linear-gradient(90deg, rgba(5,7,10,0.58) 0%, rgba(5,7,10,0.18) 34%, rgba(5,7,10,0) 65%)",

        opacity:
          visible
            ? 1
            : 0,

        transition:
          "opacity 1.1s ease",
      }}
    >
      {/* =================================
          TEXT

          Left side only.
          Mosque background visible.
      ================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            "7vw",

          bottom:
            "12vh",

          width:
            "min(540px, 72vw)",

          color:
            "white",

          transform:
            visible
              ? "translateY(0)"
              : "translateY(24px)",

          opacity:
            visible
              ? 1
              : 0,

          transition:
            "transform 1.1s cubic-bezier(.22,.61,.36,1), opacity 1.1s ease",
        }}
      >
        <p
          style={{
            margin: 0,

            fontSize:
              "10px",

            letterSpacing:
              "0.42em",

            opacity:
              0.55,
          }}
        >
          01 / INTRODUCTION
        </p>

        <div
          style={{
            width:
              "44px",

            height:
              "1px",

            margin:
              "20px 0 24px",

            background:
              "rgba(255,255,255,0.7)",
          }}
        />

        <h1
          style={{
            margin: 0,

            fontSize:
              "clamp(34px, 5vw, 72px)",

            lineHeight:
              0.98,

            fontWeight:
              500,

            letterSpacing:
              "-0.035em",

            textShadow:
              "0 5px 28px rgba(0,0,0,0.4)",
          }}
        >
          Assalamu
          Alaikum.
        </h1>

        <p
          style={{
            margin:
              "18px 0 0",

            fontSize:
              "clamp(18px, 2vw, 27px)",

            lineHeight:
              1.4,

            fontWeight:
              400,

            color:
              "rgba(255,255,255,0.84)",

            letterSpacing:
              "0.02em",
          }}
        >
          This is{" "}
          <span
            style={{
              color:
                "#ffffff",

              fontWeight:
                600,
            }}
          >
            Al Fardin
          </span>
        </p>

        <p
          style={{
            margin:
              "14px 0 0",

            maxWidth:
              "390px",

            fontSize:
              "13px",

            lineHeight:
              1.75,

            color:
              "rgba(255,255,255,0.55)",
          }}
        >
          Welcome to my
          digital journey.
        </p>

        {/* NEXT */}

        <button
          onClick={() =>
            setStage(
              "transition"
            )
          }
          style={{
            pointerEvents:
              "auto",

            marginTop:
              "30px",

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              "18px",

            border:
              "1px solid rgba(255,255,255,0.32)",

            background:
              "rgba(10,12,16,0.18)",

            color:
              "white",

            padding:
              "13px 20px",

            borderRadius:
              "999px",

            cursor:
              "pointer",

            fontSize:
              "10px",

            letterSpacing:
              "0.25em",

            backdropFilter:
              "blur(10px)",

            transition:
              "background 200ms ease, border-color 200ms ease, transform 200ms ease",
          }}
          onMouseEnter={(
            event
          ) => {
            event.currentTarget.style.background =
              "rgba(255,255,255,0.12)";

            event.currentTarget.style.borderColor =
              "rgba(255,255,255,0.65)";

            event.currentTarget.style.transform =
              "translateX(4px)";
          }}
          onMouseLeave={(
            event
          ) => {
            event.currentTarget.style.background =
              "rgba(10,12,16,0.18)";

            event.currentTarget.style.borderColor =
              "rgba(255,255,255,0.32)";

            event.currentTarget.style.transform =
              "translateX(0)";
          }}
        >
          NEXT

          <span
            style={{
              fontSize:
                "16px",

              letterSpacing:
                "0",
            }}
          >
            →
          </span>
        </button>
      </div>

      {/* =================================
          MOSQUE LABEL

          Right top tiny label.
      ================================= */}

      <div
        style={{
          position:
            "absolute",

          top:
            "6vh",

          right:
            "5vw",

          textAlign:
            "right",

          color:
            "white",

          opacity:
            0.45,
        }}
      >
        <p
          style={{
            margin: 0,

            fontSize:
              "9px",

            letterSpacing:
              "0.38em",
          }}
        >
          MOSQUE
          VIEWPOINT
        </p>

        <p
          style={{
            margin:
              "8px 0 0",

            fontSize:
              "10px",

            letterSpacing:
              "0.15em",
          }}
        >
          ARRIVAL
        </p>
      </div>
    </div>
  );
}