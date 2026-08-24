import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { addressOneLine, site } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Shanzen Enterprises" },
      {
        name: "description",
        content:
          "Terms governing use of the Shanzen Enterprises website, including pricing, availability, shipping and returns statements.",
      },
      { property: "og:title", content: "Terms & Conditions | Shanzen Enterprises" },
      { property: "og:description", content: "Website terms, pricing accuracy, shipping and returns." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

const sections = [
  {
    t: "Acceptance of terms",
    b: "By using this website you agree to these terms. If you do not agree, please discontinue use of the site.",
  },
  {
    t: "Illustrative catalog",
    b: "Product listings, pricing, promotions, stock indicators and reviews on this site are illustrative. No checkout, payment processing or binding order is created through this website without confirmation by our team.",
  },
  {
    t: "Pricing and availability",
    b: "Prices and availability shown may not reflect live figures and can change without notice. Binding pricing is confirmed only in a written quote or invoice issued by us.",
  },
  {
    t: "Shipping",
    b: "For confirmed orders, in-stock items are dispatched the same business day when received before 2:00 PM MT. Standard ground delivery typically takes 2–5 business days within the contiguous United States. Freight for pallet quantities is quoted before dispatch.",
  },
  {
    t: "Returns",
    b: "Unopened items in original packaging may be returned within 30 days of delivery for a full refund. Damaged or short shipments are replaced at no cost when reported within 48 hours of delivery.",
  },
  {
    t: "Intellectual property",
    b: "Site design, text, imagery and layout are our property or licensed to us. Brand names shown on product listings belong to their respective owners and are used for identification only.",
  },
  {
    t: "Limitation of liability",
    b: "The site is provided on an as-is basis. To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of this website or reliance on its illustrative content.",
  },
  {
    t: "Governing law",
    b: "These terms are governed by the laws of the State of Wyoming, United States.",
  },
];

function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & conditions"
        description="The terms that apply to your use of this website."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          {sections.map((s) => (
            <section key={s.t}>
              <h2 className="text-lg font-extrabold text-foreground">{s.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
            </section>
          ))}
          <section>
            <h2 className="text-lg font-extrabold text-foreground">Contact</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {site.name}, {addressOneLine}. Phone {site.phoneDisplay}, email {site.email}.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
