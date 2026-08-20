"use client";

import BikeController from "@/components/bike/BikeController";

import AchievementBridge from "@/components/locations/AchievementBridge";
import ContactTower from "@/components/locations/ContactTower";
import ExperienceHighway from "@/components/locations/ExperienceHighway";
import ProjectCity from "@/components/locations/ProjectCity";
import SkillsGarage from "@/components/locations/SkillsGarage";

import { useGameStore } from "@/store/useGameStore";

import Buildings from "./Buildings";
import DestinationMarker from "./DestinationMarker";
import Road from "./Road";
import RoadsideDetails from "./RoadsideDetails";

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
      {/* ====================== */}
      {/* NIGHT SKY */}
      {/* ====================== */}

      <color
        attach="background"
        args={["#050812"]}
      />

      <fog
        attach="fog"
        args={[
          "#07101a",
          80,
          390,
        ]}
      />

      {/* ====================== */}
      {/* GLOBAL LIGHTING */}
      {/* ====================== */}

      <hemisphereLight
        args={[
          "#92b7ff",
          "#16120d",
          0.75,
        ]}
      />

      <ambientLight
        intensity={0.22}
      />

      {/* Moon */}

      <directionalLight
        position={[
          -30,
          45,
          25,
        ]}
        intensity={2}
        color="#dbeafe"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={120}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* Purple atmosphere */}

      <pointLight
        position={[
          -18,
          10,
          -60,
        ]}
        color="#7c3aed"
        intensity={18}
        distance={85}
      />

      {/* Cyan atmosphere */}

      <pointLight
        position={[
          18,
          8,
          -130,
        ]}
        color="#22d3ee"
        intensity={15}
        distance={80}
      />

      {/* Project city */}

      <pointLight
        position={[
          15,
          14,
          -420,
        ]}
        color="#8b5cf6"
        intensity={22}
        distance={100}
      />

      {/* Highway */}

      <pointLight
        position={[
          -10,
          10,
          -540,
        ]}
        color="#fb923c"
        intensity={18}
        distance={100}
      />

      {/* Achievement */}

      <pointLight
        position={[
          10,
          12,
          -700,
        ]}
        color="#f59e0b"
        intensity={18}
        distance={110}
      />

      {/* Contact */}

      <pointLight
        position={[
          0,
          20,
          -900,
        ]}
        color="#22d3ee"
        intensity={40}
        distance={150}
      />

      <pointLight
        position={[
          25,
          15,
          -920,
        ]}
        color="#7c3aed"
        intensity={24}
        distance={100}
      />

      {/* ====================== */}
      {/* BASE WORLD */}
      {/* ====================== */}

      <Road />

      <RoadsideDetails />

      <Buildings />

      {/* ====================== */}
      {/* ABOUT */}
      {/* ====================== */}

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

      {/* ====================== */}
      {/* SKILLS */}
      {/* ====================== */}

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

      {/* ====================== */}
      {/* PROJECT CITY */}
      {/* ====================== */}

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

      {/* ====================== */}
      {/* EXPERIENCE */}
      {/* ====================== */}

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

      {/* ====================== */}
      {/* ACHIEVEMENTS */}
      {/* ====================== */}

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

      {/* ====================== */}
      {/* CONTACT */}
      {/* ====================== */}

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

      {/* ====================== */}
      {/* PLAYER */}
      {/* ====================== */}

      <BikeController />
    </>
  );
}