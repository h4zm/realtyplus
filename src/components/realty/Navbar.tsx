import { useEffect, useState } from "react";

const links = [
  { href: "#properties", label: "Properties" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ onAdmin }: { onAdmin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground font-bold">
            R
          </span>
          <span className={`text-lg font-semibold tracking-tight ${scrolled ? "text-foreground" : "text-white drop-shadow"}`}>
            RealtyPlus
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-foreground/80" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onAdmin}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              scrolled ? "text-foreground/60" : "text-white/70"
            }`}
          >
            Admin
          </button>
          <a
            href="https://wa.me/34676297766"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-cta-foreground shadow-cta transition-all hover:-translate-y-0.5 hover:bg-cta-hover"
          >
            WhatsApp
          </a>
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden ${scrolled ? "text-foreground" : "text-white"}`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-foreground/80"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onAdmin();
              }}
              className="py-3 text-left text-sm font-medium text-foreground/60"
            >
              Admin
            </button>
            <a
              href="https://wa.me/34676297766"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-cta-foreground shadow-cta"
            >
              WhatsApp +34 676 29 77 66
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
