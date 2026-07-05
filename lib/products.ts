export type Product = {
  id: string;
  slug: string;
  nameEn: string;
  nameHi: string;
  category: "Kitchen" | "Grooming" | "Books" | "Home & Living";
  price: number;
  rating: number;
  tagline: string;
  pros: string[];
  cons: string[];
  amazonLink: string;
  flipkartLink?: string;
};

export const products: Product[] = [
  {
    id: "P001",
    slug: "stainless-steel-garlic-press",
    nameEn: "Stainless Steel Garlic Press",
    nameHi: "स्टेनलेस स्टील लहसुन प्रेस",
    category: "Kitchen",
    price: 499,
    rating: 4.4,
    tagline: "Sturdy, easy to clean, dishwasher safe",
    pros: ["Sturdy build quality", "Easy to clean", "Dishwasher safe"],
    cons: ["Handle slightly narrow for large hands"],
    amazonLink: "https://amzn.to/xxxx1",
  },
  {
    id: "P002",
    slug: "bamboo-cutting-board-set",
    nameEn: "Bamboo Cutting Board Set",
    nameHi: "बांस कटिंग बोर्ड सेट",
    category: "Kitchen",
    price: 899,
    rating: 4.6,
    tagline: "Eco-friendly, good grip, 3-piece set",
    pros: ["Eco-friendly bamboo", "Good grip", "3-piece set covers all needs"],
    cons: ["Needs occasional oiling"],
    amazonLink: "https://amzn.to/xxxx2",
    flipkartLink: "https://ekaro.in/xxxx2",
  },
  {
    id: "P003",
    slug: "beard-trimmer-pro",
    nameEn: "Beard Trimmer Pro",
    nameHi: "बीयर्ड ट्रिमर प्रो",
    category: "Grooming",
    price: 1799,
    rating: 4.5,
    tagline: "60-minute battery life, precision guide combs",
    pros: ["60 min battery life", "Precision guide combs", "Fast charging"],
    cons: ["Charging cable is short"],
    amazonLink: "https://amzn.to/xxxx3",
  },
];

export const categories = ["Kitchen", "Grooming", "Books", "Home & Living"] as const;
