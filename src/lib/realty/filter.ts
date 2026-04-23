import type { Filters, Property } from "./types";

export const defaultFilters: Filters = {
  query: "",
  location: "",
  type: "all",
  bedrooms: "any",
  sort: "newest",
};

export function applyFilters(items: Property[], f: Filters): Property[] {
  const q = f.query.trim().toLowerCase();
  const loc = f.location.trim().toLowerCase();

  let out = items.filter((p) => {
    if (q && !p.title.toLowerCase().includes(q)) return false;
    if (loc && !p.location.toLowerCase().includes(loc)) return false;
    if (f.type !== "all" && p.type !== f.type) return false;
    if (f.bedrooms !== "any") {
      if (f.bedrooms === "4+" ? p.bedrooms < 4 : p.bedrooms !== Number(f.bedrooms))
        return false;
    }
    return true;
  });

  switch (f.sort) {
    case "price-asc":
      out = [...out].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out = [...out].sort((a, b) => b.price - a.price);
      break;
    default:
      out = [...out].sort((a, b) => b.createdAt - a.createdAt);
  }
  return out;
}
