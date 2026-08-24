import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { addressOneLine, site } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Shanzen Enterprises" },
      {
        name: "description",
        content:
          "How Shanzen Enterprises collects, uses and protects information submitted through this website.",
      },
      { property: "og:title", content: "Privacy Policy | Shanzen Enterprises" },
      { property: "og:description", content: "Our data practices for this website." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

const sections = [
  {
    t: "Website information",
    b: "This site presents an illustrative catalog. Online payments are not processed automatically; orders and enquiries are confirmed by our team before any transaction is completed.",
  },
  {
    t: "Information we collect",
    b: "When you contact us directly by phone or email, we retain the details you provide — name, business name, contact details and the substance of your enquiry — so we can respond and maintain order records.",
  },
  {
    t: "How we use information",
    b: "Information is used to answer enquiries, prepare quotes, fulfill and support orders, and meet accounting and tax obligations. We do not sell or rent contact information to third parties.",
  },
  {
    t: "Cookies and analytics",
    b: "This site sets no advertising or tracking cookies. Any hosting-level logs are limited to standard request data used for security and availability.",
  },
  {
    t: "Data security",
    b: "Traffic to this site is served over TLS. Business records are held in access-controlled systems, and access is limited to staff who need it to do their work.",
  },
  {
    t: "Your choices",
    b: "You may ask us to correct or delete the information we hold about you, or to stop contacting you, at any time using the details below.",
  },
];

function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="Last updated for the current release of this website."
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
