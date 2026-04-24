import { useEffect, useState } from "react";
import { LangToggle, useI18n } from "@/lib/realty/i18n";
import { ThemeToggle } from "@/lib/realty/theme";
import { useAssets } from "@/lib/realty/assets";

export function Navbar({ onAdmin }: { onAdmin: () => void }) {
  const { t } = useI18n();
  const { logo } = useAssets();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#properties", label: t("nav.properties") },
    { href: "#about", label: t("nav.about") },
    { href: "#reviews", label: t("nav.reviews") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLight = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        onLight ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a
          href="#top"
          aria-label="RealtyPlus — Inicio"
          className={`flex items-center transition-all ${
            onLight
              ? ""
              : "rounded-xl bg-white/95 px-3 py-1.5 shadow-soft backdrop-blur"
          }`}
        >
          <img
            src={logo}
            alt="RealtyPlus"
            className="h-12 w-auto object-contain sm:h-14"
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                onLight ? "text-foreground/80" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onAdmin}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              onLight ? "text-foreground/60" : "text-white/70"
            }`}
          >
            {t("nav.admin")}
          </button>
          <LangToggle className={onLight ? "text-foreground/80" : "text-white/90"} />
          <ThemeToggle className={onLight ? "text-foreground/80" : "text-white/90"} />
          <a
            href="https://wa.me/34676297766"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-cta-foreground shadow-cta transition-all hover:-translate-y-0.5 hover:bg-cta-hover"
          >
            {t("nav.whatsapp")}
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className={onLight ? "text-foreground/80" : "text-white/90"} />
          <LangToggle className={onLight ? "text-foreground/80" : "text-white/90"} />
          <button
            aria-label={t("nav.menu")}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-9 w-9 place-items-center rounded-full ${onLight ? "text-foreground hover:bg-secondary" : "text-white"}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-base font-medium text-foreground/85"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onAdmin();
              }}
              className="border-b border-border/60 py-3 text-left text-base font-medium text-foreground/60"
            >
              {t("nav.admin")}
            </button>
            <a
              href="https://wa.me/34676297766"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-cta px-5 py-3 text-sm font-semibold text-cta-foreground shadow-cta"
            >
              {t("nav.whatsapp")} +34 676 29 77 66
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
