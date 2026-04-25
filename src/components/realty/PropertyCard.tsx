import type { Property } from "@/lib/realty/types";
import { formatEUR } from "@/lib/realty/store";
import { useI18n } from "@/lib/realty/i18n";

interface Props {
  property: Property;
  onClick: () => void;
}

export function PropertyCard({ property, onClick }: Props) {
  const { t } = useI18n();
  const typeLabel = t(`filter.${property.type}` as `filter.${typeof property.type}`);
  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col overflow-hidden rounded-2xl bg-card text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {property.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-cta px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cta-foreground shadow-cta">
            {t("card.featured")}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full glass px-3 py-1 text-[11px] font-medium capitalize text-foreground">
          {typeLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <div className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {formatEUR(property.price)}
        </div>
        <div className="line-clamp-1 text-base font-semibold text-foreground">
          {property.title}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13Z" />
            <circle cx="12" cy="9" r="3" />
          </svg>
          <span className="line-clamp-1">{property.location}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-3 text-sm text-foreground/80">
          <span><strong className="font-semibold">{property.bedrooms}</strong> {t("card.beds")}</span>
          <span><strong className="font-semibold">{property.bathrooms}</strong> {t("card.baths")}</span>
          <span><strong className="font-semibold">{property.area}</strong> m²</span>
        </div>
      </div>
    </button>
  );
}
