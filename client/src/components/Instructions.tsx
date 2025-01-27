import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ArrowLeftCircle, ArrowRightCircle, Keyboard } from "lucide-react";

export function Instructions() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-center">Hoe te spelen?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-center">
            Sorteer het afval in de juiste categorie:
          </p>
          <div className="flex justify-around text-center">
            <div className="flex flex-col items-center">
              <ArrowLeftCircle className="w-8 h-8 text-destructive" />
              <p className="mt-2">Veeg links<br />voor niet-PMD</p>
              <p className="text-sm text-muted-foreground">
                (of ← pijltje)
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ArrowRightCircle className="w-8 h-8 text-primary" />
              <p className="mt-2">Veeg rechts<br />voor PMD</p>
              <p className="text-sm text-muted-foreground">
                (of → pijltje)
              </p>
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            PMD = Plastic verpakkingen, Metalen verpakkingen en Drankkartons
          </p>
        </div>
      </CardContent>
    </Card>
  );
}