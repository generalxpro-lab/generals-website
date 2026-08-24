# Shanzen Enterprises — Premium Demo Storefront + Wholesale Layer

A modern general-store online retailer (grocery, household, and mixed merchandise) with a business/wholesale layer so the site also reads as a real company to brands and distributors. Demo only: no checkout or payment processing.

## Brand and design system

- Palette: Midnight Navy `#16324F`, Emerald Green `#2BB673`, Golden Amber `#F4A261` (buttons/promos), Deep Coral `#E76F51` (sale badges), background `#F7F9FC`, cards `#FFFFFF`, text `#1F2937` / `#6B7280`, borders `#E5E7EB`, success/warning/error `#16A34A` / `#F59E0B` / `#DC2626`. All defined as semantic tokens (oklch) in `src/styles.css`.
- Typography: Manrope headings + Inter body, loaded via `<link>` in the root route.
- UI: 12–16px radii, soft shadows, generous whitespace, glassmorphism on sticky nav / floating cards, navy→emerald gradient hero.
- Logo: inline SVG — stylized "S" shopping bag with an emerald leaf/arrow accent.
- Motion: fade-in on scroll, hover lift, card scaling, image zoom, animated counters, floating offer badges, pulsing amber CTAs. Smooth scrolling site-wide, reduced-motion respected.

## Pages

| Route | Contents |
|---|---|
| `/` | Hero slider, category grid, featured, grocery essentials, household essentials, best sellers, weekly deals + flash sale countdown, limited-time banner, new arrivals, top rated, recommended, trust badges, reviews, newsletter |
| `/shop` | Full catalog with category/price/rating filters, sort, search |
| `/product/$slug` | Gallery with zoom + thumbnails, description, features, specifications, shipping, returns, reviews, related / customers-also-bought / similar items |
| `/categories` | All categories with counts and imagery |
| `/deals` | Weekly deals, flash sale, clearance |
| `/reviews` | Rating distribution (5★ 70%, 4★ 18%, 3★ 7%, 2★ 3%, 1★ 2%), each review with a professional business response |
| `/wholesale` | Distribution capabilities, categories carried, fulfillment/logistics, business details, B2B inquiry form |
| `/about` | Company story, capabilities, values, stats counters |
| `/contact` | Address, phone, hours, map placeholder, contact form |
| `/faq` | Accordion FAQs (ordering, shipping, returns, wholesale) |
| `/privacy`, `/terms` | Policy pages |

## Global elements

- Sticky glass header: logo, nav, search, amber **Call Now +1 307 400 4140** (`tel:` link).
- Floating mobile call button; floating animated promo cards (20% OFF, Free Shipping, Secure Checkout, Limited Offer, New Arrival, Best Seller) with dismiss.
- Footer: company info, address `30 N Gould St Ste R, Sheridan, WY 82801, United States`, contact, socials, newsletter, quick links, copyright, animated payment badges (Visa, Mastercard, Amex, Discover, PayPal, Apple Pay, Google Pay).
- Trust strip: Secure Shopping, SSL Protected, Money Back Guarantee, Fast Shipping, Customer Support, Satisfaction Guarantee.
- Demo notice banner + cart/add-to-cart actions that show placeholder toasts.

## Catalog

~70 products in a typed local data module: 60% grocery & household (coffee, tea, snacks, cereal, rice, pasta, oils, sauces, spices, canned goods, peanut butter, honey, cookies, chocolate, soft drinks, sparkling water, juice, paper towels, toilet paper, trash bags, detergent, dish soap, cleaning sprays, hand soap, air fresheners, storage bags, foil, wrap, sponges, wipes), 40% mixed (home & kitchen, electronics accessories, beauty, health, pet, office, fitness, baby, toys). Each: title, fictional brand, category, price, sale price, discount %, stock status, rating, review count, short + long description, specs, gallery.

Images: generated original lifestyle/product imagery for hero slides, category tiles, and product shots; no assets from the reference site. Generic products share stylized category imagery to keep the page weight sane; all images lazy-loaded with alt text.

## Technical

- TanStack Start file routes, static local data (no backend needed for a demo).
- Per-route `head()` with unique title, description, og/twitter tags, canonical; Organization + Product + FAQPage JSON-LD.
- Semantic HTML, single H1 per page, keyboard-accessible nav/filters/accordions, visible focus rings, ARIA labels on icon buttons.
- Fully responsive: mobile drawer nav, 1/2/3/4-column product grids.

## Note on the credibility question

Building the mix you asked for: the storefront as specced, plus a `/wholesale` page and real company details throughout, so the site supports brand and distributor applications rather than reading as a bare consumer shop.
