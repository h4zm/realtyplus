import aboutImg from "@/assets/about-team.jpg";
import { Reveal } from "./Reveal";

const stats = [
  { value: "320+", label: "Properties Sold" },
  { value: "1.4k", label: "Happy Clients" },
  { value: "12", label: "Years Experience" },
];

export function About() {
  return (
    <section id="about" className="bg-secondary/40 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={aboutImg}
              alt="RealtyPlus team in their Vitoria-Gasteiz office"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            About RealtyPlus
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            A premium agency built on trust and transparency.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75">
            We are a premium real estate agency based in Vitoria-Gasteiz, Spain, helping clients find
            high-value properties with transparency and trust. Our team blends deep local expertise
            with modern technology to deliver a calm, confident buying experience.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-card p-5 text-center shadow-soft transition-transform hover:-translate-y-1"
              >
                <div className="text-3xl font-bold tracking-tight text-primary">{s.value}</div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
