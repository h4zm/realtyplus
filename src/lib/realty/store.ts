import { useEffect, useState, useCallback } from "react";
import type { Property } from "./types";
import { seedProperties } from "./seed";

const KEY = "realtyplus.properties.v1";

function load(): Property[] {
  if (typeof window === "undefined") return seedProperties;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return seedProperties;
    const parsed = JSON.parse(raw) as Property[];
    if (!Array.isArray(parsed) || parsed.length === 0) return seedProperties;
    return parsed;
  } catch {
    return seedProperties;
  }
}

function save(items: Property[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch (err) {
    console.warn("RealtyPlus: localStorage save failed", err);
  }
}

export function useProperties() {
  const [items, setItems] = useState<Property[]>(seedProperties);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) save(items);
  }, [items, hydrated]);

  const add = useCallback((p: Omit<Property, "id" | "createdAt">) => {
    setItems((prev) => [
      { ...p, id: `rp-${Date.now()}`, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const update = useCallback((id: string, patch: Partial<Property>) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const reset = useCallback(() => setItems(seedProperties), []);

  return { items, add, update, remove, reset, hydrated };
}

export function formatEUR(n: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}
