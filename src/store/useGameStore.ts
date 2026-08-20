import { create } from "zustand";

type GameState = {
  speed: number;
  distance: number;
  journeyProgress: number;
  destinationReached: boolean;

  updateRide: (
    speed: number,
    distance: number,
    journeyProgress: number,
    destinationReached: boolean
  ) => void;
};

export const useGameStore = create<GameState>((set) => ({
  speed: 0,
  distance: 1240,
  journeyProgress: 0,
  destinationReached: false,

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
}));