import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { RatingSummary, ReviewCard } from "@/components/site/ReviewList";
import { Newsletter } from "@/components/site/Newsletter";
import { TrustStrip } from "@/components/site/TrustStrip";
import { reviews, reviewSummary } from "@/data/reviews";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews | Shanzen Enterprises" },
      {
        name: "description",
        content: `Read ${reviewSummary.total.toLocaleString("en-US")} sample Shanzen Enterprises reviews for the storefront review experience.`,
      },
      { property: "og:title", content: "Customer Reviews | Shanzen Enterprises" },
      { property: "og:description", content: "Sample storefront review content with a mixed range of ratings." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <>
      <PageHero
        eyebrow="Customer reviews"
        title="Sample feedback for the storefront"
        description="These reviews are sample/demo content used to test the storefront review experience. They are not represented as verified historical customer purchases."
      />
      <Section>
        <RatingSummary />
        <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/5 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Demo content:</strong> Replace these sample reviews with genuine customer feedback before using review counts as social proof for a live store.
        </div>
        <div className="mt-10">
          <SectionHeader
            eyebrow="Sample reviews"
            title="Mixed feedback across the catalog"
            description="The dataset intentionally includes different ratings and review volumes so the storefront can be tested realistically."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {reviews.map((r, i) => (
              <ReviewCard key={r.id} review={r} delay={(i % 2) * 70} />
            ))}
          </div>
        </div>
      </Section>
      <TrustStrip />
      <Newsletter />
    </>
  );
}
