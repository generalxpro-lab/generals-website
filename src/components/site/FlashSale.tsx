import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { pick } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

function useCountdown() {
  const [left, setLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const tick = () => {
      const diff = Math.max(0, end.getTime() - Date.now());
      setLeft({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return left;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function FlashSale() {
  const { h, m, s } = useCountdown();
  const items = pick((p) => p.onDeal, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <div className="brand-gradient grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 sm:flex sm:flex-wrap sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-coral text-coral-foreground">
              <Flame size={20} />
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-extrabold text-primary-foreground sm:text-xl">
                Flash sale — today only
              </h2>
              <p className="text-xs text-primary-foreground/75">
                Deepest discounts of the week, while stock lasts
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2" aria-label="Time remaining">
            {[
              { v: h, l: "hrs" },
              { v: m, l: "min" },
              { v: s, l: "sec" },
            ].map((t) => (
              <span
                key={t.l}
                className="glass-dark flex w-14 flex-col items-center rounded-xl px-2 py-1.5 text-primary-foreground"
              >
                <span className="font-display text-lg font-extrabold tabular-nums">{pad(t.v)}</span>
                <span className="text-[0.6rem] uppercase tracking-wide opacity-75">{t.l}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="border-t border-border px-6 py-4 text-center">
          <Link to="/deals" className="text-sm font-semibold text-accent hover:underline">
            See all weekly deals
          </Link>
        </div>
      </div>
    </section>
  );
}
