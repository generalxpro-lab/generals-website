import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, CheckCircle2, ChevronRight, Clock, Copy, Loader2, MapPin, Package, Phone, ShieldCheck, Truck } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { PaymentIcons } from "@/components/site/PaymentIcons";
import { money, productMap } from "@/data/catalog";
import { site } from "@/lib/site";
import { useOrders } from "@/lib/orders";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({ product: typeof search["product"] === "string" ? (search["product"] as string) : undefined }),
  head: () => ({
    meta: [
      { title: "Checkout — Delivery Address | Shanzen Enterprises" },
      { name: "description", content: "Enter a delivery address to complete your order with Shanzen Enterprises." },
      { property: "og:title", content: "Checkout — Delivery Address | Shanzen Enterprises" },
      { property: "og:description", content: "Secure checkout for Shanzen Enterprises." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const field = "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

const randomPart = (length: number) => Math.random().toString(36).slice(2, 2 + length).toUpperCase();
const makeOrderNumber = () => `SZ-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}-${randomPart(6)}`;
const makeTrackingNumber = () => `SZTRK-${randomPart(4)}${Math.floor(100000 + Math.random() * 900000)}`;

function Checkout() {
  const { product: slug } = Route.useSearch();
  const product = slug ? productMap[slug] : undefined;
  const { saveOrder } = useOrders();
  const [stage, setStage] = useState<"form" | "processing" | "confirmed">("form");
  const [order, setOrder] = useState<{ orderNumber: string; trackingNumber: string } | null>(null);

  const shipping = product ? (product.price >= 75 ? 0 : 6.95) : 0;
  const tax = product ? Math.round(product.price * 0.06 * 100) / 100 : 0;
  const total = product ? Math.round((product.price + shipping + tax) * 100) / 100 : 0;
  const eta = new Date(Date.now() + 4 * 86_400_000).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setStage("processing");
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const nextOrder = { orderNumber: makeOrderNumber(), trackingNumber: makeTrackingNumber() };
    setOrder(nextOrder);
    saveOrder({
      ...nextOrder,
      productSlug: product?.slug,
      productName: product?.name,
      createdAt: new Date().toISOString(),
      status: "placed",
    });
    setStage("confirmed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (stage === "processing") {
    return (
      <Section className="py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-soft sm:p-14">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
            <Loader2 size={36} className="animate-spin" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-2xl font-extrabold text-foreground sm:text-3xl">Processing your order…</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">We're confirming your order details and preparing your confirmation.</p>
          <div className="mx-auto mt-7 h-2 max-w-sm overflow-hidden rounded-full bg-secondary"><div className="h-full w-2/3 animate-pulse rounded-full bg-accent" /></div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Please don't refresh this page</p>
        </div>
      </Section>
    );
  }

  if (stage === "confirmed" && order) {
    return (
      <Section className="py-14">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-7 text-center shadow-soft sm:p-10">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/12 text-success animate-in zoom-in-75 duration-500">
            <CheckCircle2 size={40} aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-foreground sm:text-3xl">Order Confirmed</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Thank you — your order has been recorded and is being prepared.</p>

          <dl className="mt-7 grid gap-3 text-left sm:grid-cols-2">
            {[
              { icon: Package, t: "Order number", s: order.orderNumber },
              { icon: Truck, t: "Tracking number", s: order.trackingNumber },
              { icon: MapPin, t: "Ships from", s: `${site.address.line1}, ${site.address.city}, ${site.address.state}` },
              { icon: Clock, t: "Estimated delivery", s: eta },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border bg-secondary/40 p-4">
                <b.icon size={16} className="text-accent" aria-hidden="true" />
                <dt className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{b.t}</dt>
                <dd className="text-sm font-semibold text-foreground">{b.s}</dd>
              </div>
            ))}
          </dl>

          {product && <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border p-4 text-left">
            <img src={product.image} alt={product.name} width={72} height={72} loading="lazy" decoding="async" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0"><p className="truncate text-sm font-semibold text-foreground">{product.name}</p><p className="text-xs text-muted-foreground">{product.size} · {product.variant}</p></div>
            <span className="ml-auto font-display text-lg font-extrabold text-primary">{money(total)}</span>
          </div>}

          <div className="mt-6 space-y-2 rounded-2xl border border-border bg-secondary/40 p-5 text-left text-sm text-muted-foreground">
            <p className="flex gap-2"><BadgeCheck size={16} className="mt-0.5 shrink-0 text-success" aria-hidden="true" /><span>Your tracking number can be entered on the homepage to view the delivery status.</span></p>
            <p className="flex gap-2"><Copy size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /><span>Keep your order and tracking numbers handy for support.</span></p>
            <p className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /><span>Questions? Call <a href={site.phoneHref} className="font-semibold text-accent hover:text-amber">{site.phoneDisplay}</a></span></p>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent">Continue shopping</Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-bold text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent">Contact support</Link>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-8 lg:px-8"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"><li><Link to="/" className="hover:text-accent">Home</Link></li><li>/</li><li>Checkout</li></ol></nav>
      <Section className="py-10">
        <SectionHeader eyebrow="Step 1 of 1" title="Delivery address" description="Enter your shipping details. No card details are requested online — our team will confirm payment and dispatch details by phone." />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <form onSubmit={placeOrder} className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-foreground">Full name<input required name="name" autoComplete="name" placeholder="Jane Alvarez" className={field} /></label>
              <label className="text-sm font-semibold text-foreground">Phone number<input required name="phone" type="tel" autoComplete="tel" placeholder="(307) 400-4140" className={field} /></label>
              <label className="text-sm font-semibold text-foreground sm:col-span-2">Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} /></label>
              <label className="text-sm font-semibold text-foreground sm:col-span-2">Street address<input required name="address" autoComplete="street-address" placeholder="1420 Coffeen Ave, Ste 200" className={field} /></label>
              <label className="text-sm font-semibold text-foreground">City<input required name="city" autoComplete="address-level2" placeholder="Sheridan" className={field} /></label>
              <label className="text-sm font-semibold text-foreground">State<input required name="state" autoComplete="address-level1" placeholder="WY" className={field} /></label>
              <label className="text-sm font-semibold text-foreground">ZIP code<input required name="zip" autoComplete="postal-code" inputMode="numeric" placeholder="82801" className={field} /></label>
              <label className="text-sm font-semibold text-foreground">Country<input required name="country" autoComplete="country-name" defaultValue="United States" className={field} /></label>
              <label className="text-sm font-semibold text-foreground sm:col-span-2">Delivery notes <span className="font-normal text-muted-foreground">(optional)</span><textarea name="notes" rows={3} placeholder="Special delivery instructions..." className={field} /></label>
            </div>
            <button type="submit" className="cta-pulse mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent">Continue to confirmation <ChevronRight size={16} /></button>
            <p className="mt-3 text-xs text-muted-foreground">By placing this order you acknowledge that final payment and dispatch will be confirmed by a Shanzen Enterprises team member by phone within one business day.</p>
          </form>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft"><h2 className="text-lg font-extrabold text-foreground">Order summary</h2>{product ? <><div className="mt-4 flex items-center gap-4"><img src={product.image} alt={product.name} width={80} height={80} loading="lazy" decoding="async" className="h-20 w-20 shrink-0 rounded-xl object-cover" /><div className="min-w-0"><p className="text-sm font-semibold text-foreground">{product.name}</p><p className="text-xs text-muted-foreground">{product.size} · {product.variant}</p></div></div><div className="mt-4 space-y-2 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="font-semibold text-foreground">{money(product.price)}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-semibold text-foreground">{shipping === 0 ? "Free" : money(shipping)}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Sales tax</span><span className="font-semibold text-foreground">{money(tax)}</span></div><div className="border-t border-border pt-2 font-display text-lg font-extrabold text-primary"><div className="flex justify-between"><span>Total</span>{money(total)}</div></div></div></> : <p className="mt-4 text-sm text-muted-foreground">Select a product to view the order summary.</p>}</div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft"><p className="flex items-center gap-2 text-sm font-bold text-foreground"><ShieldCheck size={16} className="text-success" aria-hidden="true" />Secure checkout</p><p className="mt-2 text-xs text-muted-foreground">Your information is encrypted and protected during the checkout process.</p></div>
          </aside>
        </div>
      </Section>
    </>
  );
}
