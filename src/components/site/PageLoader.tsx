import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

export function PageLoader() {
  const [clickLoading, setClickLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const routerPending = useRouterState({ select: (s) => s.status === "pending" });

  useEffect(() => {
    const onClick = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setClickLoading(true);
      timeoutRef.current = setTimeout(() => {
        setClickLoading(false);
      }, 500);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!routerPending && clickLoading) {
      setClickLoading(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [routerPending, clickLoading]);

  if (!clickLoading && !routerPending) return null;

  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-md"
    >
      <div className="relative">
        <span className="absolute inset-0 h-14 w-14 animate-ping rounded-full bg-accent/20" />
        <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-border bg-card shadow-lift">
          <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-accent/30 border-t-accent" />
        </span>
      </div>
      <p className="text-sm font-bold tracking-wide text-foreground">Loading…</p>
    </div>
  );
}
