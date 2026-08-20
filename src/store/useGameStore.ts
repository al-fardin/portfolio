import { create } from "zustand";

import type {
  ProjectId,
} from "@/data/projects";

export type SceneMode =
  | "startup"
  | "ride"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "achievements"
  | "contact"
  | "complete";

type GameState = {
  speed: number;

  distance: number;

  journeyProgress: number;

  destinationReached: boolean;

  sceneMode: SceneMode;

  aboutCompleted: boolean;

  skillsCompleted: boolean;

  projectsCompleted: boolean;

  experienceCompleted: boolean;

  achievementsCompleted: boolean;

  contactCompleted: boolean;

  selectedProject: ProjectId;

  activeExperienceMilestone:
    | string
    | null;

  activeAchievementMilestone:
    | string
    | null;

  startJourney: () => void;

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

  enterExperience: () => void;

  continueFromExperience: () => void;

  enterAchievements: () => void;

  continueFromAchievements: () => void;

  enterContact: () => void;

  completeJourney: () => void;

  selectProject: (
    project: ProjectId
  ) => void;

  showExperienceMilestone: (
    id: string
  ) => void;

  clearExperienceMilestone: () => void;

  showAchievementMilestone: (
    id: string
  ) => void;

  clearAchievementMilestone: () => void;
};

export const useGameStore =
  create<GameState>((set) => ({
    speed: 0,

    distance: 1240,

    journeyProgress: 0,

    destinationReached: false,

    sceneMode: "startup",

    aboutCompleted: false,

    skillsCompleted: false,

    projectsCompleted: false,

    experienceCompleted: false,

    achievementsCompleted: false,

    contactCompleted: false,

    selectedProject: "edunexus",

    activeExperienceMilestone:
      null,

    activeAchievementMilestone:
      null,

    startJourney: () =>
      set({
        speed: 0,
        distance: 1240,
        journeyProgress: 0,
        destinationReached: false,
        sceneMode: "ride",
      }),

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

    enterExperience: () =>
      set({
        speed: 0,
        sceneMode: "experience",
        destinationReached: true,
        journeyProgress: 72,
        activeExperienceMilestone:
          null,
      }),

    continueFromExperience: () =>
      set({
        speed: 0,
        sceneMode: "ride",
        experienceCompleted: true,
        destinationReached: false,
        journeyProgress: 72,
      }),

    enterAchievements: () =>
      set({
        speed: 0,
        sceneMode: "achievements",
        destinationReached: true,
        journeyProgress: 88,
        activeAchievementMilestone:
          null,
      }),

    continueFromAchievements: () =>
      set({
        speed: 0,
        sceneMode: "ride",
        achievementsCompleted: true,
        destinationReached: false,
        journeyProgress: 88,
      }),

    enterContact: () =>
      set({
        speed: 0,
        sceneMode: "contact",
        destinationReached: true,
        journeyProgress: 100,
      }),

    completeJourney: () =>
      set({
        speed: 0,
        sceneMode: "complete",
        contactCompleted: true,
        destinationReached: true,
        journeyProgress: 100,
      }),

    selectProject: (
      selectedProject
    ) =>
      set({
        selectedProject,
      }),

    showExperienceMilestone: (
      activeExperienceMilestone
    ) =>
      set({
        activeExperienceMilestone,
      }),

    clearExperienceMilestone: () =>
      set({
        activeExperienceMilestone:
          null,
      }),

    showAchievementMilestone: (
      activeAchievementMilestone
    ) =>
      set({
        activeAchievementMilestone,
      }),

    clearAchievementMilestone: () =>
      set({
        activeAchievementMilestone:
          null,
      }),
  }));