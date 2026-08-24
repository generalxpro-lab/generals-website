import { BadgeCheck, Headphones, Lock, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { icon: ShieldCheck, title: "Secure Shopping", text: "Encrypted browsing end to end" },
  { icon: Lock, title: "SSL Protected", text: "TLS 1.3 on every page" },
  { icon: RotateCcw, title: "Money Back Guarantee", text: "30-day no-hassle returns" },
  { icon: Truck, title: "Fast Shipping", text: "Same-day pick and pack" },
  { icon: Headphones, title: "Customer Support", text: "Real people, Mon–Fri MT" },
  { icon: BadgeCheck, title: "Satisfaction Guarantee", text: "Replaced or refunded" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why shop with us" className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-10 sm:grid-cols-3 lg:grid-cols-6 lg:px-8">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 60} className="flex min-w-0 items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <it.icon size={19} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground">{it.title}</span>
              <span className="block text-xs text-muted-foreground">{it.text}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
