import { useState } from "react";
import { PhoneCall, X } from "lucide-react";
import { toast } from "sonner";
import { site } from "@/lib/site";

const promos = [
  { label: "20% OFF", sub: "First bundle order", tone: "coral" },
  { label: "Free Shipping", sub: "Orders over $49", tone: "accent" },
  { label: "Secure Checkout", sub: "SSL protected", tone: "primary" },
  { label: "Limited Offer", sub: "Ends Sunday", tone: "amber" },
  { label: "New Arrival", sub: "Fresh in this week", tone: "accent" },
  { label: "Best Seller", sub: "Top 10 restocked", tone: "primary" },
] as const;

const toneClass: Record<string, string> = {
  coral: "bg-coral text-coral-foreground",
  accent: "bg-accent text-accent-foreground",
  primary: "bg-primary text-primary-foreground",
  amber: "bg-amber text-amber-foreground",
};

export function FloatingPromos() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <aside
      aria-label="Current promotions"
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="pointer-events-auto glass relative w-52 space-y-2.5 rounded-2xl p-3 shadow-lift">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide promotions"
          className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-soft hover:text-foreground"
        >
          <X size={13} />
        </button>
        {promos.map((p, i) => (
          <button
            key={p.label}
            type="button"
            onClick={() =>
              toast(`${p.label} — ${p.sub}`, {
                description: "Call us to apply this offer to your order.",
              })
            }
            className={`float-soft flex w-full flex-col items-start rounded-xl px-3 py-2 text-left transition-transform duration-300 hover:scale-[1.03] ${toneClass[p.tone]}`}
            style={{ animationDelay: `${i * 0.45}s` }}
          >
            <span className="font-display text-sm font-extrabold">{p.label}</span>
            <span className="text-[0.68rem] opacity-85">{p.sub}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export function FloatingCall() {
  return (
    <a
      href={site.phoneHref}
      className="cta-pulse fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-amber px-5 py-3.5 text-sm font-bold text-amber-foreground shadow-lift transition-transform hover:-translate-y-0.5 sm:hidden"
    >
      <PhoneCall size={17} />
      Call Now
    </a>
  );
}
