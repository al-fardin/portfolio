import GameCanvas from "@/components/game/GameCanvas";

import AchievementToast from "@/components/hud/AchievementToast";

import ExperienceToast from "@/components/hud/ExperienceToast";

import HUD from "@/components/hud/HUD";

import AboutOverlay from "@/components/portfolio/AboutOverlay";

import AchievementOverlay from "@/components/portfolio/AchievementOverlay";

import ContactOverlay from "@/components/portfolio/ContactOverlay";

import ExperienceOverlay from "@/components/portfolio/ExperienceOverlay";

import JourneyCompleteOverlay from "@/components/portfolio/JourneyCompleteOverlay";

import ProjectsOverlay from "@/components/portfolio/ProjectsOverlay";

import SkillsOverlay from "@/components/portfolio/SkillsOverlay";

export default function Home() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,

        width: "100vw",
        height: "100dvh",

        margin: 0,
        padding: 0,

        overflow: "hidden",

        background:
          "#050812",
      }}
    >
      {/* 3D WORLD */}

      <GameCanvas />

      {/* HUD */}

      <HUD />

      <ExperienceToast />

      <AchievementToast />

      {/* CINEMATICS */}

      <AboutOverlay />

      <SkillsOverlay />

      <ProjectsOverlay />

      <ExperienceOverlay />

      <AchievementOverlay />

      <ContactOverlay />

      <JourneyCompleteOverlay />
    </main>
  );
}