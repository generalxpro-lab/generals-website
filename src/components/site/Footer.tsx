import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, PhoneCall, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";
import { PaymentIcons } from "./PaymentIcons";
import { site } from "@/lib/site";

const quickLinks = [
  { to: "/shop", label: "Shop all" },
  { to: "/categories", label: "Categories" },
  { to: "/deals", label: "Weekly deals" },
  { to: "/reviews", label: "Customer reviews" },
] as const;

const supportLinks = [
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
] as const;

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
  { icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="brand-gradient mt-4 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        <div className="min-w-0 space-y-4 lg:col-span-1">
          <Logo light />
          <p className="text-sm leading-relaxed text-primary-foreground/75">
            A general-line supplier of grocery, household and general merchandise for households across the continental United States.
          </p>
          <address className="space-y-2 text-sm not-italic text-primary-foreground/80">
            <p className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
                <br />
                {site.address.country}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <PhoneCall size={16} className="shrink-0 text-accent" />
              <a href={site.phoneHref} className="font-semibold hover:text-amber">
                {site.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-accent" />
              <a href={`mailto:${site.email}`} className="hover:text-amber">
                {site.email}
              </a>
            </p>
          </address>
          <ul className="flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href="#"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-primary-foreground/10 text-primary-foreground transition-all hover:-translate-y-1 hover:bg-amber hover:text-amber-foreground"
                >
                  <s.icon size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
            Quick links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/80 hover:text-amber">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
            Company &amp; support
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {supportLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/80 hover:text-amber">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
            Weekly deals email
          </h3>
          <Newsletter compact />
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/60">
              Accepted payments
            </p>
            <PaymentIcons />
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-primary-foreground/70 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Shanzen Enterprises. All rights reserved.</p>
          <p>
            Products, pricing and reviews are illustrative. Call us to confirm live availability and place an order.
          </p>
        </div>
      </div>
    </footer>
  );
}
