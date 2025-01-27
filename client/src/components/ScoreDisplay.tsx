import { Progress } from "@/components/ui/progress";

interface ScoreDisplayProps {
  current: number;
  total: number;
}

export function ScoreDisplay({ current, total }: ScoreDisplayProps) {
  const percentage = total === 0 ? 0 : (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Score</span>
        <span className="text-sm font-medium">{current} / {total}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
