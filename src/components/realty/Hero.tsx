import heroImg from "@/assets/hero-villa.jpg";
import { useI18n } from "@/lib/realty/i18n";

interface Props {
  onSearch: (q: string) => void;
}

export function Hero({ onSearch }: Props) {
  const { t } = useI18n();
  return (
    <section id="top" className="relative isolate min-h-[88vh] w-full overflow-hidden sm:min-h-[92vh]">
      <img
        src={heroImg}
        alt="Villa de lujo en España con piscina infinita al atardecer"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />

      <div className="mx-auto flex min-h-[88vh] max-w-5xl flex-col items-center justify-center px-5 pt-24 pb-16 text-center sm:min-h-[92vh] sm:px-6 sm:pt-28">
        <span className="animate-fade-up rounded-full glass-dark px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white/90 sm:px-4 sm:text-xs">
          {t("hero.eyebrow")}
        </span>
        <h1 className="mt-5 animate-fade-up text-balance text-4xl font-bold leading-[1.05] text-white drop-shadow-lg sm:mt-6 sm:text-6xl md:text-7xl">
          {t("hero.title")}
        </h1>
        <p className="mt-5 max-w-2xl animate-fade-up text-balance text-base text-white/90 sm:mt-6 sm:text-lg md:text-xl">
          {t("hero.subtitle")}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            onSearch(String(fd.get("q") ?? ""));
            document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-8 flex w-full max-w-2xl animate-fade-up items-center gap-1.5 rounded-full glass p-1.5 shadow-lift sm:mt-10 sm:gap-2 sm:p-2"
        >
          <svg
            className="ml-2 h-4 w-4 flex-shrink-0 text-muted-foreground sm:ml-3 sm:h-5 sm:w-5"
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
            placeholder={t("hero.searchPlaceholder")}
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:px-2"
          />
          <button
            type="submit"
            className="flex-shrink-0 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 sm:px-5 sm:text-sm"
          >
            {t("hero.search")}
          </button>
        </form>

        <div className="mt-6 flex w-full animate-fade-up flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center">
          <a
            href="#properties"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            {t("hero.browse")}
          </a>
          <a
            href="https://wa.me/34676297766"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-3 text-sm font-semibold text-cta-foreground shadow-cta transition-all hover:-translate-y-0.5 hover:bg-cta-hover"
          >
            {t("hero.contact")}
          </a>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const { t } = useI18n();
  const items = [t("trust.1"), t("trust.2"), t("trust.3"), t("trust.4")];
  return (
    <div className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-3 px-5 py-5 text-xs text-foreground/80 sm:px-6 sm:text-sm md:grid-cols-4">
        {items.map((label) => (
          <div key={label} className="flex items-center gap-2">
            <span className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              ✓
            </span>
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
