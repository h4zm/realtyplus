import { useEffect, useState } from "react";
import type { Property } from "@/lib/realty/types";
import { formatEUR } from "@/lib/realty/store";

interface Props {
  property: Property | null;
  onClose: () => void;
}

export function PropertyModal({ property, onClose }: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [property?.id]);

  useEffect(() => {
    if (!property) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property]);

  if (!property) return null;
  const imgs = property.images.length ? property.images : [""];

  function next() {
    setIdx((i) => (i + 1) % imgs.length);
  }
  function prev() {
    setIdx((i) => (i - 1 + imgs.length) % imgs.length);
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-2 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-card shadow-lift md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gallery */}
        <div className="relative bg-black md:w-3/5">
          <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full">
            <img
              src={imgs[idx]}
              alt={`${property.title} — image ${idx + 1}`}
              className="h-full w-full object-cover transition-opacity duration-500"
            />
          </div>
          {imgs.length > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={prev}
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full glass text-foreground shadow-soft transition hover:scale-110"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full glass text-foreground shadow-soft transition hover:scale-110"
              >
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {imgs.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Show image ${i + 1}`}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:w-2/5 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                {property.type}
              </span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight">{property.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{property.location}</p>
            </div>
            <button
              aria-label="Close"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground hover:bg-muted"
            >
              ✕
            </button>
          </div>

          <div className="mt-5 text-3xl font-bold text-foreground">
            {formatEUR(property.price)}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-secondary/60 p-4 text-center">
            <div>
              <div className="text-xl font-bold">{property.bedrooms}</div>
              <div className="text-xs text-muted-foreground">Bedrooms</div>
            </div>
            <div>
              <div className="text-xl font-bold">{property.bathrooms}</div>
              <div className="text-xs text-muted-foreground">Bathrooms</div>
            </div>
            <div>
              <div className="text-xl font-bold">{property.area}</div>
              <div className="text-xs text-muted-foreground">m²</div>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-foreground/80">
            {property.description}
          </p>

          <div className="mt-auto flex flex-col gap-2 pt-6">
            <a
              href={`https://wa.me/34676297766?text=${encodeURIComponent(`Hi RealtyPlus, I'm interested in "${property.title}" (${property.id}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-foreground shadow-cta transition-all hover:-translate-y-0.5 hover:bg-cta-hover"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 3.5A11 11 0 0 0 3.6 17.3L2 22l4.8-1.6A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.9 1 1-2.8-.2-.3a9 9 0 1 1 7 3.6Zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.2-.7.9-.9 1.1-.3.1-.6 0-1.2-.4-2.3-1.4a8.6 8.6 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5a2 2 0 0 0 .3-.5.5.5 0 0 0 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7c.1.2 1.9 2.9 4.6 4 2.7 1 2.7.7 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z" />
              </svg>
              Contact via WhatsApp
            </a>
            <a
              href="tel:+34676297766"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Call +34 676 29 77 66
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
