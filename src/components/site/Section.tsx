import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  linkTo,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  linkTo?: "/shop" | "/deals" | "/categories" | "/reviews" | "/brands";
  linkLabel?: string;
}) {
  return (
    <Reveal className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0 max-w-2xl">
        {eyebrow && (
          <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      </div>
      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className="shrink-0 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          {linkLabel}
        </Link>
      )}
    </Reveal>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="brand-gradient relative overflow-hidden">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
        <span className="inline-block rounded-full bg-primary-foreground/10 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-primary-foreground/80">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
          {description}
        </p>
      </div>
    </header>
  );
}
