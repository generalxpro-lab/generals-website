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
        content: `Read ${reviewSummary.total.toLocaleString("en-US")} verified Shanzen Enterprises reviews — positive and critical — each with a response from our customer care team.`,
      },
      { property: "og:title", content: "Customer Reviews | Shanzen Enterprises" },
      { property: "og:description", content: "An unfiltered mix of five-star and critical feedback, with our replies published alongside." },
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
        title="Feedback we publish in full"
        description="We do not filter out the difficult reviews. Every rating below carries a response from the team member who handled it."
      />
      <Section>
        <RatingSummary />
        <div className="mt-10">
          <SectionHeader
            eyebrow="Latest reviews"
            title="What customers report after ordering"
            description="Sorted newest first across grocery, household and general merchandise orders."
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
