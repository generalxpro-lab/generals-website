import { Link } from "@tanstack/react-router";
import { Hammer } from "lucide-react";

export function ComingSoon({
  title = "We're working on this page",
  description = "This part of the Shanzen Enterprises site is still being built. In the meantime, browse the catalog or head back home.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-[65vh] items-center justify-center bg-background px-4 py-16">
      <div className="glass mx-auto max-w-lg rounded-3xl border border-border p-10 text-center shadow-lift">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent">
          <Hammer size={22} aria-hidden="true" />
        </span>
        <p className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-accent">
          Coming soon
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-primary">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-accent hover:shadow-glow"
          >
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-primary transition-all hover:border-accent hover:text-accent"
          >
            Browse the shop
          </Link>
        </div>
      </div>
    </div>
  );
}
