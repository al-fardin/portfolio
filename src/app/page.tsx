import GameCanvas from "@/components/game/GameCanvas";
import HUD from "@/components/hud/HUD";

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
        background: "#10151c",
      }}
    >
      <GameCanvas />

      <HUD />
    </main>
  );
}