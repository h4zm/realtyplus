import heroImg from "@/assets/hero-villa.jpg";

interface Props {
  onSearch: (q: string) => void;
}

export function Hero({ onSearch }: Props) {
  return (
    <section id="top" className="relative isolate min-h-[92vh] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Luxury Spanish villa with infinity pool at sunset"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />

      <div className="mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-6 pt-28 text-center">
        <span className="animate-fade-up rounded-full glass-dark px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/90">
          Premium Real Estate · Spain
        </span>
        <h1 className="mt-6 animate-fade-up text-balance text-5xl font-bold leading-[1.05] text-white drop-shadow-lg sm:text-6xl md:text-7xl">
          Find Your Dream Property in Spain
        </h1>
        <p className="mt-6 max-w-2xl animate-fade-up text-balance text-lg text-white/90 md:text-xl">
          Luxury apartments, villas, and homes — curated for you by Vitoria-Gasteiz&apos;s most trusted agency.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            onSearch(String(fd.get("q") ?? ""));
            document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-10 flex w-full max-w-2xl animate-fade-up items-center gap-2 rounded-full glass p-2 shadow-lift"
        >
          <svg
            className="ml-3 h-5 w-5 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            name="q"
            placeholder="Search city, neighbourhood or property…"
            className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Search
          </button>
        </form>

        <div className="mt-8 flex animate-fade-up flex-col items-center gap-3 sm:flex-row">
          <a
            href="#properties"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Browse Properties
          </a>
          <a
            href="https://wa.me/34676297766"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-3 text-sm font-semibold text-cta-foreground shadow-cta transition-all hover:-translate-y-0.5 hover:bg-cta-hover"
          >
            Contact Agent
          </a>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = [
    "Trusted Local Agency",
    "24h Response Time",
    "Verified Property Network",
    "Legal Assistance Included",
  ];
  return (
    <div className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-3 px-6 py-5 text-sm text-foreground/80 md:grid-cols-4">
        {items.map((t) => (
          <div key={t} className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary">
              ✓
            </span>
            <span className="font-medium">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
