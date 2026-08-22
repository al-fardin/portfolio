"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  useJourneyStore,
} from "@/store/useJourneyStore";

export default function JourneyInput() {
  const touchY =
    useRef<number | null>(
      null
    );

  useEffect(() => {
    /* =========================
       MOUSE WHEEL
    ========================= */

    const handleWheel = (
      event: WheelEvent
    ) => {
      const state =
        useJourneyStore.getState();

      if (!state.started) {
        return;
      }

      /*
        আগেরটা অনেক বেশি ছিল।

        এখন normal mouse wheel:
        ~0.003 - 0.008 progress

        ফলে অনেকবার scroll করতে হবে,
        journey clearly দেখা যাবে।
      */

      const amount =
        Math.min(
          0.008,
          Math.max(
            0.0025,
            Math.abs(
              event.deltaY
            ) / 14000
          )
        );

      state.changeTarget(
        event.deltaY > 0
          ? amount
          : -amount
      );
    };

    /* =========================
       KEYBOARD
    ========================= */

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const state =
        useJourneyStore.getState();

      if (!state.started) {
        return;
      }

      if (
        event.key ===
          "ArrowDown" ||
        event.key ===
          "PageDown" ||
        event.key === " "
      ) {
        state.changeTarget(
          0.006
        );
      }

      if (
        event.key ===
          "ArrowUp" ||
        event.key ===
          "PageUp"
      ) {
        state.changeTarget(
          -0.006
        );
      }
    };

    /* =========================
       TOUCH
    ========================= */

    const handleTouchStart = (
      event: TouchEvent
    ) => {
      touchY.current =
        event.touches[0]
          ?.clientY ?? null;
    };

    const handleTouchMove = (
      event: TouchEvent
    ) => {
      if (
        touchY.current ===
        null
      ) {
        return;
      }

      const currentY =
        event.touches[0]
          ?.clientY;

      if (
        currentY ===
        undefined
      ) {
        return;
      }

      const difference =
        touchY.current -
        currentY;

      /*
        Ignore tiny finger noise.
      */

      if (
        Math.abs(
          difference
        ) < 8
      ) {
        return;
      }

      /*
        Mobile swipe-ও slow.
      */

      const amount =
        Math.min(
          0.006,
          Math.max(
            0.0015,
            Math.abs(
              difference
            ) / 9000
          )
        );

      useJourneyStore
        .getState()
        .changeTarget(
          difference > 0
            ? amount
            : -amount
        );

      touchY.current =
        currentY;
    };

    const handleTouchEnd =
      () => {
        touchY.current =
          null;
      };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd
      );
    };
  }, []);

  return null;
}