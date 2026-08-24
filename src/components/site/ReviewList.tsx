import { CheckCircle2, MessageSquareReply } from "lucide-react";
import { ratingDistribution, reviewSummary, type Review } from "@/data/reviews";
import { Reveal } from "./Reveal";
import { Stars } from "./Stars";

export function RatingSummary() {
  return (
    <div className="grid gap-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <div className="text-center lg:text-left">
        <p className="font-display text-5xl font-extrabold text-primary">
          {reviewSummary.average.toFixed(1)}
        </p>
        <Stars rating={reviewSummary.average} size={18} className="mt-2" />
        <p className="mt-2 text-sm text-muted-foreground">
          Based on {reviewSummary.total.toLocaleString("en-US")} verified customer reviews
        </p>
      </div>
      <ul className="space-y-2.5">
        {ratingDistribution.map((r) => (
          <li key={r.stars} className="grid grid-cols-[3.2rem_minmax(0,1fr)_3rem] items-center gap-3">
            <span className="text-sm font-semibold text-foreground">{r.stars} star</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-secondary">
              <span
                className="block h-full rounded-full bg-amber"
                style={{ width: `${r.percent}%` }}
              />
            </span>
            <span className="text-right text-sm tabular-nums text-muted-foreground">
              {r.percent}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReviewCard({ review, delay = 0 }: { review: Review; delay?: number }) {
  return (
    <Reveal delay={delay} as="article" className="h-full">
      <div className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground">{review.name}</p>
            <p className="text-xs text-muted-foreground">
              {review.location} · {review.date}
            </p>
          </div>
          <Stars rating={review.rating} />
        </div>

        <h3 className="mt-3 text-sm font-semibold text-foreground">{review.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.body}</p>

        {review.verified && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-success">
            <CheckCircle2 size={13} /> Verified purchase
          </p>
        )}

        <div className="mt-4 rounded-xl border-l-2 border-accent bg-secondary p-4">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent">
            <MessageSquareReply size={13} /> Response from Shanzen Enterprises
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.response}</p>
        </div>
      </div>
    </Reveal>
  );
}
