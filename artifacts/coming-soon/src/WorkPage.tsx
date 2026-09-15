import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { Preview, initialLanguage, type Translate } from "./App";

type Language = "nl" | "en";
const email = "webwinkelzakelijk@gmail.com";
const languageKey = "kevin-rebuilds-language";

type WorkProject = {
  name: string;
  category: string;
  tagline: string;
  description: string;
  focus: string;
  preview: number;
  live?: boolean;
  url?: string;
};

export default function WorkPage() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const t: Translate = (nl, en) => (language === "nl" ? nl : en);
  const base = import.meta.env.BASE_URL;
  const projects: WorkProject[] = [
    {
      name: "Different Hair!",
      category: t(
        "Live website · design & development",
        "Live website · design & development",
      ),
      tagline: t(
        "Een salon die online net zo eigen voelt.",
        "A salon that feels just as distinctive online.",
      ),
      description: t(
        "Een uitgesproken website voor de one-man kapsalon van Frank Meichsner in Emmen. Sterke typografie, speelse collage-elementen, klantreviews en een interactieve rondleiding brengen de sfeer van de salon online tot leven.",
        "A bold website for Frank Meichsner's one-man hair salon in Emmen. Strong typography, playful collage elements, customer reviews and an interactive tour bring the salon atmosphere to life online.",
      ),
      focus: t(
        "Concept, webdesign, copy en responsive development",
        "Concept, web design, copy and responsive development",
      ),
      preview: 3,
      live: true,
      url: "https://differenthair.nl",
    },
    {
      name: "Forma Studio",
      category: t("Webdesign & development", "Web design & development"),
      tagline: t(
        "Een digitale plek met karakter.",
        "A digital place with character.",
      ),
      description: t(
        "Een concept voor een interieurstudio dat rustige typografie, ruimtelijke beelden en een heldere route naar het werk samenbrengt. Het ontwerp voelt verfijnd, maar blijft eenvoudig te gebruiken.",
        "An interior studio concept combining quiet typography, spatial imagery and a clear path to the work. The design feels refined while staying simple to use.",
      ),
      focus: t(
        "Visuele identiteit, webdesign en responsive development",
        "Visual identity, web design and responsive development",
      ),
      preview: 0,
    },
    {
      name: "Ritme",
      category: "App & product design",
      tagline: t("Kleine stappen, op jouw manier.", "Small steps, your way."),
      description: t(
        "Een appconcept dat dagelijkse gewoontes overzichtelijk en prettig maakt. Eén rustig scherm, haalbare acties en directe feedback geven de gebruiker houvast zonder druk.",
        "An app concept that makes daily habits clear and enjoyable. One calm screen, achievable actions and immediate feedback give the user structure without pressure.",
      ),
      focus: t(
        "UX-design, interfaceontwerp en interactie",
        "UX design, interface design and interaction",
      ),
      preview: 1,
    },
    {
      name: "Flowdesk",
      category: t("Systemen & automatisering", "Systems & automation"),
      tagline: t(
        "Meer overzicht. Minder handwerk.",
        "More clarity. Less busywork.",
      ),
      description: t(
        "Een systeemconcept dat aanvragen, afspraken en opvolging verbindt. Iedere stap heeft een duidelijke status, zodat werk blijft bewegen en er minder tussen losse tools verdwijnt.",
        "A system concept connecting enquiries, appointments and follow-ups. Every step has a clear status, keeping work moving with less falling between separate tools.",
      ),
      focus: t(
        "Procesontwerp, automatisering en dashboarddesign",
        "Process design, automation and dashboard design",
      ),
      preview: 2,
    },
  ];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t("Werk | Kevin Rebuilds", "Work | Kevin Rebuilds");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        t(
          "Bekijk het conceptwerk van Kevin Rebuilds: websites, apps en slimme systemen.",
          "Explore concept work by Kevin Rebuilds: websites, apps and smart systems.",
        ),
      );
  }, [language]);

  function changeLanguage(next: Language) {
    setLanguage(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
    try {
      localStorage.setItem(languageKey, next);
    } catch {
      // The language switch remains functional without local storage.
    }
  }

  return (
    <div className="site-shell work-page" id="top">
      <a className="skip-link" href="#work-list">
        {t("Ga naar projecten", "Skip to projects")}
      </a>
      <header className="site-header">
        <a className="brand" href={base} aria-label="Kevin Rebuilds">
          kevin<span>rebuilds.</span>
        </a>
        <nav aria-label={t("Hoofdnavigatie", "Main navigation")}>
          <a href={`${base}werk/`} aria-current="page">
            {t("Werk", "Work")}
          </a>
          <a href={`${base}#about`}>{t("Over mij", "About")}</a>
          <a href={`${base}#process`}>{t("Werkwijze", "Process")}</a>
          <a href={`${base}#contact`}>Contact</a>
        </nav>
        <div
          className="language-switch"
          role="group"
          aria-label={t("Taal", "Language")}
        >
          <button
            lang="nl"
            aria-label="Nederlands"
            aria-pressed={language === "nl"}
            onClick={() => changeLanguage("nl")}
          >
            NL
          </button>
          <span>/</span>
          <button
            lang="en"
            aria-label="English"
            aria-pressed={language === "en"}
            onClick={() => changeLanguage("en")}
          >
            EN
          </button>
        </div>
      </header>

      <main>
        <section className="work-hero">
          <div>
            <span className="eyebrow">
              {t("MIJN WERK / SELECTIE 2026", "MY WORK / SELECTED 2026")}
            </span>
            <h1>
              {t("Ideeën die je", "Ideas you can")}
              <br />
              <span>{t("kunt beleven.", "experience.")}</span>
            </h1>
          </div>
          <div className="work-hero-copy">
            <p>
              {t(
                "Websites, apps en systemen met een duidelijke functie en een eigen uitstraling. Hieronder zie je hoe ik ideeën vertaal naar iets tastbaars.",
                "Websites, apps and systems with a clear purpose and a distinctive identity. Below, you can see how I turn ideas into something tangible.",
              )}
            </p>
            <a href={base} className="back-link">
              <ArrowLeft size={16} />
              {t("Terug naar home", "Back to home")}
            </a>
          </div>
        </section>

        <div className="work-list" id="work-list">
          {projects.map((project, index) => (
            <article className="work-showcase" key={project.name}>
              <div
                className="work-visual"
                aria-label={t(
                  "Interactieve conceptpreview",
                  "Interactive concept preview",
                )}
              >
                <Preview index={project.preview} t={t} interactive />
              </div>
              <div className="work-case-copy">
                <span className="eyebrow">
                  0{index + 1} /{" "}
                  {project.live
                    ? t("LIVE PROJECT", "LIVE PROJECT")
                    : t("CONCEPTPROJECT", "CONCEPT PROJECT")}
                </span>
                <span className="work-category">{project.category}</span>
                <h2>{project.name}</h2>
                <h3>{project.tagline}</h3>
                <p>{project.description}</p>
                <dl>
                  <dt>{t("Mijn focus", "My focus")}</dt>
                  <dd>{project.focus}</dd>
                </dl>
                <a
                  className="text-link"
                  href={
                    project.url ??
                    `mailto:${email}?subject=${encodeURIComponent(
                      t(
                        `Een project zoals ${project.name}`,
                        `A project like ${project.name}`,
                      ),
                    )}`
                  }
                  target={project.live ? "_blank" : undefined}
                  rel={project.live ? "noreferrer" : undefined}
                >
                  {project.live
                    ? t("Bekijk de live website", "View the live website")
                    : t(
                        "Bespreek een soortgelijk idee",
                        "Discuss a similar idea",
                      )}
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="work-disclaimer">
          {t(
            "Different Hair is een live klantproject. De overige projecten zijn conceptwerk en laten mijn ontwerp- en ontwikkelmogelijkheden zien.",
            "Different Hair is a live client project. The remaining projects are concept work illustrating my design and development capabilities.",
          )}
        </p>

        <section className="work-contact">
          <div>
            <span className="eyebrow">
              {t("JOUW PROJECT KAN HIERNA KOMEN", "YOUR PROJECT COULD BE NEXT")}
            </span>
            <h2>
              {t("Zullen we iets", "Shall we make")}{" "}
              <span>{t("moois maken?", "something great?")}</span>
            </h2>
          </div>
          <a className="button button-primary" href={`mailto:${email}`}>
            <Mail size={19} />
            {t("Mail me je idee", "Email me your idea")}
            <ArrowUpRight size={19} />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href={base}>
          kevin<span>rebuilds.</span>
        </a>
        <span>
          © {new Date().getFullYear()} ·{" "}
          {t(
            "Met aandacht bedacht. Met plezier gebouwd.",
            "Thoughtfully designed. Happily built.",
          )}
        </span>
        <a href="#top">
          {t("Terug naar boven", "Back to top")}
          <ArrowUpRight size={15} />
        </a>
      </footer>
    </div>
  );
}
