"use client";

import BikeController from "@/components/bike/BikeController";

import AchievementBridge from "@/components/locations/AchievementBridge";

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

  return (
    <>
      {/* Dark sunset / early night */}

      <color
        attach="background"
        args={[
          "#090d15",
        ]}
      />

      <fog
        attach="fog"
        args={[
          "#090d15",
          70,
          350,
        ]}
      />

      {/* Global lighting */}

      <ambientLight
        intensity={0.55}
      />

      <directionalLight
        position={[
          15,
          25,
          10,
        ]}
        intensity={1.9}
        castShadow
        shadow-mapSize-width={
          2048
        }
        shadow-mapSize-height={
          2048
        }
      />

      <pointLight
        position={[
          0,
          8,
          -620,
        ]}
        color="#f59e0b"
        intensity={20}
        distance={90}
      />

      <pointLight
        position={[
          0,
          10,
          -760,
        ]}
        color="#22d3ee"
        intensity={24}
        distance={100}
      />

      {/* Base */}

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

      {/* ACHIEVEMENT BRIDGE */}

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

      {/* Contact Tower preview marker */}

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
          achievementsCompleted
        }
        completed={false}
      />

      {/* Player */}

      <BikeController />
    </>
  );
}