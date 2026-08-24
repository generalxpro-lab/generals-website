import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PhoneCall } from "lucide-react";
import heroGrocery from "@/assets/hero-grocery.jpg";
import heroHousehold from "@/assets/hero-household.jpg";
import heroMixed from "@/assets/hero-mixed.jpg";
import { site } from "@/lib/site";

const slides = [
  {
    image: heroGrocery,
    eyebrow: "Grocery restock, simplified",
    title: "Everyday essentials at case pricing",
    text: "Coffee, pantry staples, snacks and beverages from a single supplier — picked, packed and shipped the same business day.",
    cta: "Shop groceries",
    to: "/categories" as const,
  },
  {
    image: heroHousehold,
    eyebrow: "Household & cleaning",
    title: "Keep every room stocked for less",
    text: "Paper goods, laundry, dish and surface care in family and bulk sizes, priced for households that buy ahead.",
    cta: "Browse household",
    to: "/shop" as const,
  },
  {
    image: heroMixed,
    eyebrow: "General merchandise",
    title: "Care, beauty and pet ranges",
    text: "Personal care, skincare, baby and pet care — curated ranges, honest pricing.",
    cta: "See this week's deals",
    to: "/deals" as const,
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => window.clearInterval(id);
  }, []);

  const slide = slides[index] ?? slides[0]!;

  return (
    <section aria-label="Featured promotions" className="relative isolate overflow-hidden">
      <div className="brand-gradient relative min-h-[32rem] sm:min-h-[34rem]">
        {slides.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            alt=""
            aria-hidden="true"
            width={1600}
            height={900}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-40" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
          <div className="min-w-0 max-w-2xl">
            <span className="inline-block rounded-full bg-primary-foreground/10 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-primary-foreground/85">
              {slide.eyebrow}
            </span>
            <h1
              key={slide.title}
              className="animate-fade-in mt-5 text-3xl font-extrabold leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl"
            >
              {slide.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
              {slide.text}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={slide.to}
                className="cta-pulse inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 text-sm font-bold text-amber-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                {slide.cta}
                <ArrowRight size={16} />
              </Link>
              <a
                href={site.phoneHref}
                className="glass-dark inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                <PhoneCall size={16} />
                Call Now
              </a>
            </div>

            <div className="mt-10 flex gap-2" role="tablist" aria-label="Hero slides">
              {slides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index
                      ? "w-10 bg-amber"
                      : "w-5 bg-primary-foreground/35 hover:bg-primary-foreground/60"
                  }`}
                />
              ))}
            </div>
          </div>

          <aside className="glass-dark hidden self-center rounded-2xl p-6 lg:block">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-amber">
              Limited-time offer
            </p>
            <p className="mt-3 font-display text-3xl font-extrabold text-primary-foreground">
              20% off
            </p>
            <p className="mt-1 text-sm text-primary-foreground/80">
              First order on grocery and household bundles over $75.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-primary-foreground/85">
              <li>Free shipping over $49</li>
              <li>Same-day pick &amp; pack</li>
              <li>30-day money back</li>
            </ul>
            <Link
              to="/deals"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary-foreground/95 px-4 py-2.5 text-sm font-bold text-primary transition-transform hover:-translate-y-0.5"
            >
              View offer details
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
