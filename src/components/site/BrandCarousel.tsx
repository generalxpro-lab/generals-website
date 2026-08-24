import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { brands } from "@/data/brands";
import { BrandCard } from "./BrandCard";
import { Reveal } from "./Reveal";

export function BrandCarousel() {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    track.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <Reveal>
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0 max-w-2xl">
          <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-accent">
            Featured brands
          </span>
          <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">Featured Brands</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Brand names are the trademarks of their respective owners and are shown here for
            identification only. Shanzen Enterprises is not an authorized distributor, retailer,
            partner or supplier for any brand listed.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll brands left"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll brands right"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {brands.map((b) => (
          <div key={b.slug} className="w-[15rem] shrink-0 snap-start">
            <BrandCard brand={b} />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          to="/brands"
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          View All Brands →
        </Link>
      </div>
    </Reveal>
  );
}
