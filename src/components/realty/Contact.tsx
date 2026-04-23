import { Reveal } from "./Reveal";

const phones = [
  { label: "945 024 322", tel: "+34945024322" },
  { label: "662 262 867", tel: "+34662262867" },
  { label: "676 297 766", tel: "+34676297766" },
];

const emails = [
  "christopher.ogunwale@realty-plus.es",
  "sofia.rp.vitoria@gmail.com",
];

export function Contact() {
  return (
    <section id="contact" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Get in touch
            </span>
            <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Speak with a RealtyPlus agent today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
              Visit our office in Vitoria-Gasteiz, or reach us by WhatsApp, phone or email — we
              respond within 24 hours.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl bg-card p-7 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13Z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Office</h3>
              <p className="mt-2 text-sm text-foreground/75">
                Calle Antonio Machado, 35
                <br />
                Vitoria-Gasteiz, Spain
              </p>
              <a
                href="https://maps.app.goo.gl/AHNCXamtwdYt7Hit6?g_st=ipc"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex pt-5 text-sm font-semibold text-primary hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-2xl bg-card p-7 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92V21a1 1 0 0 1-1.1 1A19 19 0 0 1 2 4.1 1 1 0 0 1 3 3h4.1a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.3 1L7 10.5a16 16 0 0 0 6.5 6.5l1.7-1.8a1 1 0 0 1 1-.3l4 1a1 1 0 0 1 .8 1Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Call us</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className="text-foreground/80 hover:text-primary">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/34676297766"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-cta px-5 py-2.5 pt-2.5 text-sm font-semibold text-cta-foreground shadow-cta transition-all hover:-translate-y-0.5 hover:bg-cta-hover"
                style={{ marginTop: "auto" }}
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex h-full flex-col rounded-2xl bg-card p-7 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Email</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {emails.map((e) => (
                  <li key={e}>
                    <a href={`mailto:${e}`} className="break-all text-foreground/80 hover:text-primary">
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary text-xs font-bold text-primary-foreground">
            R
          </span>
          <span className="font-semibold text-foreground">RealtyPlus</span>
          <span>· Vitoria-Gasteiz, Spain</span>
        </div>
        <div>© {new Date().getFullYear()} RealtyPlus. All rights reserved.</div>
      </div>
    </footer>
  );
}
