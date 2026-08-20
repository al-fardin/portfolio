"use client";

import BikeController from "@/components/bike/BikeController";

import AchievementBridge from "@/components/locations/AchievementBridge";

import ContactTower from "@/components/locations/ContactTower";

import ExperienceHighway from "@/components/locations/ExperienceHighway";

import ProjectCity from "@/components/locations/ProjectCity";

import SkillsGarage from "@/components/locations/SkillsGarage";

import {
  useGameStore,
} from "@/store/useGameStore";

import Buildings from "./Buildings";

import DestinationMarker from "./DestinationMarker";

import Road from "./Road";

export default function World() {
  const aboutCompleted =
    useGameStore(
      (state) =>
        state.aboutCompleted
    );

  const skillsCompleted =
    useGameStore(
      (state) =>
        state.skillsCompleted
    );

  const projectsCompleted =
    useGameStore(
      (state) =>
        state.projectsCompleted
    );

  const experienceCompleted =
    useGameStore(
      (state) =>
        state.experienceCompleted
    );

  const achievementsCompleted =
    useGameStore(
      (state) =>
        state.achievementsCompleted
    );

  const contactCompleted =
    useGameStore(
      (state) =>
        state.contactCompleted
    );

  return (
    <>
      {/* Night environment */}

      <color
        attach="background"
        args={[
          "#050812",
        ]}
      />

      <fog
        attach="fog"
        args={[
          "#050812",
          75,
          380,
        ]}
      />

      <ambientLight
        intensity={0.45}
      />

      {/* Moon-like light */}

      <directionalLight
        position={[
          -20,
          30,
          15,
        ]}
        intensity={1.6}
        color="#c7d2fe"
        castShadow
        shadow-mapSize-width={
          2048
        }
        shadow-mapSize-height={
          2048
        }
      />

      {/* Final cyan atmosphere */}

      <pointLight
        position={[
          0,
          15,
          -900,
        ]}
        color="#22d3ee"
        intensity={35}
        distance={140}
      />

      <pointLight
        position={[
          20,
          12,
          -920,
        ]}
        color="#7c3aed"
        intensity={25}
        distance={100}
      />

      {/* World */}

      <Road />

      <Buildings />

      {/* ABOUT */}

      <DestinationMarker
        position={[
          0,
          0,
          -120,
        ]}
        index="01"
        title="ABOUT VIEWPOINT"
        color="#8b5cf6"
        active={
          !aboutCompleted
        }
        completed={
          aboutCompleted
        }
      />

      {/* SKILLS */}

      <SkillsGarage />

      <DestinationMarker
        position={[
          0,
          0,
          -252,
        ]}
        index="02"
        title="SKILLS GARAGE"
        color="#22d3ee"
        active={
          aboutCompleted &&
          !skillsCompleted
        }
        completed={
          skillsCompleted
        }
      />

      {/* PROJECTS */}

      <ProjectCity />

      <DestinationMarker
        position={[
          0,
          0,
          -420,
        ]}
        index="03"
        title="PROJECT CITY"
        color="#a855f7"
        active={
          skillsCompleted &&
          !projectsCompleted
        }
        completed={
          projectsCompleted
        }
      />

      {/* EXPERIENCE */}

      <ExperienceHighway />

      <DestinationMarker
        position={[
          0,
          0,
          -575,
        ]}
        index="04"
        title="EXPERIENCE HIGHWAY"
        color="#fb923c"
        active={
          projectsCompleted &&
          !experienceCompleted
        }
        completed={
          experienceCompleted
        }
      />

      {/* ACHIEVEMENTS */}

      <AchievementBridge />

      <DestinationMarker
        position={[
          0,
          0,
          -750,
        ]}
        index="05"
        title="ACHIEVEMENT BRIDGE"
        color="#f59e0b"
        active={
          experienceCompleted &&
          !achievementsCompleted
        }
        completed={
          achievementsCompleted
        }
      />

      {/* CONTACT */}

      <ContactTower />

      <DestinationMarker
        position={[
          0,
          0,
          -900,
        ]}
        index="06"
        title="CONTACT TOWER"
        color="#22d3ee"
        active={
          achievementsCompleted &&
          !contactCompleted
        }
        completed={
          contactCompleted
        }
      />

      {/* PLAYER */}

      <BikeController />
    </>
  );
}