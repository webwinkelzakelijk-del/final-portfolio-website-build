export type Lang = "nl" | "en";
export type PageKey = "home" | "websites" | "webapps" | "automation" | "thanks";
export type ServiceKey = "websites" | "webapps" | "automation";

/** Every page exists in both languages; the language switch uses this map. */
export const ROUTES: Record<PageKey, Record<Lang, string>> = {
  home: { nl: "/", en: "/en/" },
  websites: { nl: "/websites/", en: "/en/websites/" },
  webapps: { nl: "/webapps/", en: "/en/web-apps/" },
  automation: { nl: "/automatisering/", en: "/en/automation/" },
  thanks: { nl: "/bedankt/", en: "/en/thank-you/" },
};

/** Section anchors on the homepage, per language. */
export const ANCHORS: Record<Lang, { solutions: string; examples: string; process: string; about: string; request: string }> = {
  nl: { solutions: "oplossingen", examples: "voorbeelden", process: "werkwijze", about: "over-kevin", request: "aanvragen" },
  en: { solutions: "solutions", examples: "examples", process: "process", about: "about-kevin", request: "request" },
};

/** Value used by the form's service choice. */
export const SERVICE_VALUE: Record<ServiceKey, "website" | "webapp" | "automation"> = {
  websites: "website",
  webapps: "webapp",
  automation: "automation",
};
