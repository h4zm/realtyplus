import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import aboutImg from "@/assets/about-team.jpg";

const KEY = "realtyplus.assets.v1";

interface AssetState {
  logo: string | null; // data URL or null = default "R" badge
  about: string; // data URL or default imported asset
}

const defaults: AssetState = {
  logo: null,
  about: aboutImg,
};

interface AssetCtx extends AssetState {
  setLogo: (dataUrl: string | null) => void;
  setAbout: (dataUrl: string) => void;
  resetAssets: () => void;
}

const Ctx = createContext<AssetCtx | null>(null);

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssetState>(defaults);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<AssetState>;
      setState({
        logo: typeof parsed.logo === "string" ? parsed.logo : null,
        about: typeof parsed.about === "string" && parsed.about ? parsed.about : aboutImg,
      });
    } catch {
      /* noop */
    }
  }, []);

  const persist = useCallback((next: AssetState) => {
    setState(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* noop */
    }
  }, []);

  const setLogo = useCallback(
    (dataUrl: string | null) => persist({ ...state, logo: dataUrl }),
    [persist, state],
  );
  const setAbout = useCallback(
    (dataUrl: string) => persist({ ...state, about: dataUrl }),
    [persist, state],
  );
  const resetAssets = useCallback(() => persist(defaults), [persist]);

  return (
    <Ctx.Provider value={{ ...state, setLogo, setAbout, resetAssets }}>{children}</Ctx.Provider>
  );
}

export function useAssets() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAssets must be used inside AssetsProvider");
  return c;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
