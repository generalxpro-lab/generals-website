import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { ProductGrid } from "@/components/site/ProductCard";
import { FlashSale } from "@/components/site/FlashSale";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Newsletter } from "@/components/site/Newsletter";
import { pick, products } from "@/data/catalog";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Weekly Deals & Flash Sale | Shanzen Enterprises" },
      {
        name: "description",
        content:
          "Current Shanzen Enterprises promotions: flash sale pricing, 20% bundle savings on grocery and household, clearance items and free shipping over $75.",
      },
      { property: "og:title", content: "Weekly Deals & Flash Sale | Shanzen Enterprises" },
      { property: "og:description", content: "Flash sale pricing and weekly markdowns across grocery, household and general merchandise." },
      { property: "og:url", content: "/deals" },
    ],
    links: [{ rel: "canonical", href: "/deals" }],
  }),
  component: Deals,
});

function Deals() {
  const deep = products.filter((p) => p.discount >= 25);
  const midDeals = products.filter((p) => p.discount >= 18 && p.discount < 25).slice(0, 8);
  const clearance = pick((p) => p.stock < 70 && p.discount >= 15, 4);

  return (
    <>
      <PageHero
        eyebrow="Limited-time offers"
        title="This week's deals"
        description="Promotions rotate every Monday. Pricing shown is illustrative — call us for live quotes and case pricing."
      />
      <FlashSale />
      <TrustStrip />

      <Section>
        <SectionHeader
          eyebrow="Deepest discounts"
          title={`${deep.length} products at 25% off or more`}
          description="Overstock and end-of-season buys passed through at cost-plus pricing."
        />
        <ProductGrid items={deep} />
      </Section>

      <Section className="pt-0">
        <SectionHeader eyebrow="Everyday savings" title="18–24% off" linkTo="/shop" linkLabel="Shop all" />
        <ProductGrid items={midDeals} />
      </Section>

      <Section className="pt-0">
        <SectionHeader eyebrow="Clearance" title="Low stock, final markdown" />
        <ProductGrid items={clearance} />
      </Section>

      <Newsletter />
    </>
  );
}
