import GameCanvas from "@/components/game/GameCanvas";

import HUD from "@/components/hud/HUD";

import AboutOverlay from "@/components/portfolio/AboutOverlay";

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

      {/* PORTFOLIO SCENES */}

      <AboutOverlay />

      <SkillsOverlay />

      <ProjectsOverlay />
    </main>
  );
}