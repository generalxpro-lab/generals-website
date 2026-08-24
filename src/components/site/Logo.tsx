export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" role="img" aria-label="Shanzen Enterprises">
        <rect
          x="3"
          y="10"
          width="34"
          height="27"
          rx="8"
          fill="currentColor"
          className={light ? "text-primary-foreground/15" : "text-primary"}
        />
        <path
          d="M13 12V9a7 7 0 0 1 14 0v3"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className={light ? "text-primary-foreground" : "text-primary"}
        />
        <path
          d="M24.5 19.5c-3.2-1-6.6-.3-8 1.6-1.2 1.6-.3 3.2 1.9 3.8l3.4.9c2.2.6 3.1 2.2 1.9 3.8-1.4 1.9-4.8 2.6-8 1.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="text-accent"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-extrabold tracking-tight ${
            light ? "text-primary-foreground" : "text-primary"
          }`}
        >
          Shanzen
        </span>
        <span
          className={`text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${
            light ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          Enterprises
        </span>
      </span>
    </span>
  );
}
