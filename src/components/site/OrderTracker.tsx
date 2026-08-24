import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, PackageCheck, Search, Truck, XCircle } from "lucide-react";
import { useOrders, getStageIndex, trackingStages, type DemoOrder, type OrderStatus } from "@/lib/orders";

const stageDurationMs = 15_000;

function currentStatus(order: DemoOrder): OrderStatus {
  const elapsed = Math.max(0, Date.now() - new Date(order.createdAt).getTime());
  const index = Math.min(trackingStages.length - 1, Math.floor(elapsed / stageDurationMs));
  return trackingStages[index].status;
}

const icons = [PackageCheck, Clock3, Truck, Truck, CheckCircle2];

export function OrderTracker() {
  const { findByTracking } = useOrders();
  const [tracking, setTracking] = useState("");
  const [searched, setSearched] = useState<DemoOrder | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const status = useMemo(() => (searched ? currentStatus({ ...searched, createdAt: searched.createdAt }) : null), [searched, now]);
  const activeIndex = status ? getStageIndex(status) : -1;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const order = findByTracking(tracking);
    setSearched(order ?? null);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 lg:px-8">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Order tracking</p>
            <h2 className="mt-2 text-2xl font-extrabold text-foreground">Track your order</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Enter the tracking number from your order confirmation to see its delivery progress.
            </p>
            <form onSubmit={submit} className="mt-5 flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="tracking-number">Tracking number</label>
              <input
                id="tracking-number"
                value={tracking}
                onChange={(event) => setTracking(event.target.value.toUpperCase())}
                placeholder="SZTRK-ABCD123456"
                className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] outline-none transition-colors focus:border-accent"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-glow"
              >
                <Search size={16} /> Track
              </button>
            </form>
            {!searched && tracking.trim() && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-coral/30 bg-coral/5 px-3 py-2.5 text-xs font-semibold text-coral">
                <XCircle size={15} /> Tracking number not found on this device.
              </div>
            )}
          </div>

          {searched ? (
            <div className="rounded-2xl border border-border bg-secondary/30 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Tracking number</p>
                  <p className="mt-1 font-display text-lg font-extrabold tracking-[0.08em] text-primary">{searched.trackingNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Order</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{searched.orderNumber}</p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {trackingStages.map((stage, index) => {
                  const Icon = icons[index];
                  const complete = index < activeIndex;
                  const active = index === activeIndex;
                  return (
                    <div key={stage.status} className="flex gap-3">
                      <div className="relative flex w-8 shrink-0 justify-center">
                        <span className={`relative z-10 grid h-8 w-8 place-items-center rounded-full border ${complete || active ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card text-muted-foreground"} ${active ? "ring-4 ring-accent/10" : ""}`}>
                          <Icon size={15} />
                        </span>
                        {index < trackingStages.length - 1 && <span className={`absolute left-1/2 top-8 h-full w-px -translate-x-1/2 ${complete ? "bg-accent" : "bg-border"}`} />}
                      </div>
                      <div className="min-w-0 pb-1">
                        <p className={`text-sm font-bold ${active || complete ? "text-foreground" : "text-muted-foreground"}`}>{stage.title}{active ? " · Current" : ""}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{stage.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-[0.7rem] text-muted-foreground">
                Demo storefront tracking timeline — stages advance automatically after an order is placed on this device.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/20 p-8 text-center">
              <Truck size={28} className="mx-auto text-muted-foreground" />
              <p className="mt-3 text-sm font-semibold text-foreground">Your delivery timeline will appear here.</p>
              <p className="mt-1 text-xs text-muted-foreground">Use the unique tracking number shown after checkout.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
