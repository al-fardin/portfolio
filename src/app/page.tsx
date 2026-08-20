import GameCanvas from "@/components/game/GameCanvas";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <GameCanvas />
    </main>
  );
}