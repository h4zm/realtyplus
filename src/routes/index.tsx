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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RealtyPlus — Premium Real Estate in Spain" },
      {
        name: "description",
        content:
          "Discover luxury apartments, villas and homes in Spain with RealtyPlus, Vitoria-Gasteiz's trusted premium real estate agency.",
      },
      { property: "og:title", content: "RealtyPlus — Premium Real Estate in Spain" },
      {
        property: "og:description",
        content: "Curated luxury properties across Spain. Trusted local agency, 24h response.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
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

      {/* Featured preview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Handpicked
                </span>
                <h2 className="mt-2 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                  Featured Properties
                </h2>
                <p className="mt-3 max-w-xl text-foreground/70">
                  A curated selection of the most sought-after homes from our portfolio.
                </p>
              </div>
              <a
                href="#properties"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                View All Properties →
              </a>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <PropertyCard property={p} onClick={() => setActive(p)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <About />

      {/* Full grid + filters */}
      <section id="properties" className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Browse the catalogue
              </span>
              <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                All Properties
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
                Search, filter and sort across our full inventory.
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            <FilterBar filters={filters} onChange={patchFilters} resultCount={filtered.length} />
          </div>

          {filtered.length === 0 ? (
            <div className="mt-16 rounded-2xl bg-secondary/40 p-12 text-center">
              <h3 className="text-xl font-semibold">No properties match your filters</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or clearing some filters.
              </p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
