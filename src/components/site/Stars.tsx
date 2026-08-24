import { Star } from "lucide-react";

export function Stars({
  rating,
  size = 14,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i - 0.25;
        const half = !filled && rating >= i - 0.75;
        return (
          <Star
            key={i}
            size={size}
            strokeWidth={1.75}
            className={
              filled || half ? "fill-amber text-amber" : "fill-transparent text-muted-foreground/40"
            }
            style={half ? { opacity: 0.55 } : undefined}
          />
        );
      })}
    </span>
  );
}
