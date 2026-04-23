import type { Filters } from "@/lib/realty/types";

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  resultCount: number;
}

const types: { value: Filters["type"]; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "townhouse", label: "Townhouse" },
  { value: "studio", label: "Studio" },
];

const beds: { value: Filters["bedrooms"]; label: string }[] = [
  { value: "any", label: "Any beds" },
  { value: "1", label: "1 bed" },
  { value: "2", label: "2 beds" },
  { value: "3", label: "3 beds" },
  { value: "4+", label: "4+ beds" },
];

const sorts: { value: Filters["sort"]; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low → high" },
  { value: "price-desc", label: "Price: high → low" },
];

export function FilterBar({ filters, onChange, resultCount }: Props) {
  const baseInput =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
  const baseSelect = baseInput + " appearance-none pr-8";

  return (
    <div className="rounded-2xl bg-card p-5 shadow-soft">
      <div className="grid gap-3 md:grid-cols-12">
        <div className="md:col-span-4">
          <input
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Search by title…"
            className={baseInput}
          />
        </div>
        <div className="md:col-span-3">
          <input
            value={filters.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Location…"
            className={baseInput}
          />
        </div>
        <div className="md:col-span-2">
          <select
            value={filters.type}
            onChange={(e) => onChange({ type: e.target.value as Filters["type"] })}
            className={baseSelect}
          >
            {types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1.5">
          <select
            value={filters.bedrooms}
            onChange={(e) => onChange({ bedrooms: e.target.value as Filters["bedrooms"] })}
            className={baseSelect}
          >
            {beds.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1.5">
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as Filters["sort"] })}
            className={baseSelect}
          >
            {sorts.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        Showing <strong className="font-semibold text-foreground">{resultCount}</strong> properties
      </div>
    </div>
  );
}
