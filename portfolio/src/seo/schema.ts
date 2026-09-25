// JSON-LD. Only facts that are true and visible on the site: no ratings,
// no street address, no founding date, no client counts.
import { SITE_URL, BRAND, CONTACT_EMAIL, PRICES } from "../config";
import { SERVICE_VALUE } from "../i18n/routes";
import { ROUTES, type Lang, type ServiceKey } from "../i18n/routes";
import { site } from "../i18n/site";
import { services } from "../i18n/services";

const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#kevin`;
const abs = (path: string) => new URL(path, SITE_URL).href;
const KEYS: ServiceKey[] = ["websites", "webapps", "automation"];
const ADDRESS = { "@type": "PostalAddress", addressLocality: "Emmen", addressRegion: "Drenthe", addressCountry: "NL" };
const AREA = [
  { "@type": "City", name: "Emmen" },
  { "@type": "AdministrativeArea", name: "Drenthe" },
  { "@type": "Country", name: "Nederland" },
];

export function homeSchema(lang: Lang) {
  const t = site[lang];
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: abs(ROUTES.home[lang]),
      name: BRAND,
      inLanguage: lang,
      publisher: { "@id": ORG_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: BRAND,
      url: abs(ROUTES.home[lang]),
      email: CONTACT_EMAIL,
      logo: abs("/favicon.svg"),
      image: abs(`/og/home-${lang}.png`),
      description: t.meta.home.description,
      knowsLanguage: ["nl", "en"],
      address: ADDRESS,
      areaServed: AREA,
      founder: { "@id": PERSON_ID },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: t.nav.solutions,
        itemListElement: KEYS.map((key) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: services[lang][key].name,
            description: services[lang][key].meta.description,
            url: abs(ROUTES[key][lang]),
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Kevin",
      jobTitle: lang === "nl" ? "Ontwerper en bouwer van websites, webapps en automatiseringen" : "Designer and builder of websites, web apps and automations",
      worksFor: { "@id": ORG_ID },
      homeLocation: { "@type": "Place", address: ADDRESS },
      image: abs(`/og/home-${lang}.png`),
      knowsLanguage: ["nl", "en"],
    },
  ];
}

export function serviceSchema(lang: Lang, key: ServiceKey) {
  const s = services[lang][key];
  const url = abs(ROUTES[key][lang]);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: s.name,
      serviceType: s.schemaType,
      description: s.meta.description,
      url,
      inLanguage: lang,
      provider: { "@type": "ProfessionalService", "@id": ORG_ID, name: BRAND, url: abs(ROUTES.home[lang]), address: ADDRESS },
      areaServed: AREA,
      ...(PRICES[SERVICE_VALUE[key]] !== null && {
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: PRICES[SERVICE_VALUE[key]],
            priceCurrency: "EUR",
            valueAddedTaxIncluded: false,
          },
        },
      }),
      audience: { "@type": "BusinessAudience", name: lang === "nl" ? "Ondernemers en bedrijven" : "Entrepreneurs and businesses" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: s.faq.items.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Kevin Rebuilds", item: abs(ROUTES.home[lang]) },
        { "@type": "ListItem", position: 2, name: s.name, item: url },
      ],
    },
  ];
}
