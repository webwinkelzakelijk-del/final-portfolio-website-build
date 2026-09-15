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
  url: string;
};

export default function WorkPage() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const t: Translate = (nl, en) => (language === "nl" ? nl : en);
  const base = import.meta.env.BASE_URL;
  const projects: WorkProject[] = [
    {
      name: "Different Hair!",
      category: t(
        "Live website · webdesign & development",
        "Live website · web design & development",
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
        "Strategie, webdesign, copy en responsive development",
        "Strategy, web design, copy and responsive development",
      ),
      preview: 3,
      url: "https://differenthair.nl",
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
          "Bekijk de klantprojecten die Kevin Rebuilds heeft ontworpen en gebouwd.",
          "Explore the client projects designed and built by Kevin Rebuilds.",
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
              {t("KLANTPROJECTEN / SELECTIE", "CLIENT PROJECTS / SELECTED")}
            </span>
            <h1>
              {t("Gemaakt voor klanten.", "Made for clients.")}
              <br />
              <span>{t("Nu live.", "Now live.")}</span>
            </h1>
          </div>
          <div className="work-hero-copy">
            <p>
              {t(
                "Hier verzamel ik werk dat ik voor echte klanten heb ontworpen en gebouwd. Different Hair is het eerste project in deze groeiende selectie.",
                "This is where I collect work designed and built for real clients. Different Hair is the first project in this growing selection.",
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
                  "Interactieve projectpreview",
                  "Interactive project preview",
                )}
              >
                <Preview index={project.preview} t={t} interactive />
              </div>
              <div className="work-case-copy">
                <span className="eyebrow">
                  0{index + 1} / {t("KLANTPROJECT", "CLIENT PROJECT")}
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
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("Bekijk de live website", "View the live website")}
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>

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
