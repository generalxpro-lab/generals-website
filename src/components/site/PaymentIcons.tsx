const badges: { label: string; render: () => React.ReactNode }[] = [
  {
    label: "Visa",
    render: () => (
      <span className="font-display text-[0.78rem] font-extrabold italic tracking-tight text-primary">
        VISA
      </span>
    ),
  },
  {
    label: "Mastercard",
    render: () => (
      <span className="flex items-center">
        <span className="h-4 w-4 rounded-full bg-coral/90" />
        <span className="-ml-1.5 h-4 w-4 rounded-full bg-amber/90" />
      </span>
    ),
  },
  {
    label: "American Express",
    render: () => (
      <span className="rounded-[3px] bg-primary px-1.5 py-0.5 text-[0.5rem] font-bold leading-tight tracking-tight text-primary-foreground">
        AMEX
      </span>
    ),
  },
  {
    label: "Discover",
    render: () => (
      <span className="flex items-center gap-1">
        <span className="text-[0.6rem] font-bold uppercase tracking-tight text-primary">Disc</span>
        <span className="h-3 w-3 rounded-full bg-amber" />
      </span>
    ),
  },
  {
    label: "PayPal",
    render: () => (
      <span className="text-[0.72rem] font-extrabold italic tracking-tight text-primary">
        Pay<span className="text-accent">Pal</span>
      </span>
    ),
  },
  {
    label: "Apple Pay",
    render: () => (
      <span className="flex items-center gap-0.5 text-[0.7rem] font-semibold text-primary">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
          <path d="M16.4 12.9c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7c-1.3 0-2.6.8-3.3 2-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2.1 2.5 2 1-.1 1.4-.7 2.6-.7s1.5.6 2.6.6 1.8-1 2.5-2c.5-.7.7-1.1 1.1-1.9-2-.8-2.2-3.3-2.2-3.4zM14.3 6.5c.5-.7.9-1.6.8-2.5-.8 0-1.8.6-2.4 1.3-.5.6-.9 1.5-.8 2.4.9.1 1.9-.5 2.4-1.2z" />
        </svg>
        Pay
      </span>
    ),
  },
  {
    label: "Google Pay",
    render: () => (
      <span className="text-[0.7rem] font-semibold text-primary">
        <span className="text-accent">G</span> Pay
      </span>
    ),
  },
];

export function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {badges.map((b, i) => (
        <li
          key={b.label}
          title={b.label}
          className="flex h-9 w-[3.4rem] items-center justify-center rounded-lg border border-border bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-lift"
          style={{ animation: `float-soft ${4 + i * 0.35}s ease-in-out ${i * 0.2}s infinite` }}
        >
          <span className="sr-only">{b.label}</span>
          {b.render()}
        </li>
      ))}
    </ul>
  );
}
