import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/realty/i18n";

const reviewers = [
  { name: "María González", city: "Vitoria-Gasteiz", key: "review.1" as const },
  { name: "Liam Foster", city: "London → Málaga", key: "review.2" as const },
  { name: "Andrea Rossi", city: "Milan → Madrid", key: "review.3" as const },
  { name: "Sofía Ruiz", city: "Bilbao", key: "review.4" as const },
  { name: "Thomas Müller", city: "Berlin → Costa del Sol", key: "review.5" as const },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5/5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 15 8.6l7.2.7-5.4 4.9 1.6 7.1L12 17.8 5.6 21.3 7.2 14.2 1.8 9.3l7.2-.7L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  const { t } = useI18n();
  return (
    <section id="reviews" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {t("reviews.eyebrow")}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t("reviews.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
              {t("reviews.subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {reviewers.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <article className="flex h-full flex-col rounded-2xl bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift sm:p-7">
                <Stars />
                <p className="mt-4 flex-1 text-base leading-relaxed text-foreground/85">
                  “{t(r.key)}”
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
                    {r.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.city}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
