import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { Reveal, Counter } from "@/components/site/Reveal";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Newsletter } from "@/components/site/Newsletter";
import { addressOneLine, site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Shanzen Enterprises | Sheridan, Wyoming Supplier" },
      {
        name: "description",
        content:
          "Shanzen Enterprises is a Sheridan, Wyoming distributor of grocery, household and general merchandise, serving households, small retailers and wholesale accounts.",
      },
      { property: "og:title", content: "About Shanzen Enterprises" },
      { property: "og:description", content: "Who we are, how we source, and where we ship from." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A supplier built around repeat orders"
        description="Shanzen Enterprises stocks the everyday grocery and household items people reorder, plus curated general merchandise ranges — shipped from a single warehouse in Sheridan, Wyoming."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-foreground">Who we are</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {site.name} operates as a general-merchandise distributor and retail storefront. Our
              buying team focuses on consumables — coffee, pantry staples, paper goods, cleaning and
              laundry — where consistency matters more than novelty, and supplements those categories
              with personal care, beauty, baby and pet care lines.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Stock is bought through legitimate wholesale channels with documentation retained, held
              in a climate-controlled facility, and inspected before dispatch. Orders received
              before 2:00 PM MT are picked and packed the same business day.
            </p>
            <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Registered address
            </h3>
            <p className="mt-2 text-sm text-foreground">{addressOneLine}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {site.phoneDisplay} · {site.email} · {site.hours}
            </p>
          </Reveal>

          <Reveal delay={90} className="grid grid-cols-2 gap-4 self-start">
            {[
              { to: 74, suffix: "", l: "Active SKUs" },
              { to: 15, suffix: "", l: "Categories stocked" },
              { to: 48, suffix: " states", l: "Shipping coverage" },
              { to: 98, suffix: "%", l: "Same-day dispatch" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <p className="font-display text-3xl font-extrabold text-primary">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            {
              t: "How we source",
              d: "Documented wholesale purchasing with invoices and lot records retained for every purchase order.",
            },
            {
              t: "How we ship",
              d: "Retail-ready units for storefront orders and palletized case quantities for wholesale accounts.",
            },
            {
              t: "How we support",
              d: "One point of contact per account, reachable by phone during business hours — no ticket queues.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 80} className="h-full">
              <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-base font-extrabold text-foreground">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <TrustStrip />
      <Newsletter />
    </>
  );
}
