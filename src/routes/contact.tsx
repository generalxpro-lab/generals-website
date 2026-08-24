import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { addressOneLine, site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Shanzen Enterprises | Sheridan, WY" },
      {
        name: "description",
        content:
          "Call Shanzen Enterprises at +1 (307) 400-4140 or visit 30 N Gould St Ste R, Sheridan, WY 82801. Send product, order and wholesale enquiries here.",
      },
      { property: "og:title", content: "Contact Shanzen Enterprises" },
      { property: "og:description", content: "Phone, email and address for orders, quotes and wholesale enquiries." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a person, not a queue"
        description="Call during business hours for stock checks, quotes and wholesale enquiries. Online orders are confirmed by phone before dispatch."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <Reveal className="space-y-4">
            {[
              { icon: Phone, t: "Phone", v: site.phoneDisplay, href: site.phoneHref },
              { icon: Mail, t: "Email", v: site.email, href: `mailto:${site.email}` },
              { icon: MapPin, t: "Address", v: addressOneLine },
              { icon: Clock, t: "Hours", v: site.hours },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  <c.icon size={14} /> {c.t}
                </p>
                {c.href ? (
                  <a href={c.href} className="mt-2 block text-sm font-semibold text-foreground hover:text-accent">
                    {c.v}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-foreground">{c.v}</p>
                )}
              </div>
            ))}
            <a
              href={site.phoneHref}
              className="cta-pulse inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent"
            >
              <Phone size={16} /> Call now
            </a>
          </Reveal>

          <Reveal delay={90}>
            <form
              className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Message noted", {
                  description: "We typically reply within one business day. For urgent requests, please call us directly.",
                });
              }}
            >
              <h2 className="text-xl font-extrabold text-foreground">Send an enquiry</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We typically reply within one business day.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-foreground">
                  Full name
                  <input
                    required
                    name="name"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-normal outline-none focus:border-accent"
                  />
                </label>
                <label className="text-sm font-semibold text-foreground">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-normal outline-none focus:border-accent"
                  />
                </label>
                <label className="text-sm font-semibold text-foreground">
                  Phone
                  <input
                    name="phone"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-normal outline-none focus:border-accent"
                  />
                </label>
                <label className="text-sm font-semibold text-foreground">
                  Enquiry type
                  <select
                    name="type"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-normal outline-none focus:border-accent"
                  >
                    <option>Product question</option>
                    <option>Order status</option>
                    <option>Wholesale / case pricing</option>
                    <option>Returns</option>
                  </select>
                </label>
                <label className="text-sm font-semibold text-foreground sm:col-span-2">
                  Message
                  <textarea
                    required
                    rows={5}
                    name="message"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-normal outline-none focus:border-accent"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent"
              >
                {sent ? "Message noted" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
