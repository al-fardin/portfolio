import { create } from "zustand";

import type {
  ProjectId,
} from "@/data/projects";

export type SceneMode =
  | "ride"
  | "about"
  | "skills"
  | "projects";

type GameState = {
  speed: number;

  distance: number;

  journeyProgress: number;

  destinationReached: boolean;

  sceneMode: SceneMode;

  aboutCompleted: boolean;

  skillsCompleted: boolean;

  projectsCompleted: boolean;

  selectedProject: ProjectId;

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

  enterProjects: () => void;

  continueFromProjects: () => void;

  selectProject: (
    project: ProjectId
  ) => void;
};

export const useGameStore =
  create<GameState>((set) => ({
    speed: 0,

    distance: 1240,

    journeyProgress: 0,

    destinationReached: false,

    sceneMode: "ride",

    aboutCompleted: false,

    skillsCompleted: false,

    projectsCompleted: false,

    selectedProject: "edunexus",

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

    enterProjects: () =>
      set({
        speed: 0,
        sceneMode: "projects",
        destinationReached: true,
        journeyProgress: 55,
      }),

    continueFromProjects: () =>
      set({
        speed: 0,
        sceneMode: "ride",
        projectsCompleted: true,
        destinationReached: false,
        journeyProgress: 55,
      }),

    selectProject: (
      selectedProject
    ) =>
      set({
        selectedProject,
      }),
  }));