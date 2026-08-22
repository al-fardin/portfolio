import GameCanvas from "@/components/game/GameCanvas";

export default function Home() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: "#111820",
      }}
    >
      <GameCanvas />
    </main>
  );
}