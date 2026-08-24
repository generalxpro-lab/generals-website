import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { PageHero, Section } from "@/components/site/Section";
import { ProductGrid } from "@/components/site/ProductCard";
import { categories, products, type CategoryKey } from "@/data/catalog";
import { brands } from "@/data/brands";

const searchSchema = z.object({
  cat: z.string().optional(),
  q: z.string().optional(),
});


export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop All Products | Shanzen Enterprises" },
      {
        name: "description",
        content:
          "Browse the full Shanzen Enterprises catalog: grocery, snacks, beverages, household, cleaning, personal care, beauty, baby and pet care.",
      },
      { property: "og:title", content: "Shop All Products | Shanzen Enterprises" },
      {
        property: "og:description",
        content: "Filter grocery, household and general merchandise products by brand, category, price, rating and availability.",
      },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

const sorts = {
  featured: "Recommended",
  popularity: "Most popular",
  newest: "Newest",
  priceAsc: "Price: low to high",
  priceDesc: "Price: high to low",
  rating: "Highest rated",
  discount: "Biggest discount",
} as const;

type SortKey = keyof typeof sorts;

function Shop() {
  const { cat, q } = Route.useSearch();
  const [sort, setSort] = useState<SortKey>("featured");
  const [maxPrice, setMaxPrice] = useState(60);
  const [minRating, setMinRating] = useState(0);
  const [brand, setBrand] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const items = useMemo(() => {
    const term = (q ?? "").trim().toLowerCase();
    let list = products.filter(
      (p) =>
        (!cat || p.category === (cat as CategoryKey)) &&
        (!brand || p.brandSlug === brand) &&
        (!inStockOnly || p.stock > 0) &&
        p.price <= maxPrice &&
        p.rating >= minRating &&
        (!term ||
          `${p.name} ${p.brand} ${p.categoryName} ${p.size} ${p.variant} ${p.short}`
            .toLowerCase()
            .includes(term)),
    );
    list = [...list];
    if (sort === "popularity") list.sort((a, b) => b.reviewCount - a.reviewCount);
    if (sort === "newest") list.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "discount") list.sort((a, b) => b.discount - a.discount);
    return list;
  }, [cat, q, sort, maxPrice, minRating, brand, inStockOnly]);


  const activeCat = categories.find((c) => c.key === cat);

  return (
    <>
      <PageHero
        eyebrow="Full catalog"
        title={activeCat ? activeCat.name : "Shop every aisle"}
        description={
          activeCat
            ? activeCat.blurb
            : "Grocery and household staples plus curated general merchandise — all in retail-ready packaging, shipped from Sheridan, Wyoming."
        }
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="space-y-6 lg:sticky lg:top-40 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Category
              </h2>
              <ul className="mt-3 space-y-1 text-sm">
                <li>
                  <Link
                    to="/shop"
                    search={{ q, cat: undefined }}
                    className={`block rounded-lg px-3 py-2 font-semibold ${
                      !cat ? "bg-accent/10 text-accent" : "text-foreground/80 hover:text-accent"
                    }`}
                  >
                    All products ({products.length})
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.key}>
                    <Link
                      to="/shop"
                      search={{ q, cat: c.key }}
                      className={`block rounded-lg px-3 py-2 font-medium ${
                        cat === c.key
                          ? "bg-accent/10 font-semibold text-accent"
                          : "text-foreground/80 hover:text-accent"
                      }`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div>
                <label
                  htmlFor="price"
                  className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Max price
                </label>
                <input
                  id="price"
                  type="range"
                  min={6}
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

              <div>
                <label
                  htmlFor="brand"
                  className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Brand
                </label>
                <select
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold"
                >
                  <option value="">All brands</option>
                  {brands.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

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
                <span className="font-semibold text-foreground">{items.length}</span> products
                {q ? ` matching “${q}”` : ""}
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
                No products match these filters. Try widening the price range or clearing the search.
              </p>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
