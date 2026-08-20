import { create } from "zustand";

export type SceneMode =
  | "ride"
  | "about";

type GameState = {
  speed: number;
  distance: number;
  journeyProgress: number;

  destinationReached: boolean;

  sceneMode: SceneMode;

  aboutCompleted: boolean;

  updateRide: (
    speed: number,
    distance: number,
    journeyProgress: number,
    destinationReached: boolean
  ) => void;

  enterAbout: () => void;

  continueJourney: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  speed: 0,

  distance: 1240,

  journeyProgress: 0,

  destinationReached: false,

  sceneMode: "ride",

  aboutCompleted: false,

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
      destinationReached: true,
      sceneMode: "about",
      journeyProgress: 16,
    }),

  continueJourney: () =>
    set({
      sceneMode: "ride",
      aboutCompleted: true,
      destinationReached: false,
      journeyProgress: 16,
    }),
}));