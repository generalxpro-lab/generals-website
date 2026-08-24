import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartOff } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { ProductGrid } from "@/components/site/ProductCard";
import { productMap } from "@/data/catalog";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist | Shanzen Enterprises" },
      {
        name: "description",
        content:
          "Every product you have saved while browsing the Shanzen Enterprises grocery, household and general merchandise catalog.",
      },
      { property: "og:title", content: "My Wishlist | Shanzen Enterprises" },
      {
        property: "og:description",
        content: "Your saved grocery, household and general merchandise picks in one list.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { slugs } = useWishlist();
  const items = slugs.flatMap((s) => (productMap[s] ? [productMap[s]] : []));

  return (
    <>
      <PageHero
        eyebrow="Saved items"
        title="My Wishlist"
        description="Items you hearted while browsing. Your list is kept on this device."
      />
      <Section>
        {items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
            <HeartOff size={28} className="mx-auto text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-bold text-foreground">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the heart on any product to save it here for later.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-accent hover:shadow-glow"
            >
              Back to Shop
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              {items.length} saved {items.length === 1 ? "item" : "items"}
            </p>
            <ProductGrid items={items} />
          </>
        )}
      </Section>
    </>
  );
}
