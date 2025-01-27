import { useState } from "react";
import { GameCard } from "./GameCard";
import { ScoreDisplay } from "./ScoreDisplay";
import { getRandomWasteItems, type WasteItem } from "@/lib/wasteItems";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export function GameContainer() {
  const [items] = useState<WasteItem[]>(() => getRandomWasteItems(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const handleSwipe = (direction: "left" | "right") => {
    const isPMD = items[currentIndex].isPMD;
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
        title: "Incorrect",
        description: `Dit is ${isPMD ? "wel" : "geen"} PMD afval.`,
        variant: "destructive",
      });
    }

    setCurrentIndex(prev => prev + 1);
  };

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
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
              >
                Opnieuw spelen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
