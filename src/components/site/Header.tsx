import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, PhoneCall, Search, UserRound, X } from "lucide-react";
import { Logo } from "./Logo";
import { AuthDialog } from "./AuthDialog";
import { site } from "@/lib/site";
import { useWishlist } from "@/lib/wishlist";
import { useCustomer } from "@/lib/customer";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/deals", label: "Deals" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { count: wishlistCount } = useWishlist();
  const { customer } = useCustomer();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/shop", search: { q: q.trim() || undefined, cat: undefined } });
  };

  return (
    <>
      <div className="brand-gradient text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs lg:px-8">
          <p className="min-w-0">Free shipping over $49 · same-day pick &amp; pack</p>
          <p className="hidden shrink-0 sm:block">{site.hours}</p>
        </div>
      </div>
      <header className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-soft" : ""}`}>
        <div className="glass">
          <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:px-8">
            <Link to="/" className="min-w-0 shrink-0" aria-label="Shanzen Enterprises home"><Logo /></Link>
            <div className="flex shrink-0 items-center gap-2">
              <form onSubmit={search} className="hidden items-center xl:flex">
                <label className="sr-only" htmlFor="site-search">Search products</label>
                <div className="relative">
                  <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input id="site-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search coffee, detergent, pet food…" className="w-72 rounded-xl border border-border bg-card py-2 pl-9 pr-3 text-sm shadow-soft placeholder:text-muted-foreground" />
                </div>
              </form>
              <Link to="/wishlist" className="relative grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-primary transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent" aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} saved` : ""}`}>
                <Heart size={18} />
                {wishlistCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[0.65rem] font-bold text-coral-foreground">{wishlistCount}</span>}
              </Link>
              <button type="button" onClick={() => setAuthOpen(true)} className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-bold text-primary transition-all hover:border-accent hover:text-accent sm:inline-flex">
                <UserRound size={16} /> <span className="max-w-28 truncate">{customer ? customer.firstName : "Sign in"}</span>
              </button>
              <a href={site.phoneHref} className="cta-pulse hidden items-center gap-2 rounded-xl bg-amber px-4 py-2.5 text-sm font-bold text-amber-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex">
                <PhoneCall size={15} /><span className="hidden md:inline">Call Now</span><span className="md:hidden">Call</span>
              </a>
              <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-primary lg:hidden">
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
          <nav aria-label="Main" className="mx-auto hidden max-w-7xl items-center gap-1 border-t border-border px-4 py-1.5 lg:flex lg:px-8">
            {nav.map((n) => <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} activeProps={{ className: "text-accent bg-accent/10" }} inactiveProps={{ className: "text-foreground/80" }} className="rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:text-accent">{n.label}</Link>)}
            <Link to="/faq" activeProps={{ className: "text-accent bg-accent/10" }} className="ml-auto rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-accent">FAQ</Link>
          </nav>
        </div>
        {open && <div className="glass animate-fade-in border-t border-border lg:hidden"><div className="mx-auto max-w-7xl space-y-3 px-4 py-4">
          <form onSubmit={search} className="flex gap-2"><label className="sr-only" htmlFor="mobile-search">Search products</label><input id="mobile-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="min-w-0 flex-1 rounded-xl border border-border bg-card px-3 py-2.5 text-sm" /><button type="submit" className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Search</button></form>
          <div className="grid grid-cols-2 gap-2"><Link to="/wishlist" onClick={() => setOpen(false)} className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-semibold text-foreground">Wishlist{wishlistCount ? ` (${wishlistCount})` : ""}</Link><button type="button" onClick={() => { setOpen(false); setAuthOpen(true); }} className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-semibold text-foreground">{customer ? customer.firstName : "Sign in"}</button></div>
          <ul className="grid grid-cols-2 gap-2">{[...nav, { to: "/faq", label: "FAQ" } as const].map((n) => <li key={n.to}><Link to={n.to} onClick={() => setOpen(false)} className="block rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-semibold text-foreground">{n.label}</Link></li>)}</ul>
        </div></div>}
      </header>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}
