import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductGrid } from "@/components/site/ProductCard";
import { Section, SectionHeader } from "@/components/site/Section";
import { OrderTracker } from "@/components/site/OrderTracker";
import { products } from "@/data/catalog";
import { useCustomer } from "@/lib/customer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shanzen Enterprises | Featured Products" },
      { name: "description", content: "Explore featured products from Shanzen Enterprises across beauty, office, pet care and learning essentials." },
      { property: "og:title", content: "Shanzen Enterprises | Featured Products" },
      { property: "og:description", content: "Explore our featured product selection." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 6);
  const { customer } = useCustomer();

  return (
    <>
      <Section>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {customer && (
              <p className="mb-2 animate-fade-in text-sm font-semibold text-accent">Hi {customer.firstName} 👋</p>
            )}
            <SectionHeader
              eyebrow="Featured products"
              title="Featured products"
              description="Discover six highlighted products from our current selection."
            />
          </div>
          <Link to="/wishlist" className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent">
            <Heart size={16} /> View wishlist
          </Link>
        </div>
        <ProductGrid items={featured} />
      </Section>
      <OrderTracker />
    </>
  );
}
