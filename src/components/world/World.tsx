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

import RoadsideDetails from "./RoadsideDetails";

import SkyEnvironment from "./SkyEnvironment";

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
      {/* SKY */}

      <SkyEnvironment />

      {/* WARM LOCATION LIGHTS */}

      <pointLight
        position={[
          -12,
          10,
          -100,
        ]}
        color="#f0b080"
        intensity={8}
        distance={60}
      />

      <pointLight
        position={[
          14,
          10,
          -250,
        ]}
        color="#a4c3ba"
        intensity={9}
        distance={70}
      />

      <pointLight
        position={[
          15,
          14,
          -420,
        ]}
        color="#d6a285"
        intensity={12}
        distance={90}
      />

      <pointLight
        position={[
          -8,
          12,
          -540,
        ]}
        color="#e5a86f"
        intensity={12}
        distance={95}
      />

      <pointLight
        position={[
          8,
          12,
          -700,
        ]}
        color="#d1a57f"
        intensity={10}
        distance={100}
      />

      <pointLight
        position={[
          0,
          18,
          -900,
        ]}
        color="#8baab8"
        intensity={18}
        distance={130}
      />

      {/* WORLD */}

      <Road />

      <RoadsideDetails />

      <Buildings />

      {/* ABOUT */}

      <DestinationMarker
        position={[
          0,
          0,
          -120,
        ]}
        index="01"
        title="ABOUT"
        color="#e1775f"
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
        title="SKILLS"
        color="#8ba59c"
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
        title="PROJECTS"
        color="#d18b70"
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
        title="EXPERIENCE"
        color="#e0ad6b"
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
        title="ACHIEVEMENTS"
        color="#b3a2b9"
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
        title="CONTACT"
        color="#7f9da8"
        active={
          achievementsCompleted &&
          !contactCompleted
        }
        completed={
          contactCompleted
        }
      />

      <BikeController />
    </>
  );
}