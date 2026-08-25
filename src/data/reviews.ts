export type Review = {
  id: number;
  productSlug: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  response: string;
  verified: boolean;
};

// SAMPLE / DEMO REVIEWS ONLY. These are generated storefront content for testing the review UI.
// They are intentionally not marked as verified customer purchases and must be replaced with genuine customer feedback before launch.
const productReviewCounts: Record<string, number> = {
  "medicube-collagen-jelly-cream-firming-hydrating": 22,
  "medicube-salmon-dna-pdrn-pink-peptide-serum-glow-firming": 48,
  "medicube-zero-pore-pads-2-0-exfoliating-toner-pads": 15,
  "bic-round-stic-xtra-life-ballpoint-pens-black-60-pack": 27,
  "expo-dry-erase-markers-fine-tip-assorted-colors-12-pack": 31,
  "gorilla-mounting-putty-168-squares-removable-reusable": 12,
  "pilot-g2-gel-pens-fine-point-black-12-pack": 26,
  "sharpie-permanent-marker-set-variety-pack-black-6-count": 19,
  "sharpie-permanent-markers-black-fine-point-12-pack": 47,
  "blue-buffalo-health-bars-pumpkin-cinnamon-16-oz": 24,
  "blue-buffalo-life-protection-dog-food-chicken-brown-rice-5-lb": 33,
  "earth-rated-pet-wipes-unscented-hypoallergenic-100-count": 14,
  "milk-bone-original-dog-biscuits-medium-dogs-10-lb": 29,
  "pedigree-dentastix-for-large-dogs-variety-pack-51-treats": 11,
  "sheba-perfect-portions-wet-cat-food-variety-pack-24-twin-packs": 23,
  "vital-essentials-beef-liver-dog-treats-freeze-dried-2-1-oz": 18,
  "talking-flash-cards-montessori-language-learning-224-words": 45,
};

const names = [
  "Avery Morgan", "Jordan Ellis", "Taylor Brooks", "Casey Bennett", "Riley Parker", "Morgan Hayes",
  "Jamie Carter", "Drew Sullivan", "Cameron Reed", "Quinn Foster", "Alex Monroe", "Peyton Ross",
  "Reese Coleman", "Skyler James", "Harper Lane", "Dakota Wells", "Emerson Grant", "Rowan Blake",
  "Finley Scott", "Kendall Moore", "Sage Turner", "Charlie Hayes", "Blair Cooper", "Mackenzie Bell",
];
const locations = ["Sheridan, WY", "Cheyenne, WY", "Casper, WY", "Gillette, WY", "Laramie, WY", "Cody, WY", "Jackson, WY", "Riverton, WY"];
const titles = [
  "Good everyday product", "Worked as expected", "Solid value", "Easy to use", "Happy with the purchase",
  "Useful and convenient", "Good quality", "Would consider buying again", "Mostly good", "Decent overall",
];
const bodies = [
  "The item arrived in good condition and matched the listing. It was straightforward to use.",
  "I liked the overall quality and the product did what I expected. Packaging was fine too.",
  "The product was useful for everyday needs. There were no major issues with my sample order.",
  "Good option for the price. I would compare availability before ordering again.",
  "The item was as described. Delivery and packaging were acceptable, with a few small things that could be improved.",
  "It worked well for what I needed. The experience was generally smooth from browsing through delivery.",
  "A reasonable product overall. I liked some parts of it more than others, but it was usable.",
];
const responses = [
  "Thank you for the feedback. We appreciate you taking the time to share it.",
  "Thanks for sharing your experience. Your feedback helps us improve the storefront.",
  "We appreciate the review and the specific feedback.",
];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const productSlugs = Object.keys(productReviewCounts);
const reviewPool: Review[] = [];
let reviewId = 1;

productSlugs.forEach((productSlug, productIndex) => {
  const count = productReviewCounts[productSlug];
  for (let i = 0; i < count; i += 1) {
    // Deterministic mixed ratings: mostly 4/5, with realistic lower ratings included.
    const rating = [5, 4, 5, 3, 4, 5, 2, 4, 5, 3, 4, 1][(i + productIndex * 3) % 12];
    const dayOffset = productIndex * 2 + i;
    const date = new Date(Date.UTC(2026, 7, 25));
    date.setUTCDate(date.getUTCDate() - dayOffset);
    reviewPool.push({
      id: reviewId++,
      productSlug,
      name: names[(i + productIndex) % names.length],
      location: locations[(i * 2 + productIndex) % locations.length],
      rating,
      date: date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }),
      title: titles[(i + productIndex) % titles.length],
      body: bodies[(i * 3 + productIndex) % bodies.length],
      response: responses[(i + productIndex) % responses.length],
      verified: false,
    });
  }
});

export const reviews: Review[] = reviewPool;

export const productReviewStats = Object.fromEntries(
  productSlugs.map((slug) => {
    const productReviews = reviews.filter((review) => review.productSlug === slug);
    const average = productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length;
    return [slug, { average: Number(average.toFixed(1)), total: productReviews.length }];
  }),
) as Record<string, { average: number; total: number }>;

export const getProductReviewStats = (productSlug: string) =>
  productReviewStats[productSlug] ?? { average: 0, total: 0 };

export const reviewSummary = {
  average: Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)),
  total: reviews.length,
};

export const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
  stars,
  percent: Math.round((reviews.filter((review) => review.rating === stars).length / reviews.length) * 100),
}));

export const faqs = [
  {
    q: "Are the reviews on this site real customer reviews?",
    a: "The current review dataset is sample storefront content for demonstration and testing. It is not represented as verified historical customer feedback and should be replaced with genuine customer reviews before launch.",
  },
  {
    q: "Is this a real online store?",
    a: "This website is a showcase catalog for Shanzen Enterprises. Product pages, pricing and promotions are illustrative. To place a real order or request a quote, call us at (307) 400-4140.",
  },
  {
    q: "How quickly do orders ship?",
    a: "In-stock items are picked and packed the same business day when the order is received before 2:00 PM MT. Standard ground transit is typically two to four business days within the continental United States.",
  },
  {
    q: "What is your return policy?",
    a: "Unopened, undamaged items can be returned within 30 days of delivery for a full refund of the purchase price. Damaged or incorrect items are replaced at no cost.",
  },
  {
    q: "How do I know an item is in stock?",
    a: "Every product card and product page shows a stock indicator. When a quantity is low, the remaining count can be displayed instead of a general in-stock label.",
  },
  {
    q: "Which payment methods do you support?",
    a: "Payment options shown on the site are for the showcase experience. Contact Shanzen Enterprises for current payment arrangements.",
  },
  {
    q: "Do you ship outside the United States?",
    a: "Retail shipping is limited to the continental United States. Contact our team for any special shipping requirements.",
  },
  {
    q: "How is my information protected?",
    a: "All traffic to this site is encrypted over TLS. We do not sell customer information, and we collect only what is required to respond to an inquiry or fulfill an order.",
  },
];
