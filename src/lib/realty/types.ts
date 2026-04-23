export type PropertyType = "apartment" | "villa" | "penthouse" | "townhouse" | "studio";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number; // EUR
  bedrooms: number;
  bathrooms: number;
  area: number; // m²
  type: PropertyType;
  featured: boolean;
  description: string;
  images: string[]; // URLs or data URLs
  createdAt: number;
}

export interface Filters {
  query: string;
  location: string;
  type: "all" | PropertyType;
  bedrooms: "any" | "1" | "2" | "3" | "4+";
  sort: "newest" | "price-asc" | "price-desc";
}
