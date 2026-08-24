import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email address to continue.");
      return;
    }
    toast.success("You're on the list", {
      description: "Thanks for subscribing — look for our next weekly deals email.",
    });
    setEmail("");
  };

  if (compact) {
    return (
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-compact">
          Email address
        </label>
        <input
          id="newsletter-compact"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-amber px-4 py-2.5 text-sm font-bold text-amber-foreground transition-transform hover:-translate-y-0.5"
        >
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
      <div className="brand-gradient relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12">
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-primary-foreground/85">
              <Mail size={13} /> Weekly deals email
            </span>
            <h2 className="mt-4 text-2xl font-extrabold text-primary-foreground sm:text-3xl">
              Get the weekly restock list before it sells out
            </h2>
            <p className="mt-3 max-w-xl text-sm text-primary-foreground/80">
              One email each Thursday: price drops on grocery and household staples, new general
              merchandise, and members-only bundle pricing. Unsubscribe any time.
            </p>
          </div>
          <div className="glass-dark rounded-2xl p-5">
            <Newsletter compact />
            <p className="mt-3 text-xs text-primary-foreground/65">
              One email each Thursday. Unsubscribe any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
