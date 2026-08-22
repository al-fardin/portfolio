import { create } from "zustand";

export type IntroPhase =
  | "idle"
  | "departing"
  | "world";

export type ProjectId =
  | "edunexus"
  | "health-api"
  | "auth-system";

const PREVIEW_END = 0.22;

type JourneyState = {
  started: boolean;

  introPhase: IntroPhase;

  progress: number;

  targetProgress: number;

  selectedProject: ProjectId;

  beginIntroTransition: () => void;

  finishIntroTransition: () => void;

  changeTarget: (
    amount: number
  ) => void;

  setProgress: (
    progress: number
  ) => void;

  selectProject: (
    project: ProjectId
  ) => void;

  restartJourney: () => void;
};

export const useJourneyStore =
  create<JourneyState>((set) => ({
    started: false,

    introPhase: "idle",

    progress: 0,

    targetProgress: 0,

    selectedProject:
      "edunexus",

    beginIntroTransition: () =>
      set({
        introPhase:
          "departing",
      }),

    finishIntroTransition: () =>
      set({
        introPhase:
          "world",

        started: true,

        progress: 0,

        targetProgress: 0,
      }),

    changeTarget: (
      amount
    ) =>
      set((state) => ({
        targetProgress:
          Math.min(
            PREVIEW_END,

            Math.max(
              0,

              state.targetProgress +
                amount
            )
          ),
      })),

    setProgress: (
      progress
    ) =>
      set({
        progress,
      }),

    selectProject: (
      selectedProject
    ) =>
      set({
        selectedProject,
      }),

    restartJourney: () =>
      set({
        started: false,

        introPhase: "idle",

        progress: 0,

        targetProgress: 0,

        selectedProject:
          "edunexus",
      }),
  }));