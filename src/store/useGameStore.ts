import { create } from "zustand";

export type SceneMode =
  | "ride"
  | "about"
  | "skills";

type GameState = {
  speed: number;
  distance: number;
  journeyProgress: number;

  destinationReached: boolean;

  sceneMode: SceneMode;

  aboutCompleted: boolean;
  skillsCompleted: boolean;

  updateRide: (
    speed: number,
    distance: number,
    journeyProgress: number,
    destinationReached: boolean
  ) => void;

  enterAbout: () => void;
  continueFromAbout: () => void;

  enterSkills: () => void;
  continueFromSkills: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  speed: 0,
  distance: 1240,
  journeyProgress: 0,

  destinationReached: false,

  sceneMode: "ride",

  aboutCompleted: false,
  skillsCompleted: false,

  updateRide: (
    speed,
    distance,
    journeyProgress,
    destinationReached
  ) =>
    set({
      speed,
      distance,
      journeyProgress,
      destinationReached,
    }),

  enterAbout: () =>
    set({
      speed: 0,
      sceneMode: "about",
      destinationReached: true,
      journeyProgress: 16,
    }),

  continueFromAbout: () =>
    set({
      speed: 0,
      sceneMode: "ride",
      aboutCompleted: true,
      destinationReached: false,
      journeyProgress: 16,
    }),

  enterSkills: () =>
    set({
      speed: 0,
      sceneMode: "skills",
      destinationReached: true,
      journeyProgress: 33,
    }),

  continueFromSkills: () =>
    set({
      speed: 0,
      sceneMode: "ride",
      skillsCompleted: true,
      destinationReached: false,
      journeyProgress: 33,
    }),
}));