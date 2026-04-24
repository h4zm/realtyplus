import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/realty/Navbar";
import { Hero, TrustStrip } from "@/components/realty/Hero";
import { About } from "@/components/realty/About";
import { Reviews } from "@/components/realty/Reviews";
import { Contact, Footer } from "@/components/realty/Contact";
import { PropertyCard } from "@/components/realty/PropertyCard";
import { PropertyModal } from "@/components/realty/PropertyModal";
import { FilterBar } from "@/components/realty/FilterBar";
import { AdminPanel } from "@/components/realty/AdminPanel";
import { Reveal } from "@/components/realty/Reveal";
import { useProperties } from "@/lib/realty/store";
import { applyFilters, defaultFilters } from "@/lib/realty/filter";
import type { Filters, Property } from "@/lib/realty/types";
import { I18nProvider, useI18n } from "@/lib/realty/i18n";
import { ThemeProvider } from "@/lib/realty/theme";
import { AssetsProvider } from "@/lib/realty/assets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RealtyPlus — Inmobiliaria Premium en España" },
      {
        name: "description",
        content:
          "Descubre apartamentos de lujo, villas y hogares en España con RealtyPlus, la agencia inmobiliaria premium de Vitoria-Gasteiz.",
      },
      { property: "og:title", content: "RealtyPlus — Inmobiliaria Premium en España" },
      {
        property: "og:description",
        content: "Propiedades de lujo seleccionadas en toda España. Agencia local de confianza, respuesta en 24h.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <ThemeProvider>
      <I18nProvider>
        <AssetsProvider>
          <Home />
        </AssetsProvider>
      </I18nProvider>
    </ThemeProvider>
  ),
});

function Home() {
  const { t } = useI18n();
  const { items, add, update, remove, reset } = useProperties();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [active, setActive] = useState<Property | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  const filtered = useMemo(() => applyFilters(items, filters), [items, filters]);
  const featured = useMemo(() => items.filter((p) => p.featured).slice(0, 3), [items]);

  function patchFilters(p: Partial<Filters>) {
    setFilters((f) => ({ ...f, ...p }));
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onAdmin={() => setAdminOpen(true)} />

      <Hero onSearch={(q) => patchFilters({ query: q })} />
      <TrustStrip />

      {/* Featured */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {t("featured.eyebrow")}
                </span>
                <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {t("featured.title")}
                </h2>
                <p className="mt-3 max-w-xl text-foreground/70">
                  {t("featured.subtitle")}
                </p>
              </div>
              <a
                href="#properties"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {t("featured.viewAll")}
              </a>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <PropertyCard property={p} onClick={() => setActive(p)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <About />

      {/* Full grid */}
      <section id="properties" className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {t("props.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t("props.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
                {t("props.subtitle")}
              </p>
            </div>
          </Reveal>

          <div className="mt-8 sm:mt-10">
            <FilterBar filters={filters} onChange={patchFilters} resultCount={filtered.length} />
          </div>

          {filtered.length === 0 ? (
            <div className="mt-12 rounded-2xl bg-secondary/40 p-10 text-center sm:mt-16 sm:p-12">
              <h3 className="text-xl font-semibold">{t("props.empty.title")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("props.empty.body")}</p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t("props.empty.reset")}
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 6) * 60}>
                  <PropertyCard property={p} onClick={() => setActive(p)} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Reviews />
      <Contact />
      <Footer />

      <PropertyModal property={active} onClose={() => setActive(null)} />
      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        items={items}
        add={add}
        update={update}
        remove={remove}
        reset={reset}
      />
    </div>
  );
}
