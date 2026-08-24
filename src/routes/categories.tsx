import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { Newsletter } from "@/components/site/Newsletter";
import { categories, countByCategory } from "@/data/catalog";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Product Categories | Shanzen Enterprises" },
      {
        name: "description",
        content:
          "Explore all Shanzen Enterprises categories — grocery and pantry, household essentials, cleaning supplies, personal care, beauty, baby care and pet care.",
      },
      { property: "og:title", content: "Product Categories | Shanzen Enterprises" },
      { property: "og:description", content: "Fifteen categories spanning grocery, household and general merchandise." },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: Categories,
});

function Categories() {
  return (
    <>
      <PageHero
        eyebrow="Categories"
        title="Fifteen aisles, one purchase order"
        description="Grocery and household lines anchor our catalog, with general merchandise ranges added where customers asked us to consolidate suppliers."
      />
      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.key} as="li" delay={i * 40}>
              <Link
                to="/shop"
                search={{ cat: c.key, q: undefined }}
                className="hover-lift zoom-media group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
              >
                <span className="block aspect-[16/10] overflow-hidden bg-secondary">
                  <img
                    src={c.image}
                    alt={c.name}
                    width={900}
                    height={560}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    {countByCategory(c.key)} products
                  </span>
                  <span className="mt-2 text-lg font-extrabold text-foreground group-hover:text-accent">
                    {c.name}
                  </span>
                  <span className="mt-1.5 flex-1 text-sm text-muted-foreground">{c.blurb}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-accent">
                    Browse category <ArrowRight size={15} />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>
      <Newsletter />
    </>
  );
}
