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
  setStage: (stage: IntroStage) => void;
  setWalkProgress: (value: number) => void;
  resetIntro: () => void;
};

export const useIntroFlow = create<IntroFlowState>((set) => ({
  stage: "cafe",
  walkProgress: 0,

  setStage: (stage) => set({ stage }),

  setWalkProgress: (value) =>
    set({
      walkProgress: Math.max(0, Math.min(100, value)),
    }),

  resetIntro: () =>
    set({
      stage: "cafe",
      walkProgress: 0,
    }),
}));