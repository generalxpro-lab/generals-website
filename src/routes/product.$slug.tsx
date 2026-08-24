import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Check,
  ChevronRight,
  Phone,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { ProductGrid } from "@/components/site/ProductCard";
import { Stars } from "@/components/site/Stars";
import { Reveal } from "@/components/site/Reveal";
import { ReviewCard } from "@/components/site/ReviewList";
import { PaymentIcons } from "@/components/site/PaymentIcons";
import {
  alsoBought,
  categoryMap,
  featuresFor,
  money,
  moreFromBrand,
  productMap,

  relatedTo,
  similarItems,
  specsFor,
  stockLabel,
} from "@/data/catalog";
import { reviews } from "@/data/reviews";
import { site } from "@/lib/site";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = productMap[params.slug];
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found | Shanzen Enterprises" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    const title = `${p.name} | ${site.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: `${p.short} ${p.categoryName} from ${p.brand}, ${money(p.price)} at Shanzen Enterprises.` },
        { property: "og:title", content: title },
        { property: "og:description", content: p.short },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            brand: { "@type": "Brand", name: p.brand },
            description: p.short,
            sku: p.id,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: p.rating,
              reviewCount: p.reviewCount,
            },
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "USD",
              availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const p = product as import("@/data/catalog").Product;
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const gallery = [p.image, ...relatedTo(p, 3).map((r) => r.image), categoryMap[p.category].image]
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 4);
  const [active, setActive] = useState(0);
  const stock = stockLabel(p.stock);
  const specs = specsFor(p);
  const features = featuresFor(p);
  const productReviews = reviews.filter((_, i) => i % 2 === 0).slice(0, 4);

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-8 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
          </li>
          <ChevronRight size={12} aria-hidden="true" />
          <li>
            <Link to="/shop" search={{ cat: undefined, q: undefined }} className="hover:text-accent">
              Shop
            </Link>
          </li>
          <ChevronRight size={12} aria-hidden="true" />
          <li>
            <Link to="/shop" search={{ cat: p.category, q: undefined }} className="hover:text-accent">
              {p.categoryName}
            </Link>
          </li>
          <ChevronRight size={12} aria-hidden="true" />
          <li className="max-w-[16rem] truncate font-semibold text-foreground">{p.name}</li>
        </ol>
      </nav>

      <Section className="py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div
              className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-secondary shadow-soft"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setOrigin(
                  `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
                );
              }}
            >
              <img
                src={gallery[active]}
                alt={p.name}
                width={1024}
                height={1024}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300"
                style={{ transformOrigin: origin, transform: zoom ? "scale(1.9)" : "scale(1)" }}
              />
              {p.discount > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-coral px-3 py-1 text-xs font-bold text-coral-foreground">
                  -{p.discount}%
                </span>
              )}
              <span className="glass absolute bottom-4 right-4 rounded-full px-3 py-1 text-[0.68rem] font-semibold text-foreground">
                Hover to zoom
              </span>
            </div>
            <ul className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <li key={g + i}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={active === i}
                    className={`block w-full overflow-hidden rounded-xl border-2 transition-colors ${
                      active === i ? "border-accent" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <img
                      src={g}
                      alt=""
                      width={200}
                      height={200}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square h-full w-full object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <Link
              to="/brands/$slug"
              params={{ slug: p.brandSlug }}
              className="text-xs font-bold uppercase tracking-[0.18em] text-accent hover:underline"
            >
              {p.brand}
            </Link>
            <h1 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">{p.name}</h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {p.size} · {p.variant}
            </p>


            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Stars rating={p.rating} size={17} />
              <span className="text-sm font-semibold text-foreground">{p.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">
                {p.reviewCount.toLocaleString("en-US")} reviews
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-end gap-3">
              <span className="font-display text-4xl font-extrabold text-primary">{money(p.price)}</span>
              <span className="text-lg text-muted-foreground line-through">{money(p.oldPrice)}</span>
              <span className="rounded-full bg-success/12 px-3 py-1 text-xs font-bold text-success">
                Save {money(p.oldPrice - p.price)} ({p.discount}%)
              </span>
            </div>

            <p
              className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${
                stock.tone === "in" ? "text-success" : stock.tone === "low" ? "text-coral" : "text-muted-foreground"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
              {stock.text}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.short}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/checkout"
                search={{ product: p.slug }}
                className="cta-pulse inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition-all hover:-translate-y-0.5 hover:brightness-110"
              >
                <ShoppingBag size={16} /> Buy now
              </Link>
              <button
                type="button"
                onClick={() => toast.success("Added to cart", { description: "Continue to checkout or call us to complete your order." })}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent"
              >
                Add to cart
              </button>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-bold text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <Phone size={16} /> Call to order
              </a>
            </div>


            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Truck, t: "Ships same day", s: "Orders before 2 PM MT" },
                { icon: RotateCcw, t: "30-day returns", s: "Unopened, in packaging" },
                { icon: ShieldCheck, t: "Secure shopping", s: "SSL protected" },
              ].map((b) => (
                <li key={b.t} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <b.icon size={17} className="text-accent" aria-hidden="true" />
                  <p className="mt-2 text-sm font-bold text-foreground">{b.t}</p>
                  <p className="text-xs text-muted-foreground">{b.s}</p>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Accepted payment methods
              </p>
              <PaymentIcons className="mt-3" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="text-lg font-extrabold text-foreground">Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {p.name} from {p.brand} is part of our {p.categoryName.toLowerCase()} range, stocked for
              households and small retailers that reorder the same dependable items week after week.
              {" "}
              {p.short} Every unit is stored in a climate-controlled facility and inspected before it
              leaves our Sheridan warehouse.
            </p>
            <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Features
            </h3>
            <ul className="mt-3 space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
                  <Check size={16} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="text-lg font-extrabold text-foreground">Specifications</h2>
            <dl className="mt-3 divide-y divide-border">
              {specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-2.5">
                  <dt className="text-sm font-semibold text-foreground">{s.label}</dt>
                  <dd className="min-w-0 text-sm text-muted-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Shipping information
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Standard ground delivery runs 2–5 business days across the contiguous United States.
              Orders over $75 ship free; below that, flat-rate shipping is $6.95. Case quantities move
              on pallets with a freight quote provided before dispatch.
            </p>

            <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Return policy
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Return unopened items in original packaging within 30 days for a full refund. Damaged or
              short shipments are replaced at no cost when reported within 48 hours of delivery.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeader eyebrow="Related products" title={`More in ${p.categoryName}`} />
        <ProductGrid items={relatedTo(p, 4)} />
      </Section>

      <Section className="pt-0">
        <SectionHeader eyebrow="Same brand" title={`More from ${p.brand}`} />
        <ProductGrid items={moreFromBrand(p, 4)} />
      </Section>
      <Section className="pt-0">
        <SectionHeader eyebrow="Customers also bought" title="Frequently added together" />
        <ProductGrid items={alsoBought(p, 4)} />
      </Section>

      <Section className="pt-0">
        <SectionHeader eyebrow="Similar items" title="Comparable price and size" />
        <ProductGrid items={similarItems(p, 4)} />
      </Section>

      <Section className="pt-0">
        <SectionHeader
          eyebrow="Customer feedback"
          title="What buyers say"
          linkTo="/reviews"
          linkLabel="All reviews"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {productReviews.map((r, i) => (
            <ReviewCard key={r.id} review={r} delay={i * 70} />
          ))}
        </div>
      </Section>
    </>
  );
}
