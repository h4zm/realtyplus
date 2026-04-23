import { useEffect, useState } from "react";
import type { Property, PropertyType } from "@/lib/realty/types";
import { formatEUR } from "@/lib/realty/store";

interface Props {
  open: boolean;
  onClose: () => void;
  items: Property[];
  add: (p: Omit<Property, "id" | "createdAt">) => void;
  update: (id: string, patch: Partial<Property>) => void;
  remove: (id: string) => void;
  reset: () => void;
}

const PASSWORD = "1122";

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

  if (!open) return null;

  function tryLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pw === PASSWORD) {
      setAuthed(true);
      setErr("");
    } else {
      setErr("Incorrect password.");
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
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="fixed inset-0 z-[90] flex items-stretch justify-center bg-black/60 p-0 backdrop-blur-sm sm:p-6">
      <div className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-none bg-background shadow-lift sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Admin Panel</h2>
            <p className="text-xs text-muted-foreground">RealtyPlus property management</p>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary hover:bg-muted"
            aria-label="Close admin"
          >
            ✕
          </button>
        </div>

        {!authed ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <form
              onSubmit={tryLogin}
              className="w-full max-w-sm rounded-2xl bg-card p-7 shadow-soft"
            >
              <h3 className="text-xl font-bold">Restricted access</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter the admin password to continue.
              </p>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Password"
                className={input + " mt-5"}
                autoFocus
              />
              {err && <p className="mt-2 text-xs text-cta">{err}</p>}
              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Unlock
              </button>
            </form>
          </div>
        ) : (
          <div className="grid flex-1 overflow-hidden md:grid-cols-2">
            {/* Form */}
            <form
              onSubmit={submit}
              className="flex flex-col gap-3 overflow-y-auto border-r border-border p-6"
            >
              <h3 className="text-base font-semibold">
                {editingId ? "Edit property" : "Add new property"}
              </h3>
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className={input}
                required
              />
              <input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className={input}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Price (EUR)"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className={input}
                  required
                />
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value as PropertyType }))
                  }
                  className={input}
                >
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="studio">Studio</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Beds"
                  value={form.bedrooms}
                  onChange={(e) => setForm((f) => ({ ...f, bedrooms: e.target.value }))}
                  className={input}
                />
                <input
                  type="number"
                  placeholder="Baths"
                  value={form.bathrooms}
                  onChange={(e) => setForm((f) => ({ ...f, bathrooms: e.target.value }))}
                  className={input}
                />
                <input
                  type="number"
                  placeholder="Area m²"
                  value={form.area}
                  onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
                  className={input}
                />
              </div>
              <textarea
                placeholder="Description"
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
                Mark as featured
              </label>

              <div>
                <label className="text-sm font-medium">Images</label>
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
                        <img
                          src={src}
                          alt={`upload ${i + 1}`}
                          className="h-16 w-full rounded-md object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              images: f.images.filter((_, idx) => idx !== i),
                            }))
                          }
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
                  {editingId ? "Save changes" : "Add property"}
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
                    Cancel
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Reset all properties to defaults? This will erase your changes."))
                    reset();
                }}
                className="text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                Reset to default seed
              </button>
            </form>

            {/* List */}
            <div className="overflow-y-auto p-6">
              <h3 className="text-base font-semibold">
                Properties <span className="text-muted-foreground">({items.length})</span>
              </h3>
              <div className="mt-4 space-y-3">
                {items.map((p) => (
                  <div
                    key={p.id}
                    className="flex gap-3 rounded-xl border border-border bg-card p-3 shadow-soft"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-16 w-20 flex-shrink-0 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-1 text-sm font-semibold">{p.title}</div>
                      <div className="line-clamp-1 text-xs text-muted-foreground">{p.location}</div>
                      <div className="mt-1 text-sm font-bold text-primary">
                        {formatEUR(p.price)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => startEdit(p)}
                        className="rounded-md bg-secondary px-3 py-1 text-xs font-semibold hover:bg-muted"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${p.title}"?`)) remove(p.id);
                        }}
                        className="rounded-md bg-cta px-3 py-1 text-xs font-semibold text-cta-foreground hover:bg-cta-hover"
                      >
                        Delete
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
