import { cn } from "@/lib/utils";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface AIExplanationProps {
  priceValue: number;
  priceCurrency: "EUR" | "BGN";
  receivedValue: number;
  receivedCurrency: "EUR" | "BGN";
  changeEur: number;
  hasValidInput: boolean;
}

const EXCHANGE_RATE = 1.95583;

export function AIExplanation({
  priceValue,
  priceCurrency,
  receivedValue,
  receivedCurrency,
  changeEur,
  hasValidInput,
}: AIExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!hasValidInput || changeEur < 0) {
    return null;
  }

  const priceInEur = priceCurrency === "EUR" ? priceValue : priceValue / EXCHANGE_RATE;
  const receivedInEur = receivedCurrency === "EUR" ? receivedValue : receivedValue / EXCHANGE_RATE;
  
  const priceSymbol = priceCurrency === "EUR" ? "€" : "лв";
  const receivedSymbol = receivedCurrency === "EUR" ? "€" : "лв";

  const generateExplanation = () => {
    const lines: string[] = [];
    
    // Line 1: What you paid
    if (receivedCurrency === "BGN") {
      lines.push(
        `Платихте ${receivedValue.toFixed(2)} ${receivedSymbol}, което е равно на €${receivedInEur.toFixed(2)} по фиксирания курс 1.95583.`
      );
    } else {
      lines.push(`Платихте €${receivedValue.toFixed(2)}.`);
    }
    
    // Line 2: The bill
    if (priceCurrency === "BGN") {
      lines.push(
        `Сметката е ${priceValue.toFixed(2)} ${priceSymbol} (€${priceInEur.toFixed(2)}).`
      );
    } else {
      lines.push(`Сметката е €${priceValue.toFixed(2)}.`);
    }
    
    // Line 3: The change
    lines.push(
      `Вашето ресто е €${changeEur.toFixed(2)} (${(changeEur * EXCHANGE_RATE).toFixed(2)} лв).`
    );
    
    return lines;
  };

  const explanationLines = generateExplanation();

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl",
          "bg-accent/50 hover:bg-accent transition-colors duration-200",
          "text-left group"
        )}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-eur" />
          <span className="font-medium text-foreground">Обясни ми изчислението</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-3 p-4 rounded-xl bg-card border border-border/50 animate-scale-in">
          <div className="space-y-2">
            {explanationLines.map((line, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {line}
              </p>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground/70">
              Официален фиксиран курс: <span className="font-mono font-semibold">1 EUR = 1.95583 BGN</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
