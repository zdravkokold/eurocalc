import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ResultDisplayProps {
  changeEur: number;
  changeBgn: number;
  hasValidInput: boolean;
}

export function ResultDisplay({ changeEur, changeBgn, hasValidInput }: ResultDisplayProps) {
  const isNegative = changeEur < 0;
  
  return (
    <div className="gradient-card rounded-2xl p-6 border border-border/50 animate-fade-in">
      <div className="text-center space-y-4">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Ресто / Change
        </p>
        
        {!hasValidInput ? (
          <div className="py-6">
            <p className="text-muted-foreground/50 text-lg">
              Въведете сумите за изчисление
            </p>
          </div>
        ) : isNegative ? (
          <div className="py-6 space-y-2">
            <p className="text-bgn-red text-xl font-semibold">
              Недостатъчна сума!
            </p>
            <p className="text-muted-foreground">
              Липсват още: <span className="font-mono font-bold text-bgn-red">€{Math.abs(changeEur).toFixed(2)}</span>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Primary EUR display */}
            <div className="relative">
              <div className="absolute inset-0 bg-eur/10 rounded-xl blur-xl animate-glow-pulse" />
              <div className="relative bg-eur/5 border border-eur/30 rounded-xl py-6 px-4">
                <span className="font-mono text-5xl md:text-6xl font-bold text-eur">
                  €{changeEur.toFixed(2)}
                </span>
              </div>
            </div>
            
            {/* Conversion indicator */}
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm">еквивалент</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </div>
            
            {/* Secondary BGN display */}
            <div className="bg-bgn-green/5 border border-bgn-green/30 rounded-xl py-4 px-4">
              <span className="font-mono text-2xl md:text-3xl font-semibold text-bgn-green">
                {changeBgn.toFixed(2)} лв
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
