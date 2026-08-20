"use client";

import BikeController from "@/components/bike/BikeController";

import SkillsGarage from "@/components/locations/SkillsGarage";

import { useGameStore } from "@/store/useGameStore";

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

  return (
    <>
      {/* Sky */}
      <color
        attach="background"
        args={[
          "#10151c",
        ]}
      />

      {/* Fog */}
      <fog
        attach="fog"
        args={[
          "#10151c",
          55,
          280,
        ]}
      />

      {/* Lighting */}
      <ambientLight
        intensity={0.7}
      />

      <directionalLight
        position={[
          15,
          25,
          10,
        ]}
        intensity={2.4}
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
        intensity={30}
        distance={80}
      />

      {/* Environment */}
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

      {/* Skills Garage */}
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

      {/* Player */}
      <BikeController />
    </>
  );
}