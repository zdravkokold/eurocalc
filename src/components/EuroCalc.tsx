import { useState, useMemo } from "react";
import { CurrencyToggle } from "./CurrencyToggle";
import { AmountInput } from "./AmountInput";
import { ResultDisplay } from "./ResultDisplay";
import { AIExplanation } from "./AIExplanation";
import { QuickConverter } from "./QuickConverter";
import { Calculator, RefreshCw } from "lucide-react";

type Currency = "EUR" | "BGN";
const EXCHANGE_RATE = 1.95583;

export function EuroCalc() {
  const [priceCurrency, setPriceCurrency] = useState<Currency>("EUR");
  const [receivedCurrency, setReceivedCurrency] = useState<Currency>("BGN");
  const [priceValue, setPriceValue] = useState("");
  const [receivedValue, setReceivedValue] = useState("");

  const calculations = useMemo(() => {
    const price = parseFloat(priceValue) || 0;
    const received = parseFloat(receivedValue) || 0;

    // Convert everything to EUR
    const priceInEur = priceCurrency === "EUR" ? price : price / EXCHANGE_RATE;
    const receivedInEur = receivedCurrency === "EUR" ? received : received / EXCHANGE_RATE;

    // Calculate change in EUR
    const changeEur = Math.round((receivedInEur - priceInEur) * 100) / 100;
    const changeBgn = Math.round(changeEur * EXCHANGE_RATE * 100) / 100;

    return {
      priceInEur,
      receivedInEur,
      changeEur,
      changeBgn,
    };
  }, [priceValue, receivedValue, priceCurrency, receivedCurrency]);

  const hasValidInput = parseFloat(priceValue) > 0 && parseFloat(receivedValue) > 0;

  const handleReset = () => {
    setPriceValue("");
    setReceivedValue("");
    setPriceCurrency("EUR");
    setReceivedCurrency("BGN");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background glow effect */}
      <div className="fixed inset-0 gradient-glow pointer-events-none" />
      
      <div className="relative max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <header className="text-center space-y-2 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">
            Калкулатор за ресто
          </h1>
          <p className="text-sm text-muted-foreground">
            Преходен период EUR ↔ BGN • Курс: 1.95583
          </p>
        </header>

        {/* Price Section */}
        <section className="space-y-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Валута на сметката</span>
          </div>
          <CurrencyToggle value={priceCurrency} onChange={setPriceCurrency} />
          <AmountInput
            label="Сума на сметката"
            value={priceValue}
            onChange={setPriceValue}
            currency={priceCurrency}
          />
        </section>

        {/* Received Section */}
        <section className="space-y-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Валута на плащане</span>
          </div>
          <CurrencyToggle value={receivedCurrency} onChange={setReceivedCurrency} />
          <AmountInput
            label="Получена сума"
            value={receivedValue}
            onChange={setReceivedValue}
            currency={receivedCurrency}
          />
        </section>

        {/* Result Display */}
        <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <ResultDisplay
            changeEur={calculations.changeEur}
            changeBgn={calculations.changeBgn}
            hasValidInput={hasValidInput}
          />
        </section>

        {/* AI Explanation */}
        <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <AIExplanation
            priceValue={parseFloat(priceValue) || 0}
            priceCurrency={priceCurrency}
            receivedValue={parseFloat(receivedValue) || 0}
            receivedCurrency={receivedCurrency}
            changeEur={calculations.changeEur}
            hasValidInput={hasValidInput}
          />
        </section>

        {/* Quick Converter */}
        <section className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <QuickConverter />
        </section>

        {/* Reset Button */}
        <section className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="font-medium">Изчисти всичко</span>
          </button>
        </section>

        {/* Footer */}
        <footer className="text-center pt-4 animate-fade-in" style={{ animationDelay: "0.7s" }}>
      <p className="text-xs text-muted-foreground/60">
        Разработено от{" "}
        <a 
          href="https://www.linkedin.com/in/zdravkokold/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium hover:text-primary transition-colors underline underline-offset-2"
        >
          Здравко Колджиев
        </a>
      </p>
    </footer>
      </div>
    </div>
  );
}
