import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { ProductGrid } from "@/components/site/ProductCard";
import { BrandCard } from "@/components/site/BrandCard";
import { brandMap, brands } from "@/data/brands";
import { byBrand, categoryMap, type CategoryKey } from "@/data/catalog";

export const Route = createFileRoute("/brands/$slug")({
  loader: ({ params }) => {
    const brand = brandMap[params.slug];
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Brand not found | Shanzen Enterprises" }, { name: "robots", content: "noindex" }],
      };
    }
    const { brand } = loaderData;
    const title = `${brand.name} Collection | Shanzen Enterprises`;
    return {
      meta: [
        { title },
        { name: "description", content: brand.description },
        { property: "og:title", content: title },
        { property: "og:description", content: brand.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/brands/${brand.slug}` }],
    };
  },
  notFoundComponent: BrandNotFound,
  component: BrandCollection,
});

const sorts = {
  popularity: "Most popular",
  newest: "Newest",
  priceAsc: "Price: low to high",
  priceDesc: "Price: high to low",
  rating: "Highest rated",
} as const;
type SortKey = keyof typeof sorts;

function BrandCollection() {
  const { brand } = Route.useLoaderData();
  const base = byBrand(brand.slug);

  const [sort, setSort] = useState<SortKey>("popularity");
  const [cat, setCat] = useState<CategoryKey | "">("");
  const [maxPrice, setMaxPrice] = useState(60);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const cats = useMemo(
    () => [...new Set(base.map((p) => p.category))] as CategoryKey[],
    [base],
  );

  const items = useMemo(() => {
    const list = base.filter(
      (p) =>
        (!cat || p.category === cat) &&
        p.price <= maxPrice &&
        p.rating >= minRating &&
        (!inStockOnly || p.stock > 0),
    );
    const sorted = [...list];
    if (sort === "popularity") sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    if (sort === "newest") sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    if (sort === "priceAsc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [base, cat, maxPrice, minRating, inStockOnly, sort]);

  const others = brands.filter((b) => b.slug !== brand.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Featured Brands"
        title={brand.name}
        description={brand.description}
      />

      <Section>
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-border bg-secondary font-display text-base font-extrabold tracking-[0.08em] text-primary">
            {brand.mark}
          </span>
          <div className="min-w-0">
            <p className="font-display text-xl font-extrabold text-foreground">{brand.name}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {brand.tagline} · {base.length} products
            </p>
          </div>
          <p className="w-full text-xs text-muted-foreground sm:ml-auto sm:w-auto sm:max-w-sm sm:text-right">
            Brand name shown for identification only and remains the trademark of its owner. Shanzen
            Enterprises is not an authorized distributor, retailer, partner or supplier for it.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="space-y-6 lg:sticky lg:top-40 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Category
              </h2>
              <ul className="mt-3 space-y-1 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => setCat("")}
                    className={`block w-full rounded-lg px-3 py-2 text-left font-semibold ${
                      !cat ? "bg-accent/10 text-accent" : "text-foreground/80 hover:text-accent"
                    }`}
                  >
                    All products ({base.length})
                  </button>
                </li>
                {cats.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => setCat(c)}
                      className={`block w-full rounded-lg px-3 py-2 text-left font-medium ${
                        cat === c
                          ? "bg-accent/10 font-semibold text-accent"
                          : "text-foreground/80 hover:text-accent"
                      }`}
                    >
                      {categoryMap[c].name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div>
                <label
                  htmlFor="brand-price"
                  className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Max price
                </label>
                <input
                  id="brand-price"
                  type="range"
                  min={4}
                  max={60}
                  step={2}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="mt-3 w-full accent-[var(--accent)]"
                />
                <p className="mt-1 text-sm text-foreground">Up to ${maxPrice}</p>
              </div>

              <fieldset>
                <legend className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Minimum rating
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[0, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setMinRating(r)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                        minRating === r
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-foreground/80"
                      }`}
                    >
                      {r === 0 ? "Any" : `${r}+ stars`}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                In stock only
              </label>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
              <p className="min-w-0 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{items.length}</span> products in
                this collection
              </p>
              <label className="shrink-0 text-sm">
                <span className="sr-only">Sort products</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold shadow-soft"
                >
                  {Object.entries(sorts).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {items.length ? (
              <ProductGrid items={items} />
            ) : (
              <p className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
                No products match these filters. Try widening the price range.
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeader
          eyebrow="Keep browsing"
          title="Other featured brands"
          linkTo="/brands"
          linkLabel="View All Brands →"
        />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {others.map((b) => (
            <BrandCard key={b.slug} brand={b} />
          ))}
        </div>
      </Section>
    </>
  );
}

function BrandNotFound() {
  return (
    <Section className="text-center">
      <h1 className="text-3xl font-extrabold text-foreground">Brand not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That collection does not exist in our catalog.
      </p>
      <Link
        to="/brands"
        className="mt-6 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        View all brands
      </Link>
    </Section>
  );
}
