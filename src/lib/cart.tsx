import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/catalog";
import { productMap } from "@/data/catalog";

export type CartItem = { slug: string; quantity: number };

type CartValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "shanzen-cart";
const CartContext = createContext<CartValue | null>(null);

function readCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        item && typeof item.slug === "string" && productMap[item.slug] && Number.isFinite(item.quantity) && item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => setItems(readCart()), []);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore storage failures */
    }
  }, []);

  const add = useCallback((product: Product, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.floor(quantity));
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === product.slug);
      const next = existing
        ? prev.map((item) => item.slug === product.slug ? { ...item, quantity: Math.min(item.quantity + safeQuantity, product.stock) } : item)
        : [...prev, { slug: product.slug, quantity: Math.min(safeQuantity, product.stock) }];
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.slug !== slug);
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    const product = productMap[slug];
    if (!product) return;
    if (quantity <= 0) { remove(slug); return; }
    const nextQuantity = Math.min(Math.floor(quantity), product.stock);
    setItems((prev) => {
      const next = prev.map((item) => item.slug === slug ? { ...item, quantity: nextQuantity } : item);
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, [remove]);

  const clear = useCallback(() => persist([]), [persist]);

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + (productMap[item.slug]?.price ?? 0) * item.quantity, 0);
    return { items, count, subtotal, add, remove, setQuantity, clear };
  }, [items, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) return { items: [], count: 0, subtotal: 0, add: () => {}, remove: () => {}, setQuantity: () => {}, clear: () => {} };
  return ctx;
}
