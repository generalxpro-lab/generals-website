import catBeautyImg from "@/assets/cat-beauty.jpg";
import catBabyImg from "@/assets/cat-baby.jpg";
import catPetImg from "@/assets/cat-pet.jpg";
import catHealthImg from "@/assets/cat-health.jpg";
import catPantryImg from "@/assets/cat-pantry.jpg";
import catPaperImg from "@/assets/cat-paper.jpg";
import catCleaningImg from "@/assets/cat-cleaning.jpg";
import catSnacksImg from "@/assets/cat-snacks.jpg";
import catBeveragesImg from "@/assets/cat-beverages.jpg";
import catStaplesImg from "@/assets/cat-staples.jpg";
import prodCoffee from "@/assets/prod-coffee.jpg";
import prodCereal from "@/assets/prod-cereal.jpg";
import prodCleaning from "@/assets/prod-cleaning.jpg";
import prodLaundry from "@/assets/prod-laundry.jpg";
import prodPaper from "@/assets/prod-paper.jpg";
import prodPersonalCare from "@/assets/prod-personalcare.jpg";
import { brandMap } from "./brands";

export type CategoryKey =
  | "grocery"
  | "household"
  | "cleaning"
  | "personalcare"
  | "beauty"
  | "baby"
  | "pet";

export type Category = {
  key: CategoryKey;
  name: string;
  group: "Grocery & Household" | "General Merchandise";
  blurb: string;
  image: string;
};

export const categories: Category[] = [
  {
    key: "grocery",
    name: "Grocery & Food",
    group: "Grocery & Household",
    blurb: "Coffee, cereal, snacks, sauces, canned goods and pantry staples.",
    image: prodCoffee,
  },
  {
    key: "household",
    name: "Household Essentials",
    group: "Grocery & Household",
    blurb: "Everyday household, school, office and organization essentials.",
    image: prodPaper,
  },
  {
    key: "cleaning",
    name: "Cleaning Supplies",
    group: "Grocery & Household",
    blurb: "Laundry, dish, disinfecting wipes, sprays and floor care.",
    image: prodCleaning,
  },
  {
    key: "personalcare",
    name: "Personal Care",
    group: "Grocery & Household",
    blurb: "Toothpaste, soap, body wash, deodorant and shaving supplies.",
    image: prodPersonalCare,
  },
  {
    key: "beauty",
    name: "Beauty & Skincare",
    group: "General Merchandise",
    blurb: "Moisturisers, lotions, cosmetics and everyday skincare.",
    image: catBeautyImg,
  },
  {
    key: "baby",
    name: "Baby & Learning",
    group: "General Merchandise",
    blurb: "Baby care and early-learning products for growing families.",
    image: catBabyImg,
  },
  {
    key: "pet",
    name: "Pet Care",
    group: "General Merchandise",
    blurb: "Dog and cat food, treats and everyday pet care essentials.",
    image: catPetImg,
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.key, c])) as Record<
  CategoryKey,
  Category
>;

const imageMap = {
  coffee: prodCoffee,
  cereal: prodCereal,
  cleaning: prodCleaning,
  laundry: prodLaundry,
  paper: prodPaper,
  personalcare: prodPersonalCare,
  snacks: catSnacksImg,
  beverages: catBeveragesImg,
  staples: catStaplesImg,
  pantry: catPantryImg,
  paperlife: catPaperImg,
  cleaninglife: catCleaningImg,
  beauty: catBeautyImg,
  health: catHealthImg,
  baby: catBabyImg,
  pet: catPetImg,
} as const;

type ImageKey = keyof typeof imageMap;

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  category: CategoryKey;
  categoryName: string;
  size: string;
  variant: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  stock: number;
  short: string;
  image: string;
  imageKey: ImageKey;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  topRated: boolean;
  onDeal: boolean;
  trending: boolean;
};

type Row = [
  name: string,
  brandSlug: string,
  cat: CategoryKey,
  size: string,
  variant: string,
  price: number,
  oldPrice: number,
  rating: number,
  reviews: number,
  stock: number,
  img: ImageKey,
  short: string,
];

/** Exactly the 17 products requested by the store owner. */
const rows: Row[] = [
  [
    "Medicube Collagen Jelly Cream – Firming & Hydrating",
    "medicube",
    "beauty",
    "3.71 fl.oz",
    "Firming & Hydrating",
    19.98,
    19.98,
    0,
    0,
    100,
    "beauty",
    "Infused with niacinamide and freeze-dried hydrolyzed collagen, this jelly cream boosts hydration, strengthens the skin barrier, and delivers a 24-hour glow with no artificial colors.",
  ],
  [
    "Medicube Salmon DNA PDRN Pink Peptide Serum – Glow & Firming",
    "medicube",
    "beauty",
    "1.01 fl.oz",
    "Glow & Firming",
    18.9,
    18.9,
    0,
    0,
    100,
    "beauty",
    "A glow-boosting serum with Salmon DNA, peptides, and niacinamide to hydrate, firm, and even skin tone. Perfect for radiant, healthy-looking skin.",
  ],
  [
    "Medicube Zero Pore Pads 2.0 – Exfoliating Toner Pads",
    "medicube",
    "beauty",
    "70ct",
    "Exfoliating Toner Pads",
    18.9,
    18.9,
    0,
    0,
    100,
    "beauty",
    "Dual-textured toner pads with 4.5% AHA and 0.45% BHA to gently exfoliate, unclog pores, and smooth skin. Suitable for all skin types.",
  ],
  [
    "BIC Round Stic Xtra Life Ballpoint Pens – Black, 60-Pack",
    "bic",
    "household",
    "60-pack",
    "Black",
    6.74,
    6.74,
    0,
    0,
    100,
    "paper",
    "Reliable and smooth-writing BIC Round Stic Xtra Life pens with black ink. Features long-lasting ink and consistent flow—ideal for everyday writing at home, school, or office.",
  ],
  [
    "EXPO Dry Erase Markers – Fine Tip, Assorted Colors, 12-Pack",
    "expo",
    "household",
    "12-pack",
    "Fine Tip · Assorted Colors",
    8.99,
    8.99,
    0,
    0,
    100,
    "paperlife",
    "Set of 12 EXPO low-odor dry erase markers with fine tips in assorted vibrant colors. Ideal for whiteboards in classrooms, offices, or home use—smooth writing and easy to erase.",
  ],
  [
    "Gorilla Mounting Putty – 168 Squares, Removable & Reusable",
    "gorilla",
    "household",
    "168 squares",
    "Removable & Reusable",
    5.48,
    5.48,
    0,
    0,
    100,
    "paperlife",
    "Gorilla Mounting Putty in natural tan with 168 pre-cut squares. Non-toxic, removable, and repositionable—perfect for mounting, decorating, and organizing without damaging surfaces.",
  ],
  [
    "Pilot G2 Gel Pens – Fine Point Black, 12-Pack",
    "pilot",
    "household",
    "12-pack",
    "Fine Point · Black",
    14.39,
    14.39,
    0,
    0,
    100,
    "paper",
    "Pilot G2 premium gel pens with 0.7mm fine point deliver smooth, consistent black ink. Ideal for writing, journaling, or note-taking—long-lasting and comfortable to use.",
  ],
  [
    "Sharpie Permanent Marker Set – Variety Pack, Black, 6-Count",
    "sharpie",
    "household",
    "6-count",
    "Black · Variety Tips",
    4.63,
    4.63,
    0,
    0,
    100,
    "paper",
    "Versatile 6-pack of Sharpie permanent markers in black with chisel, fine, and ultra-fine tips. Perfect for writing, coloring, labeling, or posters—ideal for home, school, or office use.",
  ],
  [
    "Sharpie Permanent Markers – Black, Fine Point (12-Pack)",
    "sharpie",
    "household",
    "12-pack",
    "Black · Fine Point",
    8.94,
    8.94,
    0,
    0,
    100,
    "paper",
    "Set of 12 black Sharpie permanent markers with fine tips. Quick-drying, fade-resistant ink works on wood, plastic, metal, paper, and more—perfect for drawing, labeling, and posters.",
  ],
  [
    "Blue Buffalo Health Bars – Pumpkin & Cinnamon, 16 oz",
    "blue-buffalo",
    "pet",
    "16 oz",
    "Pumpkin & Cinnamon",
    4.98,
    4.98,
    0,
    0,
    100,
    "pet",
    "Oven-baked Blue Buffalo Health Bars made with wholesome pumpkin and cinnamon. Crunchy dog biscuits with natural ingredients—no corn, wheat, or soy. Perfect for rewarding good pups!",
  ],
  [
    "Blue Buffalo Life Protection Dog Food – Chicken & Brown Rice, 5 lb",
    "blue-buffalo",
    "pet",
    "5 lb",
    "Chicken & Brown Rice",
    14.98,
    14.98,
    0,
    0,
    100,
    "pet",
    "Blue Buffalo Life Protection Formula for adult dogs with real chicken and brown rice. Made with high-quality natural ingredients plus vitamins and minerals—no corn, wheat, or soy. 5-lb trial size bag.",
  ],
  [
    "Earth Rated Pet Wipes – Unscented, Hypoallergenic, 100 Count",
    "earth-rated",
    "pet",
    "100 count",
    "Unscented · Hypoallergenic",
    9.98,
    9.98,
    0,
    0,
    100,
    "pet",
    "Earth Rated unscented pet wipes gently clean and hydrate your dog or cat’s paws, body, and butt. Hypoallergenic and safe for daily grooming—perfect for sensitive skin.",
  ],
  [
    "Milk-Bone Original Dog Biscuits – Medium Dogs, 10 lb",
    "milk-bone",
    "pet",
    "10 lb",
    "Original · Medium Dogs",
    14.98,
    14.98,
    0,
    0,
    100,
    "pet",
    "Classic Milk-Bone dog biscuits for medium-sized dogs. Crunchy treats help clean teeth and freshen breath—wholesome and tasty, in a value 10-pound box.",
  ],
  [
    "Pedigree Dentastix for Large Dogs – Variety Pack, 51 Treats",
    "pedigree",
    "pet",
    "51 treats",
    "Variety Pack · Large Dogs",
    23.98,
    23.98,
    0,
    0,
    100,
    "pet",
    "Pedigree Dentastix dental chews for large dogs in a 51-count variety pack with Original, Beef, and Fresh flavors. Helps clean teeth and support oral health with every treat.",
  ],
  [
    "Sheba Perfect Portions Wet Cat Food – Variety Pack, 24 Twin-Packs",
    "sheba",
    "pet",
    "24 twin-packs",
    "Roasted Chicken · Salmon · Turkey",
    23.38,
    23.38,
    0,
    0,
    100,
    "pet",
    "Sheba Perfect Portions wet cat food includes 24 twin-pack trays (48 servings) with Roasted Chicken, Sustainable Salmon, and Tender Turkey entrées. Cuts in gravy for a delicious, mess-free meal every time.",
  ],
  [
    "Vital Essentials Beef Liver Dog Treats – Freeze-Dried, 2.1 oz",
    "vital-essentials",
    "pet",
    "2.1 oz",
    "Freeze-Dried Beef Liver",
    5.99,
    5.99,
    0,
    0,
    100,
    "pet",
    "Premium freeze-dried beef liver dog treats made with a single raw ingredient. High in protein and perfect for training. Grain-free, gluten-free, and filler-free for a clean, healthy reward.",
  ],
  [
    "Talking Flash Cards – Montessori Language Learning, 224 Words",
    "unbranded",
    "baby",
    "224 words",
    "Montessori Language Learning",
    9.99,
    9.99,
    0,
    0,
    100,
    "baby",
    "Interactive talking flash cards featuring 224 words designed for toddlers ages 1–4. Supports language development, speech therapy, and sensory learning—great for Montessori education and autism play.",
  ],
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const products: Product[] = rows.map((r, i) => {
  const [name, brandSlug, cat, size, variant, price, oldPrice, rating, reviewCount, stock, img, short] = r;
  const discount = oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0;
  return {
    id: `SZ-${1000 + i}`,
    slug: slugify(name),
    name,
    brand: brandMap[brandSlug]?.name ?? "Unbranded",
    brandSlug,
    category: cat,
    categoryName: categoryMap[cat].name,
    size,
    variant,
    price,
    oldPrice,
    discount,
    rating,
    reviewCount,
    stock,
    short,
    image: imageMap[img],
    imageKey: img,
    featured: i < 4,
    bestSeller: false,
    newArrival: true,
    topRated: false,
    onDeal: false,
    trending: false,
  };
});

export const productMap = Object.fromEntries(products.map((p) => [p.slug, p])) as Record<string, Product>;

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export const countByCategory = (key: CategoryKey) =>
  products.filter((p) => p.category === key).length;

export const countByBrand = (slug: string) => products.filter((p) => p.brandSlug === slug).length;

export const byBrand = (slug: string) => products.filter((p) => p.brandSlug === slug);

export const stockLabel = (stock: number) =>
  stock === 0
    ? { text: "Out of stock", tone: "out" as const }
    : stock < 100
      ? { text: `Only ${stock} left`, tone: "low" as const }
      : { text: "In stock", tone: "in" as const };

export const pick = (
  filter: (p: Product) => boolean,
  limit: number,
  offset = 0,
): Product[] => products.filter(filter).slice(offset, offset + limit);

export const relatedTo = (p: Product, limit = 4) =>
  products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, limit);

export const moreFromBrand = (p: Product, limit = 4) =>
  products.filter((x) => x.brandSlug === p.brandSlug && x.slug !== p.slug).slice(0, limit);

export const alsoBought = (p: Product, limit = 4) =>
  products
    .filter((x) => x.slug !== p.slug && x.categoryName !== p.categoryName)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);

export const similarItems = (p: Product, limit = 4) =>
  products
    .filter((x) => x.slug !== p.slug && Math.abs(x.price - p.price) < 12)
    .slice(0, limit);

export const galleryFor = (p: Product): string[] => {
  const others = products.filter((x) => x.imageKey !== p.imageKey && x.category === p.category);
  return [p.image, categoryMap[p.category].image, ...others.map((o) => o.image)]
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 4);

};

export const specsFor = (p: Product): { label: string; value: string }[] => [
  { label: "SKU", value: p.id },
  { label: "Brand", value: p.brand },
  { label: "Category", value: p.categoryName },
  { label: "Size", value: p.size },
  { label: "Variant", value: p.variant },
  { label: "Case pack", value: "1 unit" },
  { label: "Storage", value: p.category === "grocery" ? "Cool, dry place away from sunlight" : "Store according to product directions" },
  { label: "Shelf life", value: "See product packaging" },
  { label: "Barcode", value: "Not provided" },
];

export const featuresFor = (p: Product): string[] => [
  p.short,
  `Supplied as ${p.size} in the ${p.variant.toLowerCase()} variant.`,
  "Product information is based on the supplied store listing details.",
  "Retail-ready packaging inspected before outbound shipment.",
  "Backed by our 30-day satisfaction guarantee.",
];
