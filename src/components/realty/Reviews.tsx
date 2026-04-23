import { Reveal } from "./Reveal";

const reviews = [
  {
    name: "María González",
    city: "Vitoria-Gasteiz",
    text: "Amazing service, found my apartment in 2 weeks! The team handled every detail with care.",
  },
  {
    name: "Liam Foster",
    city: "London → Málaga",
    text: "Very professional and fast communication. Made buying from abroad feel effortless.",
  },
  {
    name: "Andrea Rossi",
    city: "Milan → Madrid",
    text: "Best real estate experience in Spain so far. Honest advice and excellent legal support.",
  },
  {
    name: "Sofía Ruiz",
    city: "Bilbao",
    text: "They listened, understood our budget and showed us only relevant homes. Highly recommend.",
  },
  {
    name: "Thomas Müller",
    city: "Berlin → Costa del Sol",
    text: "From first call to keys in hand — calm, transparent and professional. Five stars.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 15 8.6l7.2.7-5.4 4.9 1.6 7.1L12 17.8 5.6 21.3 7.2 14.2 1.8 9.3l7.2-.7L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Testimonials
            </span>
            <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
              Real stories from people who found their next home with RealtyPlus.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <article className="flex h-full flex-col rounded-2xl bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                <Stars />
                <p className="mt-4 flex-1 text-base leading-relaxed text-foreground/85">
                  “{r.text}”
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
                    {r.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
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
