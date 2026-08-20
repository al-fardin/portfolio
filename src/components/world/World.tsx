"use client";

import BikeController from "@/components/bike/BikeController";

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

  return (
    <>
      {/* Sky */}

      <color
        attach="background"
        args={[
          "#0c1119",
        ]}
      />

      {/* Fog */}

      <fog
        attach="fog"
        args={[
          "#0c1119",
          65,
          330,
        ]}
      />

      {/* Main lighting */}

      <ambientLight
        intensity={0.65}
      />

      <directionalLight
        position={[
          15,
          25,
          10,
        ]}
        intensity={2.3}
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
          7,
          -75,
        ]}
        color="#7c3aed"
        intensity={25}
        distance={80}
      />

      {/* Base environment */}

      <Road />

      <Buildings />

      {/* About */}

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

      {/* Skills */}

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

      {/* Projects */}

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

      {/* Experience */}

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

      {/* Player */}

      <BikeController />
    </>
  );
}