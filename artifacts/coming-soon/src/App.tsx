import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Plus,
  X,
} from "lucide-react";

type Language = "nl" | "en";
export type Translate = (nl: string, en: string) => string;
const email = "webwinkelzakelijk@gmail.com";
const languageKey = "kevin-rebuilds-language";
const names = ["Forma Studio", "Ritme", "Flowdesk", "Different Hair!"];
function projectType(index: number, t: Translate) {
  return [
    t("Website", "Website"),
    t("App", "App"),
    t("Systeem", "System"),
    t("Recent werk", "Recent work"),
  ][index];
}
export function initialLanguage(): Language {
  const parameter = new URLSearchParams(window.location.search).get("lang");
  if (parameter === "en" || parameter === "nl") return parameter;
  try {
    return localStorage.getItem(languageKey) === "en" ? "en" : "nl";
  } catch {
    return "nl";
  }
}

export function PagePolish() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const header = document.querySelector<HTMLElement>(".site-header");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let interactionTimer = 0;

    const updateScroll = () => {
      const available = root.scrollHeight - window.innerHeight;
      const progress = available > 0 ? window.scrollY / available : 0;
      root.style.setProperty(
        "--scroll-progress",
        String(Math.min(1, Math.max(0, progress))),
      );
      header?.classList.toggle("is-compact", window.scrollY > 64);
    };

    const showGrid = () => {
      if (reduceMotion) return;
      body.classList.add("is-interacting");
      window.clearTimeout(interactionTimer);
      interactionTimer = window.setTimeout(
        () => body.classList.remove("is-interacting"),
        700,
      );
    };

    const cleanups: Array<() => void> = [];
    const magneticElements = document.querySelectorAll<HTMLElement>(".button");
    magneticElements.forEach((element) => {
      const move = (event: PointerEvent) => {
        if (reduceMotion || event.pointerType === "touch") return;
        const rect = element.getBoundingClientRect();
        const x = Math.max(
          -7,
          Math.min(7, (event.clientX - rect.left - rect.width / 2) * 0.13),
        );
        const y = Math.max(
          -5,
          Math.min(5, (event.clientY - rect.top - rect.height / 2) * 0.13),
        );
        element.style.setProperty("--magnetic-x", `${x}px`);
        element.style.setProperty("--magnetic-y", `${y}px`);
      };
      const reset = () => {
        element.style.setProperty("--magnetic-x", "0px");
        element.style.setProperty("--magnetic-y", "0px");
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      cleanups.push(() => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
      });
    });

    const tiltElements = document.querySelectorAll<HTMLElement>(
      ".project-card .scene, .recent-work-browser, .work-visual .scene",
    );
    tiltElements.forEach((element) => {
      element.classList.add("polish-tilt");
      const move = (event: PointerEvent) => {
        if (reduceMotion || event.pointerType === "touch") return;
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--tilt-x", `${-y * 2.2}deg`);
        element.style.setProperty("--tilt-y", `${x * 2.2}deg`);
        element.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`);
      };
      const reset = () => {
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
        element.style.setProperty("--shine-x", "-35%");
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      cleanups.push(() => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
        element.classList.remove("polish-tilt");
      });
    });

    const titles = document.querySelectorAll<HTMLElement>(
      "main h1, main section h2, .work-case-copy h2",
    );
    titles.forEach((title) => title.classList.add("title-rise"));
    root.classList.add("polish-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );
    titles.forEach((title) => observer.observe(title));

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    window.addEventListener("pointermove", showGrid, { passive: true });

    return () => {
      window.clearTimeout(interactionTimer);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      window.removeEventListener("pointermove", showGrid);
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      header?.classList.remove("is-compact");
      body.classList.remove("is-interacting");
      root.classList.remove("polish-ready");
      root.style.removeProperty("--scroll-progress");
      titles.forEach((title) =>
        title.classList.remove("title-rise", "is-visible"),
      );
    };
  }, []);

  return <div className="page-progress" aria-hidden="true" />;
}

export function Preview({
  index,
  t,
  interactive = false,
}: {
  index: number;
  t: Translate;
  interactive?: boolean;
}) {
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(3);
  useEffect(() => {
    if (step >= 3) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), 550);
    return () => window.clearTimeout(timer);
  }, [step]);
  if (index === 0)
    return (
      <div className="scene scene-web" aria-hidden={!interactive}>
        <div className="laptop">
          <div className="laptop-screen">
            <div className="device-nav">
              <span>
                FORMA<span className="tiny-star">✳</span>
              </span>
              <span>STUDIO / 01</span>
            </div>
            <div className="device-layout">
              <div className="device-title">
                {t("Een plek die bij je past.", "A space to call your own.")}
                <span>FORMA STUDIO</span>
              </div>
              <div className="architectural-object">
                <div />
              </div>
            </div>
            <div className="device-footer">
              <span>DESIGN & INTERIORS</span>
              <ArrowUpRight size={12} />
            </div>
          </div>
          <div className="laptop-base" />
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className="scene scene-app" aria-hidden={!interactive}>
        <div className="app-word">
          {t("kleine stappen.", "small steps.")}
          <br />
          <em>{t("jouw ritme.", "your rhythm.")}</em>
        </div>
        <div className="phone">
          <div className="phone-top">
            <span>9:41</span>
            <span>•••</span>
          </div>
          <span className="phone-brand">ritme.</span>
          <div className="phone-title">
            {t("Ruimte voor jezelf.", "Make room for yourself.")}
          </div>
          <div className={`habit-ring ${done ? "is-done" : ""}`}>
            <span>
              {done ? "3" : "2"}
              <small>/3</small>
            </span>
          </div>
          {interactive ? (
            <button
              className="habit"
              onClick={() => setDone(!done)}
              aria-pressed={done}
              aria-label={t("Vink gewoonte af", "Complete habit")}
            >
              <span className={done ? "checked" : ""}>
                {done && <Check size={12} />}
              </span>
              {t("Even naar buiten", "Go for a walk")}
            </button>
          ) : (
            <div className="habit">
              <span />
              {t("Even naar buiten", "Go for a walk")}
            </div>
          )}
          <div className="phone-home" />
        </div>
      </div>
    );
  if (index === 2)
    return (
      <div className="scene scene-system" aria-hidden={!interactive}>
        <div className="dashboard">
          <div className="dash-top">
            <span>
              flowdesk<span>◇</span>
            </span>
            <span className="dash-avatar">K</span>
          </div>
          <div className="dash-title">
            {t("Alles op zijn plek.", "Everything in place.")}
          </div>
          <div className="dash-rows">
            {[
              t("Nieuwe aanvraag", "New enquiry"),
              t("Afspraak ingepland", "Meeting scheduled"),
              t("Opvolging klaar", "Follow-up ready"),
            ].map((row, i) => (
              <div className={`dash-row ${i < step ? "complete" : ""}`} key={i}>
                <span className="dash-step">0{i + 1}</span>
                <span>{row}</span>
                <Check size={14} />
              </div>
            ))}
          </div>
          {interactive && (
            <>
              <button
                className="flow-button"
                onClick={() => setStep(0)}
                disabled={step < 3}
              >
                {t("Bekijk de flow", "Watch the flow")}
                <ArrowUpRight size={14} />
              </button>
              <span className="sr-only" role="status">
                {step === 3
                  ? t("Voorbeeldflow voltooid", "Example workflow complete")
                  : t("Voorbeeldflow gestart", "Example workflow started")}
              </span>
            </>
          )}
        </div>
      </div>
    );
  return (
    <div className="scene scene-live" aria-hidden={!interactive}>
      <img
        className="live-screenshot"
        src={`${import.meta.env.BASE_URL}images/different-hair-homepage.png`}
        alt={
          interactive
            ? t(
                "Screenshot van de homepage van Different Hair",
                "Screenshot of the Different Hair homepage",
              )
            : ""
        }
        loading="lazy"
      />
    </div>
  );
}

function ProjectCard({
  index,
  t,
  onOpen,
}: {
  index: number;
  t: Translate;
  onOpen: (index: number) => void;
}) {
  const category = [
    t("Webdesign & development", "Web design & development"),
    t("Appdesign & development", "App design & development"),
    t("Systemen & automatisering", "Systems & automation"),
    t(
      "Live website · ontwerp & development",
      "Live website · design & development",
    ),
  ][index];
  return (
    <article className={`project-card project-${index}`}>
      <button
        onClick={() => onOpen(index)}
        aria-label={`${t("Bekijk project", "View project")}: ${names[index]}`}
      >
        <Preview index={index} t={t} />
        <div className="project-copy">
          <div>
            <span className="project-category">{category}</span>
            <h2>{names[index]}</h2>
          </div>
          <span className="project-open">
            <ArrowUpRight size={21} />
          </span>
        </div>
        <span className={`project-label ${index === 3 ? "recent-label" : ""}`}>
          {projectType(index, t)}
        </span>
      </button>
    </article>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [selected, setSelected] = useState<number | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [openService, setOpenService] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const t: Translate = (nl, en) => (language === "nl" ? nl : en);
  const title = t(
    "Kevin Rebuilds | Websites, apps & slimme systemen",
    "Kevin Rebuilds | Websites, apps & smart systems",
  );
  const description = t(
    "Ik ben Kevin. Ik ontwerp en bouw websites, apps en automatiseringen. Persoonlijk contact, doordacht ontwerp en aandacht voor ieder detail.",
    "I'm Kevin. I design and build websites, apps and automations. Direct contact, thoughtful design and attention to every detail.",
  );
  const projects = [
    {
      description: t(
        "Een digitale plek met karakter voor een interieurstudio, met rustige typografie, ruimtelijke beelden en een heldere route naar het werk.",
        "A digital place with character for an interior studio, with quiet typography, spatial imagery and a clear path to the work.",
      ),
      focus: t(
        "Visuele identiteit · Webdesign · Responsive development",
        "Visual identity · Web design · Responsive development",
      ),
      idea: t(
        "De projecten krijgen de hoofdrol. Een rustige opbouw en duidelijke contactmomenten helpen bezoekers om van inspiratie naar een gesprek te gaan.",
        "The projects take centre stage. A calm structure and clear contact points help visitors move from inspiration to a conversation.",
      ),
    },
    {
      description: t(
        "Kleine stappen, op jouw manier. Een app die dagelijkse gewoontes overzichtelijk en prettig maakt, zonder druk of een overvolle interface.",
        "Small steps, your way. An app that makes daily habits clear and enjoyable, without pressure or an overloaded interface.",
      ),
      focus: t(
        "UX-design · Interfaceontwerp · Interactie",
        "UX design · Interface design · Interaction",
      ),
      idea: t(
        "Eén helder overzicht, kleine haalbare acties en directe feedback. Probeer een gewoonte af te vinken in de preview.",
        "One clear overview, small achievable actions and immediate feedback. Try completing a habit in the preview.",
      ),
    },
    {
      description: t(
        "Rust in je dagelijkse werk. Een systeem dat aanvragen, afspraken en opvolging samenbrengt in één overzichtelijk proces.",
        "Calm in your working day. A system bringing enquiries, appointments and follow-ups into one clear process.",
      ),
      focus: t(
        "Procesontwerp · Automatisering · Dashboard",
        "Process design · Automation · Dashboard",
      ),
      idea: t(
        "Een nieuwe aanvraag leidt tot een duidelijke volgende stap. De preview laat de stappen zien; er worden geen echte gegevens verstuurd.",
        "A new enquiry leads to a clear next step. The preview illustrates the workflow; it doesn't send any real data.",
      ),
    },
    {
      description: t(
        "Een uitgesproken website voor de one-man kapsalon van Frank Meichsner in Emmen. De site vertaalt zijn persoonlijke aanpak naar een eigenzinnige digitale salonervaring.",
        "A bold website for Frank Meichsner's one-man hair salon in Emmen. The site turns his personal approach into a distinctive digital salon experience.",
      ),
      focus: t(
        "Strategie · Webdesign · Copy · Responsive development",
        "Strategy · Web design · Copy · Responsive development",
      ),
      idea: t(
        "Sterke typografie, speelse collage-elementen, klantreviews en een interactieve rondleiding brengen de sfeer van de salon online tot leven. Bezoekers kunnen direct een afspraak plannen.",
        "Bold typography, playful collage elements, customer reviews and an interactive tour bring the salon atmosphere to life online. Visitors can book an appointment directly.",
      ),
    },
  ];
  const services = [
    [
      "Websites",
      t(
        "Een eigen uitstraling, een helder verhaal en een website die fijn werkt op ieder scherm.",
        "A distinctive identity, a clear story and a website that feels right on every screen.",
      ),
    ],
    [
      "Apps",
      t(
        "Van een eerste idee naar een tastbaar product, met aandacht voor hoe mensen het gebruiken.",
        "From an initial idea to a tangible product, with care for how people use it.",
      ),
    ],
    [
      t("Slimme systemen", "Smart systems"),
      t(
        "Minder losse taken, meer overzicht. Slimme verbindingen tussen de stappen in je werkdag.",
        "Fewer scattered tasks, more clarity. Smart connections between the steps in your working day.",
      ),
    ],
  ];
  const steps = [
    [
      t("Eerst begrijpen", "Understand first"),
      t(
        "We bespreken je idee, je doelgroep en wat je wilt bereiken. Je hoeft nog geen uitgewerkt plan te hebben.",
        "We talk about your idea, your audience and what you want to achieve. You don't need a finished brief.",
      ),
    ],
    [
      t("Samen vormgeven", "Shape it together"),
      t(
        "Ik vertaal het naar een heldere richting. Je ziet het ontwerp, geeft feedback en denkt mee voordat we verder bouwen.",
        "I turn it into a clear direction. You see the design, give feedback and help shape it before we build further.",
      ),
    ],
    [
      t("Bouwen & verfijnen", "Build & refine"),
      t(
        "Ik bouw, test en werk de details af. We lopen alles samen door, zodat je weet hoe het werkt.",
        "I build, test and polish the details. We walk through everything together, so you know how it works.",
      ),
    ],
  ];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    for (const property of ["og:title", "twitter:title"])
      document
        .querySelector(`meta[property="${property}"], meta[name="${property}"]`)
        ?.setAttribute("content", title);
    for (const property of ["og:description", "twitter:description"])
      document
        .querySelector(`meta[property="${property}"], meta[name="${property}"]`)
        ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", language === "nl" ? "nl_NL" : "en_GB");
  }, [language, title, description]);
  useEffect(() => {
    const update = () => setLanguage(initialLanguage());
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  useEffect(() => {
    const element = dialog.current;
    if (selected !== null && element && !element.open) element.showModal();
    if (selected === null) element?.close();
    if (selected === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);
  useEffect(() => {
    if (copyStatus === "idle") return;
    const timer = window.setTimeout(() => setCopyStatus("idle"), 4000);
    return () => clearTimeout(timer);
  }, [copyStatus]);
  function changeLanguage(next: Language) {
    setLanguage(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
    try {
      localStorage.setItem(languageKey, next);
    } catch {
      /* The switch works without storage. */
    }
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }
  return (
    <div className="site-shell" id="top">
      <PagePolish />
      <a className="skip-link" href="#main">
        {t("Ga naar inhoud", "Skip to content")}
      </a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Kevin Rebuilds">
          kevin<span>rebuilds.</span>
        </a>
        <nav aria-label={t("Hoofdnavigatie", "Main navigation")}>
          {["work", "about", "process", "contact"].map((id, index) => (
            <a
              key={id}
              href={index === 0 ? `${import.meta.env.BASE_URL}werk/` : `#${id}`}
            >
              {
                [
                  t("Werk", "Work"),
                  t("Over mij", "About"),
                  t("Werkwijze", "Process"),
                  "Contact",
                ][index]
              }
            </a>
          ))}
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
      <main id="main">
        <section
          className="portfolio-grid"
          id="work"
          aria-label={t(
            "Wat ik bouw en mijn recente werk",
            "What I build and my recent work",
          )}
        >
          <div className="intro-card">
            <span className="eyebrow">
              <i />
              {t(
                "WEBSITES · APPS · SLIMME SYSTEMEN",
                "WEBSITES · APPS · SMART SYSTEMS",
              )}
            </span>
            <h1>
              {t("Jouw idee.", "Your idea.")}
              <br />
              {t("Mijn aandacht.", "My attention.")}
              <br />
              <span>{t("Sterk resultaat.", "Built to work.")}</span>
            </h1>
            <p className="intro-description">
              {t(
                "Ik ontwerp en bouw websites, apps en slimme systemen die sterk ogen, snel werken en prettig zijn in gebruik.",
                "I design and build websites, apps and smart systems that look distinctive, work fast and feel effortless to use.",
              )}
            </p>
            <a className="button button-primary" href="#contact">
              {t("Laten we iets maken", "Let’s make something")}
              <ArrowUpRight size={19} />
            </a>
            <a className="person" href="#about">
              <img
                src={`${import.meta.env.BASE_URL}images/kevin-friendly.webp`}
                width="86"
                height="86"
                alt="Kevin"
                fetchPriority="high"
              />
              <span>
                <strong>{t("Hoi, ik ben Kevin.", "Hi, I’m Kevin.")}</strong>
                <span>
                  {t(
                    "De persoon achter je project.",
                    "The person behind your project.",
                  )}
                </span>
              </span>
              <ArrowDown size={17} />
            </a>
          </div>
          <div className="project-carousel-wrap">
            <div className="carousel-hint" aria-hidden="true">
              <span>
                {t("Swipe door wat ik bouw", "Swipe through what I build")}
              </span>
              <ArrowUpRight size={16} />
            </div>
            <div className="project-carousel">
              <ProjectCard index={0} t={t} onOpen={setSelected} />
              <ProjectCard index={1} t={t} onOpen={setSelected} />
              <ProjectCard index={2} t={t} onOpen={setSelected} />
            </div>
          </div>
          <div className="services-card">
            <span className="eyebrow">
              {t("DIT BOUW IK VOOR JOU", "WHAT I CAN BUILD FOR YOU")}
            </span>
            <h2>
              {t("Creatief denken.", "Creative thinking.")}
              <br />
              {t("Praktisch maken.", "Practical making.")}
            </h2>
            <div className="services">
              {services.map(([service, text], index) => (
                <details key={index} open={openService === index}>
                  <summary
                    aria-expanded={openService === index}
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenService(openService === index ? null : index);
                    }}
                  >
                    <span>
                      <small>0{index + 1}</small>
                      {service}
                    </span>
                    <Plus size={18} />
                  </summary>
                  <p>{text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <p className="portfolio-note">
          {t(
            "Drie duidelijke voorbeelden van wat ik bouw: websites, apps en slimme systemen.",
            "Three clear examples of what I build: websites, apps and smart systems.",
          )}
        </p>
        <section
          className="recent-work-section"
          aria-labelledby="recent-work-title"
        >
          <div className="recent-work-copy">
            <span className="eyebrow">
              {t("RECENT WERK / LIVE WEBSITE", "RECENT WORK / LIVE WEBSITE")}
            </span>
            <h2 id="recent-work-title">Different Hair!</h2>
            <p>
              {t(
                "Een uitgesproken website voor de one-man kapsalon van Frank Meichsner in Emmen. Van strategie en webdesign tot copy en responsive development.",
                "A bold website for Frank Meichsner's one-man hair salon in Emmen. From strategy and web design to copy and responsive development.",
              )}
            </p>
            <a
              className="button button-primary"
              href="https://differenthair.nl"
              target="_blank"
              rel="noreferrer"
            >
              {t("Bekijk de live website", "View the live website")}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <a
            className="recent-work-browser"
            href="https://differenthair.nl"
            target="_blank"
            rel="noreferrer"
            aria-label={t(
              "Bekijk Different Hair live",
              "View Different Hair live",
            )}
          >
            <span className="browser-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <small>differenthair.nl</small>
            </span>
            <img
              src={
                import.meta.env.BASE_URL + "images/different-hair-homepage.png"
              }
              alt={t(
                "Screenshot van de homepage van Different Hair",
                "Screenshot of the Different Hair homepage",
              )}
              width="1440"
              height="900"
              loading="lazy"
            />
            <span className="browser-link">
              {t("Open live", "Open live")}
              <ArrowUpRight size={17} />
            </span>
          </a>
        </section>
        <section className="about-section" id="about">
          <div className="about-photo">
            <img
              src={`${import.meta.env.BASE_URL}images/kevin-head-portrait.webp`}
              alt={t(
                "Kevin in zijn creatieve werkruimte",
                "Kevin in his creative workspace",
              )}
              width="1122"
              height="1402"
              loading="lazy"
            />
            <span>
              {t(
                "Een maker. Korte lijnen. Veel aandacht.",
                "One maker. Direct contact. Real attention.",
              )}
            </span>
          </div>
          <div className="about-copy">
            <span className="eyebrow">
              {t("DE MAKER ACHTER DE PIXELS", "THE MAKER BEHIND THE PIXELS")}
            </span>
            <h2>
              {t("Nieuwsgierig van nature.", "Curious by nature.")}
              <br />
              <span>{t("Maker in hart en nieren.", "A maker at heart.")}</span>
            </h2>
            <p>
              {t(
                "Ik ben Kevin. Ik vind het bijzonder om iets dat eerst alleen in je hoofd bestaat, echt te zien werken. Een website, een product of een systeem dat je dag makkelijker maakt. Daar krijg ik energie van.",
                "I'm Kevin. I love seeing something that started as an idea become something real. A website, a product or a system that makes your day easier. That's what gives me energy.",
              )}
            </p>
            <p>
              {t(
                "Die nieuwsgierigheid heeft me van content en social media naar een eigen webshop en digitale producten gebracht. Verschillende projecten, steeds dezelfde vraag: wat maakt iets waardevol voor de mensen die het gebruiken?",
                "That curiosity has taken me from content and social media to my own online store and digital products. Different projects, always the same question: what makes something valuable to the people using it?",
              )}
            </p>
            <p>
              {t(
                "Buiten het scherm ben ik vader van drie. Ik werk graag met mensen die ergens voor gaan. Met korte lijnen, eerlijk advies en aandacht voor de details. Je werkt rechtstreeks met mij, van de eerste vraag tot de laatste afwerking.",
                "Away from the screen, I'm a dad of three. I enjoy working with people who care about what they do. Expect direct communication, honest advice and attention to the details. You work with me, from the first question to the finishing touches.",
              )}
            </p>
            <a className="text-link" href="#contact">
              {t("Vertel me wat je bezighoudt", "Tell me what’s on your mind")}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="process-section" id="process">
          <span className="eyebrow">
            {t("ZO WERKEN WE SAMEN", "HOW WE WORK TOGETHER")}
          </span>
          <h2>
            {t(
              "Van eerste gesprek tot laatste detail.",
              "From first conversation to final detail.",
            )}
          </h2>
          <div className="process-grid">
            {steps.map(([heading, text], index) => (
              <article key={index}>
                <span className="step-number">0{index + 1}</span>
                <h3>{heading}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div>
            <span className="eyebrow">
              {t(
                "EEN GOED PROJECT BEGINT MET EEN GESPREK",
                "A GOOD PROJECT STARTS WITH A CONVERSATION",
              )}
            </span>
            <h2>
              {t("Wat wil jij", "What would you")}
              <br />
              <span>{t("maken?", "like to make?")}</span>
            </h2>
            <p>
              {t(
                "Een idee, een vraag of een ‘zou het kunnen…?’ is genoeg. Vertel me waar je aan denkt.",
                "An idea, a question or a ‘could we…?’ is enough. Tell me what you have in mind.",
              )}
            </p>
          </div>
          <div className="contact-actions">
            <a
              className="button button-primary"
              href={`mailto:${email}?subject=${encodeURIComponent(t("Een idee voor mijn bedrijf", "An idea for my business"))}`}
            >
              <Mail size={19} />
              {t("Mail me je idee", "Email me your idea")}
              <ArrowUpRight size={19} />
            </a>
            <a
              className="button button-secondary"
              href="https://www.fiverr.com/s/NeBXK68"
              target="_blank"
              rel="noreferrer"
            >
              {t("Werk met mij via Fiverr", "Work with me on Fiverr")}
              <ArrowUpRight size={18} />
            </a>
            <div className="email-row">
              <a href={`mailto:${email}`}>{email}</a>
              <button
                aria-label={t("Kopieer e-mailadres", "Copy email address")}
                onClick={copyEmail}
              >
                {copyStatus === "copied" ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
            <span className="copy-status" role="status">
              {copyStatus === "copied"
                ? t("E-mailadres gekopieerd", "Email address copied")
                : copyStatus === "failed"
                  ? t(
                      "Kopiëren lukt niet. Je kunt het adres hierboven selecteren.",
                      "Couldn't copy. You can select the address above.",
                    )
                  : ""}
            </span>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="brand" href="#top">
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
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-title"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            "button:not(:disabled), a[href], input:not(:disabled)",
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              setSelected(null);
          }
        }}
      >
        {selected !== null && (
          <>
            <div className="dialog-heading">
              <span className="eyebrow">
                {projectType(selected, t)} / 0{selected + 1}
              </span>
              <button
                className="close-button"
                onClick={() => setSelected(null)}
                aria-label={t("Sluiten", "Close")}
              >
                <X size={22} />
              </button>
            </div>
            <div
              className="dialog-preview"
              aria-label={t("Visuele projectpreview", "Visual project preview")}
            >
              <Preview key={selected} index={selected} t={t} interactive />
            </div>
            <div className="dialog-copy">
              <h2 id="project-title">{names[selected]}</h2>
              <p>{projects[selected].description}</p>
              <h3>{t("Mijn focus", "My focus")}</h3>
              <p>{projects[selected].focus}</p>
              <h3>{t("Het idee", "The idea")}</h3>
              <p>{projects[selected].idea}</p>
              <a
                className="button button-primary"
                href={selected === 3 ? "https://differenthair.nl" : "#contact"}
                target={selected === 3 ? "_blank" : undefined}
                rel={selected === 3 ? "noreferrer" : undefined}
                onClick={() => setSelected(null)}
              >
                {selected === 3
                  ? t("Bekijk de live website", "View the live website")
                  : t(
                      "Zoiets voor jouw bedrijf?",
                      "Something like this for your business?",
                    )}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
