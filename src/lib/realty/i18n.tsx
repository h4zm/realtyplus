import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, { es: string; en: string }>;

const dict: Dict = {
  // Nav
  "nav.properties": { es: "Propiedades", en: "Properties" },
  "nav.about": { es: "Nosotros", en: "About" },
  "nav.reviews": { es: "Opiniones", en: "Reviews" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.admin": { es: "Admin", en: "Admin" },
  "nav.whatsapp": { es: "WhatsApp", en: "WhatsApp" },
  "nav.menu": { es: "Menú", en: "Menu" },

  // Hero
  "hero.eyebrow": { es: "Inmobiliaria Premium · España", en: "Premium Real Estate · Spain" },
  "hero.title": { es: "Encuentra la Casa de tus Sueños en España", en: "Find Your Dream Property in Spain" },
  "hero.subtitle": {
    es: "Apartamentos de lujo, villas y hogares — seleccionados para ti por la agencia más confiable de Vitoria-Gasteiz.",
    en: "Luxury apartments, villas, and homes — curated for you by Vitoria-Gasteiz's most trusted agency.",
  },
  "hero.searchPlaceholder": {
    es: "Busca ciudad, barrio o propiedad…",
    en: "Search city, neighbourhood or property…",
  },
  "hero.search": { es: "Buscar", en: "Search" },
  "hero.browse": { es: "Ver Propiedades", en: "Browse Properties" },
  "hero.contact": { es: "Contactar Agente", en: "Contact Agent" },

  // Trust
  "trust.1": { es: "Agencia Local de Confianza", en: "Trusted Local Agency" },
  "trust.2": { es: "Respuesta en 24h", en: "24h Response Time" },
  "trust.3": { es: "Red de Propiedades Verificadas", en: "Verified Property Network" },
  "trust.4": { es: "Asistencia Legal Incluida", en: "Legal Assistance Included" },

  // Featured
  "featured.eyebrow": { es: "Selección exclusiva", en: "Handpicked" },
  "featured.title": { es: "Propiedades Destacadas", en: "Featured Properties" },
  "featured.subtitle": {
    es: "Una selección curada de los hogares más buscados de nuestro portfolio.",
    en: "A curated selection of the most sought-after homes from our portfolio.",
  },
  "featured.viewAll": { es: "Ver Todas las Propiedades →", en: "View All Properties →" },

  // About
  "about.eyebrow": { es: "Sobre RealtyPlus", en: "About RealtyPlus" },
  "about.title": {
    es: "Una agencia premium construida sobre la confianza y la transparencia.",
    en: "A premium agency built on trust and transparency.",
  },
  "about.body": {
    es: "Somos una agencia inmobiliaria premium con sede en Vitoria-Gasteiz, España, que ayuda a sus clientes a encontrar propiedades de alto valor con transparencia y confianza. Nuestro equipo combina un profundo conocimiento local con tecnología moderna para ofrecer una experiencia de compra serena y segura.",
    en: "We are a premium real estate agency based in Vitoria-Gasteiz, Spain, helping clients find high-value properties with transparency and trust. Our team blends deep local expertise with modern technology to deliver a calm, confident buying experience.",
  },
  "about.stat1": { es: "Propiedades Vendidas", en: "Properties Sold" },
  "about.stat2": { es: "Clientes Satisfechos", en: "Happy Clients" },
  "about.stat3": { es: "Años de Experiencia", en: "Years Experience" },

  // Properties section
  "props.eyebrow": { es: "Explora el catálogo", en: "Browse the catalogue" },
  "props.title": { es: "Todas las Propiedades", en: "All Properties" },
  "props.subtitle": {
    es: "Busca, filtra y ordena en todo nuestro inventario.",
    en: "Search, filter and sort across our full inventory.",
  },
  "props.empty.title": {
    es: "Ninguna propiedad coincide con tus filtros",
    en: "No properties match your filters",
  },
  "props.empty.body": {
    es: "Prueba a ajustar la búsqueda o a quitar algún filtro.",
    en: "Try adjusting your search or clearing some filters.",
  },
  "props.empty.reset": { es: "Restablecer filtros", en: "Reset filters" },

  // Filter
  "filter.search": { es: "Buscar por título…", en: "Search by title…" },
  "filter.location": { es: "Ubicación…", en: "Location…" },
  "filter.allTypes": { es: "Todos los tipos", en: "All types" },
  "filter.apartment": { es: "Apartamento", en: "Apartment" },
  "filter.villa": { es: "Villa", en: "Villa" },
  "filter.penthouse": { es: "Ático", en: "Penthouse" },
  "filter.townhouse": { es: "Adosado", en: "Townhouse" },
  "filter.studio": { es: "Estudio", en: "Studio" },
  "filter.anyBeds": { es: "Cualquier hab.", en: "Any beds" },
  "filter.bed1": { es: "1 hab.", en: "1 bed" },
  "filter.bed2": { es: "2 hab.", en: "2 beds" },
  "filter.bed3": { es: "3 hab.", en: "3 beds" },
  "filter.bed4": { es: "4+ hab.", en: "4+ beds" },
  "filter.newest": { es: "Más recientes", en: "Newest" },
  "filter.priceAsc": { es: "Precio: menor a mayor", en: "Price: low → high" },
  "filter.priceDesc": { es: "Precio: mayor a menor", en: "Price: high → low" },
  "filter.showing": { es: "Mostrando", en: "Showing" },
  "filter.results": { es: "propiedades", en: "properties" },

  // Card
  "card.featured": { es: "Destacada", en: "Featured" },
  "card.beds": { es: "hab.", en: "bd" },
  "card.baths": { es: "baños", en: "ba" },

  // Modal
  "modal.bedrooms": { es: "Habitaciones", en: "Bedrooms" },
  "modal.bathrooms": { es: "Baños", en: "Bathrooms" },
  "modal.area": { es: "m²", en: "m²" },
  "modal.whatsapp": { es: "Contactar por WhatsApp", en: "Contact via WhatsApp" },
  "modal.call": { es: "Llamar +34 676 29 77 66", en: "Call +34 676 29 77 66" },
  "modal.close": { es: "Cerrar", en: "Close" },
  "modal.prev": { es: "Anterior", en: "Previous" },
  "modal.next": { es: "Siguiente", en: "Next" },
  "modal.interest": {
    es: "Hola RealtyPlus, estoy interesado/a en",
    en: "Hi RealtyPlus, I'm interested in",
  },

  // Reviews
  "reviews.eyebrow": { es: "Testimonios", en: "Testimonials" },
  "reviews.title": { es: "Lo que Dicen Nuestros Clientes", en: "What Our Clients Say" },
  "reviews.subtitle": {
    es: "Historias reales de personas que encontraron su próximo hogar con RealtyPlus.",
    en: "Real stories from people who found their next home with RealtyPlus.",
  },
  "review.1": {
    es: "¡Servicio excelente, encontré mi apartamento en 2 semanas! El equipo cuidó cada detalle.",
    en: "Amazing service, found my apartment in 2 weeks! The team handled every detail with care.",
  },
  "review.2": {
    es: "Muy profesionales y comunicación rápida. Comprar desde el extranjero fue muy fácil.",
    en: "Very professional and fast communication. Made buying from abroad feel effortless.",
  },
  "review.3": {
    es: "La mejor experiencia inmobiliaria en España hasta ahora. Consejo honesto y excelente apoyo legal.",
    en: "Best real estate experience in Spain so far. Honest advice and excellent legal support.",
  },
  "review.4": {
    es: "Nos escucharon, entendieron nuestro presupuesto y solo nos enseñaron casas relevantes. Muy recomendable.",
    en: "They listened, understood our budget and showed us only relevant homes. Highly recommend.",
  },
  "review.5": {
    es: "Desde la primera llamada hasta tener las llaves: tranquilo, transparente y profesional. Cinco estrellas.",
    en: "From first call to keys in hand — calm, transparent and professional. Five stars.",
  },

  // Contact
  "contact.eyebrow": { es: "Contáctanos", en: "Get in touch" },
  "contact.title": {
    es: "Habla hoy con un agente de RealtyPlus",
    en: "Speak with a RealtyPlus agent today",
  },
  "contact.subtitle": {
    es: "Visita nuestra oficina en Vitoria-Gasteiz, o escríbenos por WhatsApp, teléfono o email — respondemos en 24 horas.",
    en: "Visit our office in Vitoria-Gasteiz, or reach us by WhatsApp, phone or email — we respond within 24 hours.",
  },
  "contact.office": { es: "Oficina", en: "Office" },
  "contact.openMaps": { es: "Abrir en Google Maps →", en: "Open in Google Maps →" },
  "contact.callUs": { es: "Llámanos", en: "Call us" },
  "contact.whatsappBtn": { es: "Chatear por WhatsApp", en: "Chat on WhatsApp" },
  "contact.email": { es: "Email", en: "Email" },
  "contact.instagram": { es: "Instagram", en: "Instagram" },
  "contact.followUs": { es: "Síguenos", en: "Follow us" },
  "contact.openInstagram": { es: "Abrir Instagram →", en: "Open Instagram →" },
  "footer.rights": { es: "Todos los derechos reservados.", en: "All rights reserved." },

  // Admin
  "admin.title": { es: "Panel de Administración", en: "Admin Panel" },
  "admin.subtitle": { es: "Gestión de propiedades RealtyPlus", en: "RealtyPlus property management" },
  "admin.restricted": { es: "Acceso restringido", en: "Restricted access" },
  "admin.enterPw": { es: "Introduce la contraseña para continuar.", en: "Enter the admin password to continue." },
  "admin.password": { es: "Contraseña", en: "Password" },
  "admin.wrongPw": { es: "Contraseña incorrecta.", en: "Incorrect password." },
  "admin.unlock": { es: "Desbloquear", en: "Unlock" },
  "admin.edit": { es: "Editar propiedad", en: "Edit property" },
  "admin.add": { es: "Añadir nueva propiedad", en: "Add new property" },
  "admin.t.title": { es: "Título", en: "Title" },
  "admin.t.location": { es: "Ubicación", en: "Location" },
  "admin.t.price": { es: "Precio (EUR)", en: "Price (EUR)" },
  "admin.t.beds": { es: "Hab.", en: "Beds" },
  "admin.t.baths": { es: "Baños", en: "Baths" },
  "admin.t.area": { es: "Área m²", en: "Area m²" },
  "admin.t.desc": { es: "Descripción", en: "Description" },
  "admin.featured": { es: "Marcar como destacada", en: "Mark as featured" },
  "admin.images": { es: "Imágenes", en: "Images" },
  "admin.save": { es: "Guardar cambios", en: "Save changes" },
  "admin.addBtn": { es: "Añadir propiedad", en: "Add property" },
  "admin.cancel": { es: "Cancelar", en: "Cancel" },
  "admin.reset": { es: "Restablecer a valores por defecto", en: "Reset to default seed" },
  "admin.list": { es: "Propiedades", en: "Properties" },
  "admin.editBtn": { es: "Editar", en: "Edit" },
  "admin.deleteBtn": { es: "Borrar", en: "Delete" },
  "admin.confirmReset": {
    es: "¿Restablecer todas las propiedades? Esto borrará tus cambios.",
    en: "Reset all properties to defaults? This will erase your changes.",
  },
  "admin.confirmDelete": { es: "¿Borrar", en: "Delete" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
}

const Ctx = createContext<I18nCtx | null>(null);
const KEY = "realtyplus.lang.v1";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "en" || saved === "es") setLangState(saved);
    } catch {
      /* noop */
    }
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* noop */
    }
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }

  const value = useMemo<I18nCtx>(
    () => ({
      lang,
      setLang,
      t: (key) => dict[key]?.[lang] ?? String(key),
    }),
    [lang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used inside I18nProvider");
  return c;
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      aria-label={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
      className={`inline-flex items-center gap-1 rounded-full border border-current/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-all hover:bg-current/10 ${className}`}
    >
      <span className={lang === "es" ? "opacity-100" : "opacity-50"}>ES</span>
      <span className="opacity-40">/</span>
      <span className={lang === "en" ? "opacity-100" : "opacity-50"}>EN</span>
    </button>
  );
}
