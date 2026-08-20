import GameCanvas from "@/components/game/GameCanvas";

import HUD from "@/components/hud/HUD";

import AboutOverlay from "@/components/portfolio/AboutOverlay";

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
          "#10151c",
      }}
    >
      {/* 3D Game */}
      <GameCanvas />

      {/* HUD */}
      <HUD />

      {/* Portfolio cinematics */}
      <AboutOverlay />

      <SkillsOverlay />
    </main>
  );
}