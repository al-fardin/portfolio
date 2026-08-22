"use client";

import { create } from "zustand";

export type IntroStage =
  | "cafe"
  | "walk"
  | "mosque"
  | "transition"
  | "bike";

type IntroFlowState = {
  stage: IntroStage;

  walkProgress: number;

  assetsReady: boolean;

  setStage: (
    stage: IntroStage
  ) => void;

  setWalkProgress: (
    value: number
  ) => void;

  setAssetsReady: (
    ready: boolean
  ) => void;

  resetIntro: () => void;
};

export const useIntroFlow =
  create<IntroFlowState>(
    (set) => ({
      stage: "cafe",

      walkProgress: 0,

      /*
        IMPORTANT:

        Default false.

        3D world load complete
        হওয়ার আগে input enable হবে না।
      */

      assetsReady: false,

      setStage: (stage) =>
        set({
          stage,
        }),

      setWalkProgress: (
        value
      ) =>
        set({
          walkProgress:
            Math.max(
              0,
              Math.min(
                100,
                value
              )
            ),
        }),

      setAssetsReady: (
        assetsReady
      ) =>
        set({
          assetsReady,
        }),

      resetIntro: () =>
        set({
          stage: "cafe",

          walkProgress: 0,

          assetsReady: false,
        }),
    })
  );