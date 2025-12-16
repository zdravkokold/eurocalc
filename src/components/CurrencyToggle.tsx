import { cn } from "@/lib/utils";

type Currency = "EUR" | "BGN";

interface CurrencyToggleProps {
  value: Currency;
  onChange: (currency: Currency) => void;
  className?: string;
}

export function CurrencyToggle({ value, onChange, className }: CurrencyToggleProps) {
  return (
    <div className={cn("flex rounded-lg bg-muted p-1", className)}>
      <button
        type="button"
        onClick={() => onChange("EUR")}
        className={cn(
          "flex-1 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200",
          value === "EUR"
            ? "bg-eur text-primary-foreground shadow-lg glow-eur"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="flex items-center justify-center gap-1.5">
          <span className="text-lg">€</span>
          <span>EUR</span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => onChange("BGN")}
        className={cn(
          "flex-1 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200",
          value === "BGN"
            ? "bg-bgn-green text-primary-foreground shadow-lg glow-bgn"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="flex items-center justify-center gap-1.5">
          <span className="text-lg">лв</span>
          <span>BGN</span>
        </span>
      </button>
    </div>
  );
}
