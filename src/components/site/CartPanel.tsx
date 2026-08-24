import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { money, productMap } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export function CartPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, setQuantity, remove, clear } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button aria-label="Close cart" className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Your order</p>
            <h2 className="mt-1 text-xl font-extrabold text-foreground">Shopping cart</h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground hover:border-accent hover:text-accent" aria-label="Close cart"><X size={18} /></button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground"><ShoppingCart size={28} /></span>
              <h3 className="mt-5 text-lg font-bold text-foreground">Your cart is empty</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">Add products from the storefront and they will stay here on this device.</p>
              <Link to="/shop" onClick={onClose} className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-accent">Browse products</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const product = productMap[item.slug];
                if (!product) return null;
                return (
                  <div key={item.slug} className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-soft">
                    <img src={product.image} alt={product.name} width={80} height={80} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-foreground">{product.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{money(product.price)} each</p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center rounded-lg border border-border bg-background">
                          <button type="button" onClick={() => setQuantity(item.slug, item.quantity - 1)} className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-accent" aria-label="Decrease quantity"><Minus size={14} /></button>
                          <span className="w-8 text-center text-sm font-bold text-foreground">{item.quantity}</span>
                          <button type="button" onClick={() => setQuantity(item.slug, item.quantity + 1)} disabled={item.quantity >= product.stock} className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-accent disabled:opacity-30" aria-label="Increase quantity"><Plus size={14} /></button>
                        </div>
                        <button type="button" onClick={() => remove(item.slug)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label={`Remove ${product.name}`}><Trash2 size={15} /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-card p-5">
            <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-display text-xl font-extrabold text-primary">{money(subtotal)}</span></div>
            <p className="mt-2 text-xs text-muted-foreground">Shipping and sales tax are calculated during checkout.</p>
            <div className="mt-4 grid gap-2">
              <Link to="/checkout" search={{ product: items[0]?.slug }} onClick={onClose} className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground hover:bg-accent">Continue to checkout</Link>
              <button type="button" onClick={clear} className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-muted-foreground hover:border-destructive hover:text-destructive">Clear cart</button>
            </div>
            <p className="mt-3 text-[0.68rem] text-muted-foreground">Checkout is currently the existing phone-confirmation flow; payment processing is not connected yet.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
