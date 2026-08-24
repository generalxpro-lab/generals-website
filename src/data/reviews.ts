export type Review = {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  response: string;
  verified: boolean;
};

// Demo/showcase reviews: all displayed locations are within Wyoming.
// These are not represented as verified historical customer purchases.
export const ratingDistribution = [
  { stars: 5, percent: 70 },
  { stars: 4, percent: 18 },
  { stars: 3, percent: 7 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 2 },
];

export const reviewSummary = {
  average: 4.5,
  total: 12,
};

export const reviews: Review[] = [
  {
    id: 1,
    name: "Marissa Coleman",
    location: "Sheridan, WY",
    rating: 5,
    date: "March 4, 2026",
    title: "Restocked our whole pantry in one order",
    body: "I ordered several household items together and everything arrived packed properly with nothing damaged. The selection made it easy to get what I needed in one order.",
    response: "Thank you for the detailed feedback, Marissa. We appreciate your business.",
    verified: false,
  },
  {
    id: 2,
    name: "Devon Whitaker",
    location: "Cheyenne, WY",
    rating: 5,
    date: "February 21, 2026",
    title: "Reliable household shopping",
    body: "The products arrived in good condition and the ordering process was straightforward. I would shop here again.",
    response: "Thank you, Devon. We appreciate the feedback and hope to serve you again.",
    verified: false,
  },
  {
    id: 3,
    name: "Priya Raghunathan",
    location: "Casper, WY",
    rating: 4,
    date: "February 9, 2026",
    title: "Good products and easy ordering",
    body: "The items were as described and arrived well packed. The website made it easy to find what I wanted.",
    response: "Thanks for sharing your experience, Priya. We appreciate the feedback.",
    verified: false,
  },
  {
    id: 4,
    name: "Andre Lassiter",
    location: "Gillette, WY",
    rating: 4,
    date: "January 28, 2026",
    title: "Good value",
    body: "The product quality was good for the price and everything arrived safely. The checkout process was simple.",
    response: "Appreciate the honest feedback, Andre. Thank you for shopping with us.",
    verified: false,
  },
  {
    id: 5,
    name: "Karen Ojeda",
    location: "Laramie, WY",
    rating: 3,
    date: "January 16, 2026",
    title: "Good products",
    body: "The products themselves were fine. Delivery took a little longer than I expected, but everything arrived safely.",
    response: "Thanks for the feedback, Karen. We appreciate your patience.",
    verified: false,
  },
  {
    id: 6,
    name: "Thomas Bergeron",
    location: "Rock Springs, WY",
    rating: 5,
    date: "January 5, 2026",
    title: "Easy experience",
    body: "The site was easy to use and my order arrived in good condition. No problems with the process.",
    response: "Thank you, Thomas. We are glad the experience was smooth.",
    verified: false,
  },
  {
    id: 7,
    name: "Sofia Marchetti",
    location: "Cody, WY",
    rating: 2,
    date: "December 19, 2025",
    title: "Packaging could be better",
    body: "One item arrived with damaged packaging, although the rest of the order was fine. I would like to see more protection around fragile items.",
    response: "Thank you for pointing that out, Sofia. Packaging feedback helps us improve the experience.",
    verified: false,
  },
  {
    id: 8,
    name: "Nathan Ekwueme",
    location: "Jackson, WY",
    rating: 5,
    date: "December 8, 2025",
    title: "Good prices",
    body: "I found the pricing competitive and the products arrived as expected. I will check the store again when I need to restock.",
    response: "Glad the value worked out, Nathan. We appreciate you taking the time to leave feedback.",
    verified: false,
  },
  {
    id: 9,
    name: "Grace Lindqvist",
    location: "Riverton, WY",
    rating: 4,
    date: "November 27, 2025",
    title: "Happy with the order",
    body: "Everything was straightforward from browsing to delivery. The item matched the description and arrived in good shape.",
    response: "Thanks for the practical feedback, Grace. We appreciate it.",
    verified: false,
  },
  {
    id: 10,
    name: "Malik Turner",
    location: "Buffalo, WY",
    rating: 1,
    date: "November 14, 2025",
    title: "Order issue",
    body: "There was an issue with the item I received. The overall experience was disappointing, although the site itself was easy to navigate.",
    response: "We appreciate the honest feedback, Malik. We are continuing to improve the ordering experience.",
    verified: false,
  },
  {
    id: 11,
    name: "Elena Vasquez",
    location: "Rawlins, WY",
    rating: 5,
    date: "November 2, 2025",
    title: "Exactly what I needed",
    body: "The product was as described and arrived safely. I liked having several everyday items available in one place.",
    response: "Thank you, Elena. We appreciate the positive feedback.",
    verified: false,
  },
  {
    id: 12,
    name: "Jonah Feldman",
    location: "Evanston, WY",
    rating: 3,
    date: "October 21, 2025",
    title: "Mostly good",
    body: "Most of the experience was good. I would like to see more product availability in the future.",
    response: "Thanks for the feedback, Jonah. We are continuing to expand product availability.",
    verified: false,
  },
];

export const faqs = [
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
