import GameCanvas from "@/components/game/GameCanvas";

import ExperienceToast from "@/components/hud/ExperienceToast";

import HUD from "@/components/hud/HUD";

import AboutOverlay from "@/components/portfolio/AboutOverlay";

import ExperienceOverlay from "@/components/portfolio/ExperienceOverlay";

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
          "#0c1119",
      }}
    >
      {/* 3D GAME WORLD */}

      <GameCanvas />

      {/* GAME HUD */}

      <HUD />

      <ExperienceToast />

      {/* PORTFOLIO CINEMATICS */}

      <AboutOverlay />

      <SkillsOverlay />

      <ProjectsOverlay />

      <ExperienceOverlay />
    </main>
  );
}