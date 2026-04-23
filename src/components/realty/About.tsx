import aboutImg from "@/assets/about-team.jpg";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/realty/i18n";

export function About() {
  const { t } = useI18n();
  const stats = [
    { value: "320+", label: t("about.stat1") },
    { value: "1.4k", label: t("about.stat2") },
    { value: "12", label: t("about.stat3") },
  ];

  return (
    <section id="about" className="bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="overflow-hidden rounded-2xl shadow-lift sm:rounded-3xl">
            <img
              src={aboutImg}
              alt="Equipo de RealtyPlus en su oficina de Vitoria-Gasteiz"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t("about.eyebrow")}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("about.title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75">
            {t("about.body")}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-card p-4 text-center shadow-soft transition-transform hover:-translate-y-1 sm:p-5"
              >
                <div className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-[11px] font-medium leading-tight text-muted-foreground sm:text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
