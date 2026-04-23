import type { Property } from "./types";
import p1 from "@/assets/prop-1.jpg";
import p2 from "@/assets/prop-2.jpg";
import p3 from "@/assets/prop-3.jpg";
import p4 from "@/assets/prop-4.jpg";
import p5 from "@/assets/prop-5.jpg";
import p6 from "@/assets/prop-6.jpg";

export const seedProperties: Property[] = [
  {
    id: "rp-001",
    title: "Bright Skyline Apartment",
    location: "Vitoria-Gasteiz, Centro",
    price: 320000,
    bedrooms: 2,
    bathrooms: 2,
    area: 92,
    type: "apartment",
    featured: true,
    description:
      "Modern 2-bedroom apartment with floor-to-ceiling windows, premium finishes, and panoramic city views. Walking distance to all amenities.",
    images: [p1, p5, p6],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "rp-002",
    title: "Mediterranean Palm Villa",
    location: "Costa del Sol, Málaga",
    price: 1250000,
    bedrooms: 5,
    bathrooms: 4,
    area: 380,
    type: "villa",
    featured: true,
    description:
      "Stunning Mediterranean villa surrounded by palm trees, with private pool, garden, and ocean breeze. The dream Spanish lifestyle.",
    images: [p2, p6, p5],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "rp-003",
    title: "Sunset Penthouse Terrace",
    location: "Madrid, Salamanca",
    price: 890000,
    bedrooms: 3,
    bathrooms: 3,
    area: 165,
    type: "penthouse",
    featured: true,
    description:
      "Exclusive penthouse with a wraparound terrace overlooking the Madrid skyline. Designer interiors and 24h concierge.",
    images: [p3, p1, p5],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "rp-004",
    title: "Historic Old Town Townhouse",
    location: "Vitoria-Gasteiz, Casco Viejo",
    price: 245000,
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    type: "townhouse",
    featured: false,
    description:
      "Charming stone townhouse fully renovated, blending historic character with contemporary comfort.",
    images: [p4, p1, p6],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
  },
  {
    id: "rp-005",
    title: "Marble Kitchen Family Home",
    location: "Bilbao, Indautxu",
    price: 410000,
    bedrooms: 4,
    bathrooms: 3,
    area: 175,
    type: "apartment",
    featured: false,
    description:
      "Spacious family apartment with a designer marble kitchen, two balconies, and bright open living spaces.",
    images: [p5, p1, p6],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18,
  },
  {
    id: "rp-006",
    title: "Lakeview Master Retreat",
    location: "Donostia-San Sebastián",
    price: 760000,
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: "villa",
    featured: false,
    description:
      "Architecturally designed home with breathtaking lake and mountain views, master suite, and private grounds.",
    images: [p6, p2, p3],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 22,
  },
  {
    id: "rp-007",
    title: "Compact City Studio",
    location: "Vitoria-Gasteiz, Lakua",
    price: 128000,
    bedrooms: 1,
    bathrooms: 1,
    area: 42,
    type: "studio",
    featured: false,
    description:
      "Smartly designed studio perfect for first-time buyers or investors. Excellent rental yield in a high-demand area.",
    images: [p1, p5],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 28,
  },
  {
    id: "rp-008",
    title: "Garden Family Townhouse",
    location: "Vitoria-Gasteiz, Salburua",
    price: 365000,
    bedrooms: 4,
    bathrooms: 3,
    area: 190,
    type: "townhouse",
    featured: false,
    description:
      "Family townhouse with private garden, garage and quiet neighbourhood close to schools and parks.",
    images: [p4, p2, p6],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 35,
  },
];
