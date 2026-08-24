import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { BrandCard } from "@/components/site/BrandCard";
import { Reveal } from "@/components/site/Reveal";
import { brands } from "@/data/brands";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "Featured Brands | Shanzen Enterprises" },
      {
        name: "description",
        content:
          "Featured brands carried in the Shanzen Enterprises catalog across grocery, household, cleaning, personal care, beauty, baby and pet ranges.",
      },
      { property: "og:title", content: "Featured Brands | Shanzen Enterprises" },
      {
        property: "og:description",
        content:
          "Brands carried in our catalog, spanning grocery, household and general merchandise ranges.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
  component: BrandsIndex,
});

function BrandsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Featured Brands"
        title="Brands carried in our catalog"
        description="All brand names shown are the trademarks of their respective owners and appear for identification only. Shanzen Enterprises is not an authorized distributor, official retailer, partner or supplier for any brand listed here, and no brand logos or packaging artwork are reproduced on this site."
      />
      <Section>
        <Reveal className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            {brands.length} brand collections
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Each collection page lists products grouped under that brand name with filters and
            sorting, so you can see how a full aisle would shop.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((b) => (
            <BrandCard key={b.slug} brand={b} />
          ))}
        </div>
      </Section>

    </>
  );
}
