import { Link } from "@tanstack/react-router";
import { Heart, Home, Search, ShoppingCart, Store } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

export function MobileNav() {
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/shop", label: "Shop", icon: Store },
    { to: "/shop", label: "Search", icon: Search },
    { to: "/wishlist", label: "Wishlist", icon: Heart, badge: wishlistCount },
    { to: "/cart", label: "Cart", icon: ShoppingCart, badge: count },
  ] as const;

  return (
    <nav aria-label="Mobile shopping navigation" className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-soft backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {items.map(({ to, label, icon: Icon, badge }) => (
          <Link key={label} to={to} search={to === "/shop" ? { q: undefined, cat: undefined } : undefined} activeProps={{ className: "text-accent" }} className="relative flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-muted-foreground transition-colors hover:text-accent">
            <span className="relative"><Icon size={19} aria-hidden="true" />{badge ? <span className="absolute -right-2 -top-2 grid min-h-4 min-w-4 place-items-center rounded-full bg-coral px-1 text-[9px] font-bold text-coral-foreground">{badge > 99 ? "99+" : badge}</span> : null}</span>
            <span className="text-[10px] font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
