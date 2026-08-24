import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, User } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account | Shanzen Enterprises" },
      {
        name: "description",
        content:
          "Account overview for Shanzen Enterprises — saved items, order history and wholesale pricing preferences.",
      },
      { property: "og:title", content: "Your Account | Shanzen Enterprises" },
      {
        property: "og:description",
        content: "Saved items, order history and wholesale preferences in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Your account area"
        description="Accounts on this showcase site are a preview. Order history, saved payment methods and wholesale pricing tiers appear here once accounts go live."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { icon: User, title: "Profile", text: "Name, contact details and delivery addresses." },
            { icon: Heart, title: "Saved items", text: "Everything you hearted while browsing." },
            {
              icon: ShieldCheck,
              title: "Wholesale access",
              text: "Case pricing and account terms for approved buyers.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="hover-lift rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <c.icon size={20} className="text-accent" aria-hidden="true" />
              <h2 className="mt-3 text-base font-bold text-foreground">{c.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/wishlist"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-accent hover:shadow-glow"
          >
            View my wishlist
          </Link>
          <Link
            to="/shop"
            className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-primary transition-all hover:border-accent hover:text-accent"
          >
            Continue shopping
          </Link>
        </div>
      </Section>
    </>
  );
}
