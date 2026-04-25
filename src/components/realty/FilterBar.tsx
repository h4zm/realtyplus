import type { Filters } from "@/lib/realty/types";
import { useI18n } from "@/lib/realty/i18n";

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  resultCount: number;
}

export function FilterBar({ filters, onChange, resultCount }: Props) {
  const { t } = useI18n();

  const types: { value: Filters["type"]; label: string }[] = [
    { value: "all", label: t("filter.allTypes") },
    { value: "apartment", label: t("filter.apartment") },
    { value: "villa", label: t("filter.villa") },
    { value: "penthouse", label: t("filter.penthouse") },
    { value: "townhouse", label: t("filter.townhouse") },
    { value: "studio", label: t("filter.studio") },
  ];

  const beds: { value: Filters["bedrooms"]; label: string }[] = [
    { value: "any", label: t("filter.anyBeds") },
    { value: "1", label: t("filter.bed1") },
    { value: "2", label: t("filter.bed2") },
    { value: "3", label: t("filter.bed3") },
    { value: "4+", label: t("filter.bed4") },
  ];

  const sorts: { value: Filters["sort"]; label: string }[] = [
    { value: "newest", label: t("filter.newest") },
    { value: "price-asc", label: t("filter.priceAsc") },
    { value: "price-desc", label: t("filter.priceDesc") },
  ];

  const baseInput =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
  const baseSelect = baseInput + " appearance-none pr-8";

  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-12">
        <div className="md:col-span-4">
          <input
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder={t("filter.search")}
            className={baseInput}
          />
        </div>
        <div className="md:col-span-3">
          <input
            value={filters.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder={t("filter.location")}
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
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <select
            value={filters.bedrooms}
            onChange={(e) => onChange({ bedrooms: e.target.value as Filters["bedrooms"] })}
            className={baseSelect}
          >
            {beds.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2 md:col-span-1">
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as Filters["sort"] })}
            className={baseSelect}
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        {t("filter.showing")} <strong className="font-semibold text-foreground">{resultCount}</strong> {t("filter.results")}
      </div>
    </div>
  );
}
