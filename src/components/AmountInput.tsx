import { cn } from "@/lib/utils";

type Currency = "EUR" | "BGN";

interface AmountInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: Currency;
  placeholder?: string;
  className?: string;
}

export function AmountInput({
  label,
  value,
  onChange,
  currency,
  placeholder = "0.00",
  className,
}: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Replace comma with dot for decimal separator (iOS/Android keyboards)
    const val = e.target.value.replace(",", ".");
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d{0,2}$/.test(val) || val === "") {
      onChange(val);
    }
  };

  const symbol = currency === "EUR" ? "€" : "лв";
  const isEur = currency === "EUR";

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <div
        className={cn(
          "relative rounded-xl border-2 transition-all duration-200 overflow-hidden",
          isEur
            ? "border-eur/30 focus-within:border-eur focus-within:glow-eur"
            : "border-bgn-green/30 focus-within:border-bgn-green focus-within:glow-bgn"
        )}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <span
            className={cn(
              "text-2xl font-bold",
              isEur ? "text-eur" : "text-bgn-green"
            )}
          >
            {symbol}
          </span>
        </div>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full bg-card py-5 pl-14 pr-4 text-right font-mono text-3xl font-bold",
            "placeholder:text-muted-foreground/30 focus:outline-none",
            "text-foreground"
          )}
        />
      </div>
    </div>
  );
}
