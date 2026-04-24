import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import aboutImg from "@/assets/about-team.jpg";
import defaultLogo from "@/assets/realtyplus-logo.png";

const KEY = "realtyplus.assets.v1";

interface AssetState {
  logo: string; // data URL or default brand logo
  about: string; // data URL or default imported asset
}

const defaults: AssetState = {
  logo: defaultLogo,
  about: aboutImg,
};

interface AssetCtx extends AssetState {
  setLogo: (dataUrl: string) => void;
  setAbout: (dataUrl: string) => void;
  resetLogo: () => void;
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
        logo: typeof parsed.logo === "string" && parsed.logo ? parsed.logo : defaultLogo,
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
    (dataUrl: string) => persist({ ...state, logo: dataUrl }),
    [persist, state],
  );
  const setAbout = useCallback(
    (dataUrl: string) => persist({ ...state, about: dataUrl }),
    [persist, state],
  );
  const resetLogo = useCallback(
    () => persist({ ...state, logo: defaultLogo }),
    [persist, state],
  );
  const resetAssets = useCallback(() => persist(defaults), [persist]);

  return (
    <Ctx.Provider value={{ ...state, setLogo, setAbout, resetLogo, resetAssets }}>
      {children}
    </Ctx.Provider>
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
