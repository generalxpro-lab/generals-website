import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { ProductGrid } from "@/components/site/ProductCard";
import { Section, SectionHeader } from "@/components/site/Section";
import { TrustStrip } from "@/components/site/TrustStrip";
import { OrderTracker } from "@/components/site/OrderTracker";
import { products, categories } from "@/data/catalog";
import { useCustomer } from "@/lib/customer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shanzen Enterprises | Shop Grocery, Household & More" },
      { name: "description", content: "Shop grocery, household, beauty, baby and pet essentials from Shanzen Enterprises." },
      { property: "og:title", content: "Shanzen Enterprises | Shop Grocery, Household & More" },
      { property: "og:description", content: "Browse featured products, categories and everyday essentials." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 8);
  const deals = products.filter((p) => p.discount > 0 || p.onDeal).slice(0, 4);
  const { customer } = useCustomer();

  return (
    <>
      <section className="brand-gradient text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            {customer && <p className="mb-3 text-sm font-bold text-amber">Welcome back, {customer.firstName}.</p>}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber">Everyday essentials</p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Shop trusted essentials without the hassle.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">Browse grocery, household, beauty, baby and pet products in one simple storefront.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-3 text-sm font-extrabold text-amber-foreground shadow-soft transition-transform hover:-translate-y-0.5">Shop all products <ArrowRight size={16} /></Link>
              <Link to="/deals" className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/15">View deals</Link>
            </div>
          </div>
          <div className="hidden min-h-72 rounded-3xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 lg:flex lg:flex-col lg:justify-end">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber">Shop by need</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {categories.slice(0, 6).map((c) => <Link key={c.key} to="/shop" search={{ cat: c.key, q: undefined }} className="rounded-2xl border border-primary-foreground/15 bg-background/10 p-4 text-sm font-bold transition-colors hover:bg-background/20">{c.name}</Link>)}
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <Section>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow="Shop popular" title="Featured products" description="A curated selection from the current catalog." />
          <div className="flex gap-2">
            <Link to="/wishlist" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-primary shadow-soft hover:border-accent hover:text-accent"><Heart size={16} /> Wishlist</Link>
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-accent">Shop all <ArrowRight size={16} /></Link>
          </div>
        </div>
        <ProductGrid items={featured} />
      </Section>

      <section className="bg-secondary/50">
        <Section>
          <div className="mb-6 flex items-end justify-between gap-4"><SectionHeader eyebrow="Save on selected items" title="Today's deals" description="Check the current catalog for products marked down or promoted." /><Link to="/deals" className="hidden items-center gap-1 text-sm font-bold text-accent sm:inline-flex">All deals <ArrowRight size={15} /></Link></div>
          {deals.length ? <ProductGrid items={deals} /> : <div className="rounded-2xl border border-border bg-card p-8 text-center"><ShoppingBag className="mx-auto text-accent" /><p className="mt-3 text-sm font-semibold text-foreground">New deals are coming soon.</p><p className="mt-1 text-sm text-muted-foreground">Browse the full catalog in the meantime.</p></div>}
        </Section>
      </section>

      <OrderTracker />
    </>
  );
}
