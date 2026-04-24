import { useEffect, useState } from "react";
import type { Property, PropertyType } from "@/lib/realty/types";
import { formatEUR } from "@/lib/realty/store";
import { useI18n } from "@/lib/realty/i18n";
import { useAssets, fileToDataUrl } from "@/lib/realty/assets";

interface Props {
  open: boolean;
  onClose: () => void;
  items: Property[];
  add: (p: Omit<Property, "id" | "createdAt">) => void;
  update: (id: string, patch: Partial<Property>) => void;
  remove: (id: string) => void;
  reset: () => void;
}

const PASSWORD = "chris911";

const emptyForm = {
  title: "",
  location: "",
  price: "",
  bedrooms: "2",
  bathrooms: "1",
  area: "80",
  type: "apartment" as PropertyType,
  featured: false,
  description: "",
  images: [] as string[],
};

type FormState = typeof emptyForm;

export function AdminPanel({ open, onClose, items, add, update, remove, reset }: Props) {
  const { t } = useI18n();
  const { logo, about, setLogo, setAbout, resetLogo, resetAssets } = useAssets();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    if (!open) {
      setPw("");
      setErr("");
      setEditingId(null);
      setForm(emptyForm);
    }
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function tryLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pw === PASSWORD) {
      setAuthed(true);
      setErr("");
    } else {
      setErr(t("admin.wrongPw"));
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const arr = await Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(String(r.result));
            r.onerror = reject;
            r.readAsDataURL(file);
          }),
      ),
    );
    setForm((f) => ({ ...f, images: [...f.images, ...arr] }));
  }

  function startEdit(p: Property) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      location: p.location,
      price: String(p.price),
      bedrooms: String(p.bedrooms),
      bathrooms: String(p.bathrooms),
      area: String(p.area),
      type: p.type,
      featured: p.featured,
      description: p.description,
      images: p.images,
    });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.location || !form.price) return;
    const payload: Omit<Property, "id" | "createdAt"> = {
      title: form.title,
      location: form.location,
      price: Number(form.price) || 0,
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0,
      area: Number(form.area) || 0,
      type: form.type,
      featured: form.featured,
      description: form.description,
      images: form.images.length ? form.images : ["https://placehold.co/800x600?text=No+Image"],
    };
    if (editingId) update(editingId, payload);
    else add(payload);
    setForm(emptyForm);
    setEditingId(null);
  }

  const input =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="fixed inset-0 z-[90] flex items-stretch justify-center bg-black/60 p-0 backdrop-blur-sm sm:p-6">
      <div className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden bg-background shadow-lift sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold tracking-tight sm:text-lg">{t("admin.title")}</h2>
            <p className="truncate text-xs text-muted-foreground">{t("admin.subtitle")}</p>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-secondary hover:bg-muted"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {!authed ? (
          <div className="flex flex-1 items-center justify-center p-5 sm:p-6">
            <form onSubmit={tryLogin} className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-soft sm:p-7">
              <h3 className="text-xl font-bold">{t("admin.restricted")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t("admin.enterPw")}</p>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder={t("admin.password")}
                className={input + " mt-5"}
                autoFocus
              />
              {err && <p className="mt-2 text-xs text-cta">{err}</p>}
              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t("admin.unlock")}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid flex-1 overflow-hidden md:grid-cols-2">
            {/* Form */}
            <form onSubmit={submit} className="flex flex-col gap-3 overflow-y-auto border-b border-border p-5 sm:p-6 md:border-b-0 md:border-r">
              <h3 className="text-base font-semibold">
                {editingId ? t("admin.edit") : t("admin.add")}
              </h3>
              <input
                placeholder={t("admin.t.title")}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className={input}
                required
              />
              <input
                placeholder={t("admin.t.location")}
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className={input}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder={t("admin.t.price")}
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className={input}
                  required
                />
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as PropertyType }))}
                  className={input}
                >
                  <option value="apartment">{t("filter.apartment")}</option>
                  <option value="villa">{t("filter.villa")}</option>
                  <option value="penthouse">{t("filter.penthouse")}</option>
                  <option value="townhouse">{t("filter.townhouse")}</option>
                  <option value="studio">{t("filter.studio")}</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" placeholder={t("admin.t.beds")} value={form.bedrooms} onChange={(e) => setForm((f) => ({ ...f, bedrooms: e.target.value }))} className={input} />
                <input type="number" placeholder={t("admin.t.baths")} value={form.bathrooms} onChange={(e) => setForm((f) => ({ ...f, bathrooms: e.target.value }))} className={input} />
                <input type="number" placeholder={t("admin.t.area")} value={form.area} onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))} className={input} />
              </div>
              <textarea
                placeholder={t("admin.t.desc")}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className={input + " min-h-[100px] resize-y"}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                />
                {t("admin.featured")}
              </label>

              <div>
                <label className="text-sm font-medium">{t("admin.images")}</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                  className="mt-1 block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
                />
                {form.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {form.images.map((src, i) => (
                      <div key={i} className="relative">
                        <img src={src} alt="" className="h-16 w-full rounded-md object-cover" />
                        <button
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))}
                          className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-cta text-[10px] text-cta-foreground"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  {editingId ? t("admin.save") : t("admin.addBtn")}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setForm(emptyForm);
                      setEditingId(null);
                    }}
                    className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
                  >
                    {t("admin.cancel")}
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm(t("admin.confirmReset"))) reset();
                }}
                className="text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                {t("admin.reset")}
              </button>

              {/* Branding / site assets */}
              <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-4">
                <h4 className="text-sm font-semibold">{t("admin.branding")}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{t("admin.brandingHint")}</p>

                {/* Logo */}
                <div className="mt-4">
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("admin.logo")}
                  </label>
                  <div className="mt-2 flex items-center gap-3 rounded-xl bg-white p-2 shadow-soft">
                    <img src={logo} alt="" className="h-10 w-auto object-contain" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setLogo(await fileToDataUrl(file));
                      e.target.value = "";
                    }}
                    className="mt-3 block w-full text-xs file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <button
                    type="button"
                    onClick={() => resetLogo()}
                    className="mt-2 text-xs text-muted-foreground underline-offset-2 hover:underline"
                  >
                    {t("admin.removeLogo")}
                  </button>
                </div>

                {/* About image */}
                <div className="mt-5">
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("admin.aboutImg")}
                  </label>
                  <div className="mt-2">
                    <img src={about} alt="" className="h-24 w-full rounded-lg object-cover shadow-soft" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setAbout(await fileToDataUrl(file));
                      e.target.value = "";
                    }}
                    className="mt-3 block w-full text-xs file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <button
                    type="button"
                    onClick={() => resetAssets()}
                    className="mt-2 text-xs text-muted-foreground underline-offset-2 hover:underline"
                  >
                    {t("admin.resetAbout")}
                  </button>
                </div>
              </div>
            </form>

            {/* List */}
            <div className="overflow-y-auto p-5 sm:p-6">
              <h3 className="text-base font-semibold">
                {t("admin.list")} <span className="text-muted-foreground">({items.length})</span>
              </h3>
              <div className="mt-4 space-y-3">
                {items.map((p) => (
                  <div key={p.id} className="flex gap-3 rounded-xl border border-border bg-card p-3 shadow-soft">
                    <img src={p.images[0]} alt={p.title} className="h-16 w-20 flex-shrink-0 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-1 text-sm font-semibold">{p.title}</div>
                      <div className="line-clamp-1 text-xs text-muted-foreground">{p.location}</div>
                      <div className="mt-1 text-sm font-bold text-primary">{formatEUR(p.price)}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => startEdit(p)} className="rounded-md bg-secondary px-3 py-1 text-xs font-semibold hover:bg-muted">
                        {t("admin.editBtn")}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`${t("admin.confirmDelete")} "${p.title}"?`)) remove(p.id);
                        }}
                        className="rounded-md bg-cta px-3 py-1 text-xs font-semibold text-cta-foreground hover:bg-cta-hover"
                      >
                        {t("admin.deleteBtn")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
