import { useState } from "react";
import { GameCard } from "./GameCard";
import { ScoreDisplay } from "./ScoreDisplay";
import { getRandomWasteItems, type WasteItem, type GameSettings } from "@/lib/wasteItems";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function GameContainer() {
  const [gameStarted, setGameStarted] = useState(false);
  const [settings, setSettings] = useState<GameSettings>({
    difficulty: 'easy',
    categories: ['PMD', 'REST'],
    itemCount: 10
  });
  const [items, setItems] = useState<WasteItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const startGame = () => {
    setItems(getRandomWasteItems(settings));
    setCurrentIndex(0);
    setScore(0);
    setGameStarted(true);
  };

  const handleSwipe = (direction: "left" | "right") => {
    const currentItem = items[currentIndex];
    const isPMD = currentItem.category === 'PMD';
    const isCorrect = (direction === "right" && isPMD) || (direction === "left" && !isPMD);

    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Goed gedaan!",
        className: "bg-green-500 text-white",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect",
        description: currentItem.explanation,
      });
    }

    setCurrentIndex(prev => prev + 1);
  };

  if (!gameStarted) {
    return (
      <div className="w-full max-w-md mx-auto px-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Moeilijkheidsgraad:</label>
          <Select 
            value={settings.difficulty}
            onValueChange={(value) => 
              setSettings(prev => ({ ...prev, difficulty: value as GameSettings['difficulty'] }))
            }
          >
            <option value="easy">Gemakkelijk</option>
            <option value="medium">Gemiddeld</option>
            <option value="hard">Moeilijk</option>
          </Select>
        </div>

        <Button 
          onClick={startGame}
          className="w-full"
        >
          Start Spel
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <ScoreDisplay current={score} total={currentIndex} />

      <div className="relative h-[400px] mt-8">
        <AnimatePresence>
          {currentIndex < items.length ? (
            <GameCard
              key={items[currentIndex].id}
              item={items[currentIndex]}
              onSwipe={handleSwipe}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Spel afgelopen!</h2>
              <p className="text-xl">Je eindscore: {score} / {items.length}</p>
              <Button
                onClick={() => setGameStarted(false)}
                className="mt-4"
              >
                Nieuw Spel
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}