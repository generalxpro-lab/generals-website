import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { money, stockLabel, type Product } from "@/data/catalog";
import { Stars } from "./Stars";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const stock = stockLabel(product.stock);
  const { has, toggle } = useWishlist();
  const { add } = useCart();
  const wished = has(product.slug);
  const navigate = useNavigate();
  const openWishlist = () => {
    if (!wished) toggle(product.slug);
    navigate({ to: "/wishlist" });
  };
  const addToCart = () => {
    add(product);
    toast.success("Added to cart", { description: product.name });
  };

  return (
    <article className="hover-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="zoom-media relative block aspect-square bg-secondary" aria-label={product.name}>
        <img src={product.image} alt={`${product.name} by ${product.brand}`} width={900} height={900} loading={priority ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.discount > 0 && <span className="rounded-full bg-coral px-2.5 py-1 text-[0.68rem] font-bold text-coral-foreground shadow-soft">−{product.discount}%</span>}
          {product.bestSeller && <span className="rounded-full bg-primary px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wide text-primary-foreground">Best seller</span>}
          {product.newArrival && <span className="rounded-full bg-accent px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wide text-accent-foreground">New</span>}
        </span>
      </Link>
      <button type="button" onClick={openWishlist} aria-label={wished ? `Open wishlist with ${product.name}` : `Add ${product.name} to wishlist`} aria-pressed={wished} className="glass absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-foreground transition-transform duration-300 hover:scale-110">
        <Heart size={16} className={wished ? "fill-coral text-coral" : ""} aria-hidden="true" />
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <Link to="/brands/$slug" params={{ slug: product.brandSlug }} className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-accent">{product.brand}</Link>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground"><Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-accent">{product.name}</Link></h3>
        <p className="text-xs font-medium text-muted-foreground">{product.size} · {product.variant}</p>
        {product.reviewCount > 0 && <div className="flex flex-wrap items-center gap-x-2 gap-y-1"><Stars rating={product.rating} /><span className="text-xs font-medium text-foreground">{product.rating.toFixed(1)}</span><span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span></div>}
        <p className="line-clamp-2 text-xs text-muted-foreground">{product.short}</p>
        <div className="mt-auto space-y-3 pt-1">
          <div className="flex flex-wrap items-baseline gap-2"><span className="font-display text-xl font-extrabold text-primary">{money(product.price)}</span>{product.oldPrice > product.price && <span className="text-sm text-muted-foreground line-through">{money(product.oldPrice)}</span>}</div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${stock.tone === "in" ? "text-success" : stock.tone === "low" ? "text-warning" : "text-destructive"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />{stock.text}</span>
          <div className="grid grid-cols-2 gap-2"><Link to="/product/$slug" params={{ slug: product.slug }} className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:border-accent hover:text-accent">Details<ArrowRight size={15} /></Link><button type="button" onClick={addToCart} disabled={product.stock <= 0} className="flex items-center justify-center gap-1.5 rounded-xl bg-accent px-3 py-2.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"><ShoppingBag size={15} /> Add</button></div>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}</div>;
}
