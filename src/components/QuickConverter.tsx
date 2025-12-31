import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EXCHANGE_RATE = 1.95583;

export function QuickConverter() {
  const [amount, setAmount] = useState("");
  const [fromEur, setFromEur] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Replace comma with dot for decimal separator (iOS/Android keyboards)
    const val = e.target.value.replace(",", ".");
    if (/^\d*\.?\d{0,2}$/.test(val) || val === "") {
      setAmount(val);
    }
  };

  const toggleDirection = () => {
    setFromEur(!fromEur);
    if (amount) {
      const numAmount = parseFloat(amount);
      if (!isNaN(numAmount)) {
        const converted = fromEur 
          ? (numAmount * EXCHANGE_RATE).toFixed(2)
          : (numAmount / EXCHANGE_RATE).toFixed(2);
        setAmount(converted);
      }
    }
  };

  const numAmount = parseFloat(amount) || 0;
  const converted = fromEur 
    ? (numAmount * EXCHANGE_RATE).toFixed(2)
    : (numAmount / EXCHANGE_RATE).toFixed(2);

  return (
    <div className="bg-card/50 rounded-xl p-4 border border-border/30">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
        Бърз конвертор
      </p>
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <span className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold",
            fromEur ? "text-eur" : "text-bgn-green"
          )}>
            {fromEur ? "€" : "лв"}
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full bg-muted/50 rounded-lg py-3 pl-10 pr-3 font-mono text-lg text-right focus:outline-none focus:ring-1 focus:ring-eur/50"
          />
        </div>
        
        <button
          onClick={toggleDirection}
          className="p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
        >
          <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <div className="flex-1 relative">
          <span className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold",
            fromEur ? "text-bgn-green" : "text-eur"
          )}>
            {fromEur ? "лв" : "€"}
          </span>
          <div className="w-full bg-muted/30 rounded-lg py-3 pl-10 pr-3 font-mono text-lg text-right text-muted-foreground">
            {amount ? converted : "0.00"}
          </div>
        </div>
      </div>
    </div>
  );
}
