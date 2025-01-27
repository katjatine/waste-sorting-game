import { Instructions } from "@/components/Instructions";
import { GameContainer } from "@/components/GameContainer";

export default function Game() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Afval Sorteren Spel
        </h1>
        <Instructions />
        <GameContainer />
      </div>
    </div>
  );
}
