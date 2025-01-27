import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { WasteItem } from "@/lib/wasteItems";

interface GameCardProps {
  item: WasteItem;
  onSwipe: (direction: "left" | "right") => void;
}

export function GameCard({ item, onSwipe }: GameCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipe("right");
    } else if (info.offset.x < -100) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full"
    >
      <Card className="overflow-hidden shadow-xl">
        <div className="relative aspect-[4/3]">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold">{item.name}</h3>
        </div>
      </Card>
    </motion.div>
  );
}
