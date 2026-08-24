import { Link } from "@tanstack/react-router";
import type { Brand } from "@/data/brands";
import { countByBrand } from "@/data/catalog";

/**
 * Featured brand card using the brand's real logo artwork.
 * Logos are loaded from Simple Icons' CDN and are used only to identify the
 * corresponding brands; no partnership or authorization is implied.
 */
export function BrandCard({ brand, compact = false }: { brand: Brand; compact?: boolean }) {
  const logoSlug = brand.slug.replace("-", "");
  const logoUrl = `https://cdn.simpleicons.org/${logoSlug}`;

  return (
    <Link
      to="/brands/$slug"
      params={{ slug: brand.slug }}
      className="hover-lift group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:border-accent"
    >
      <span className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-secondary px-8 py-10">
        <span
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.08),transparent_62%)]"
          aria-hidden="true"
        />
        <img
          src={logoUrl}
          alt={`${brand.name} logo`}
          width={220}
          height={100}
          loading="lazy"
          decoding="async"
          className="relative max-h-20 max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </span>

      <span className="block p-5 text-left">
        <span className="block font-display text-xl font-extrabold tracking-[-0.01em] text-foreground transition-colors group-hover:text-accent">
          {brand.name}
        </span>
        <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {brand.tagline}
        </span>
        {!compact && (
          <span className="mt-3 block text-xs font-medium text-muted-foreground">
            {countByBrand(brand.slug)} products in catalog
          </span>
        )}
      </span>
    </Link>
  );
}
