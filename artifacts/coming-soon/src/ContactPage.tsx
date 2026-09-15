import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  LoaderCircle,
  Mail,
  MessageCircle,
} from "lucide-react";
import { PagePolish, initialLanguage, type Translate } from "./App";

type Language = "nl" | "en";
const email = "webwinkelzakelijk@gmail.com";
const languageKey = "kevin-rebuilds-language";

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [projectType, setProjectType] = useState(0);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const t: Translate = (nl, en) => (language === "nl" ? nl : en);
  const base = import.meta.env.BASE_URL;
  const projectTypes = [
    ["Website", "Website"],
    ["App", "App"],
    ["Slim systeem", "Smart system"],
    ["Nog niet zeker", "Not sure yet"],
  ];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t("Contact | Kevin Rebuilds", "Contact | Kevin Rebuilds");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        t(
          "Vertel Kevin over je idee voor een website, app of slim systeem. Je hoeft nog geen uitgewerkt plan te hebben.",
          "Tell Kevin about your idea for a website, app or smart system. You don't need a finished plan yet.",
        ),
      );
  }, [language]);

  useEffect(() => {
    if (copyStatus === "idle") return;
    const timer = window.setTimeout(() => setCopyStatus("idle"), 3500);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

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

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (String(form.get("_honey") ?? "")) {
      setSubmitStatus("success");
      event.currentTarget.reset();
      return;
    }
    const name = String(form.get("name") ?? "").trim();
    const replyTo = String(form.get("email") ?? "").trim();
    const idea = String(form.get("idea") ?? "").trim();
    const selectedProjectType = t(
      projectTypes[projectType][0],
      projectTypes[projectType][1],
    );
    setSubmitStatus("submitting");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email: replyTo,
          project: selectedProjectType,
          message: idea,
          _subject: `Nieuw projectidee · ${selectedProjectType} · ${name}`,
          _template: "table",
          _url: window.location.href,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        success?: boolean | string;
      } | null;
      if (
        !response.ok ||
        result?.success === false ||
        result?.success === "false"
      ) {
        throw new Error("Form submission failed");
      }
      event.currentTarget.reset();
      setProjectType(0);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <div className="site-shell contact-page" id="top">
      <PagePolish />
      <a className="skip-link" href="#contact-form">
        {t("Ga naar het contactformulier", "Skip to the contact form")}
      </a>
      <header className="site-header">
        <a className="brand" href={base} aria-label="Kevin Rebuilds">
          kevin<span>rebuilds.</span>
        </a>
        <nav aria-label={t("Hoofdnavigatie", "Main navigation")}>
          <a href={`${base}werk/`}>{t("Werk", "Work")}</a>
          <a href={`${base}#about`}>{t("Over mij", "About")}</a>
          <a href={`${base}#process`}>{t("Werkwijze", "Process")}</a>
          <a href={`${base}contact/`} aria-current="page">
            Contact
          </a>
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
        <section className="contact-layout" aria-labelledby="contact-title">
          <div className="contact-intro-card">
            <span className="eyebrow">
              <i />
              {t("VERTEL ME WAT JE BEZIGHOUDT", "TELL ME WHAT'S ON YOUR MIND")}
            </span>
            <h1 id="contact-title">
              {t("Een goed idee", "A good idea")}
              <br />
              {t("begint met een", "starts with a")}
              <br />
              <span>{t("gesprek.", "conversation.")}</span>
            </h1>
            <p>
              {t(
                "Je hoeft nog geen briefing, planning of technische oplossing te hebben. Een idee, een vraag of een ‘zou dit kunnen?’ is genoeg.",
                "You don't need a brief, timeline or technical solution yet. An idea, a question or a ‘could this work?’ is enough.",
              )}
            </p>
            <div className="contact-person">
              <img
                src={`${base}images/kevin-friendly.webp`}
                width="86"
                height="86"
                alt="Kevin"
              />
              <span>
                <strong>
                  {t(
                    "Je spreekt direct met mij.",
                    "You speak directly with me.",
                  )}
                </strong>
                <small>
                  {t(
                    "Van eerste idee tot laatste detail.",
                    "From the first idea to the final detail.",
                  )}
                </small>
              </span>
              <span className="contact-signal" aria-hidden="true">
                <i />
                {t("Open voor ideeën", "Open to ideas")}
              </span>
            </div>
          </div>

          <div className="contact-form-card">
            <div className="contact-form-heading">
              <span className="eyebrow">
                {t("JOUW PROJECT / EERSTE STAP", "YOUR PROJECT / FIRST STEP")}
              </span>
              <h2>{t("Waar denk je aan?", "What do you have in mind?")}</h2>
              <p>
                {t(
                  "Vertel het in je eigen woorden. Na verzenden komt je bericht rechtstreeks in mijn inbox.",
                  "Tell me in your own words. When you send it, your message arrives directly in my inbox.",
                )}
              </p>
            </div>

            <form id="contact-form" onSubmit={submitContact}>
              <label className="contact-honeypot" aria-hidden="true">
                Website
                <input name="_honey" tabIndex={-1} autoComplete="off" />
              </label>
              <fieldset className="project-type-field">
                <legend>
                  {t("Wat wil je maken?", "What would you like to make?")}
                </legend>
                <div className="project-type-options">
                  {projectTypes.map(([nl, en], index) => {
                    const label = t(nl, en);
                    return (
                      <button
                        type="button"
                        key={nl}
                        className={projectType === index ? "is-selected" : ""}
                        aria-pressed={projectType === index}
                        onClick={() => setProjectType(index)}
                      >
                        {projectType === index && <Check size={14} />}
                        {label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="contact-fields-row">
                <label>
                  <span>{t("Je naam", "Your name")}</span>
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder={t(
                      "Hoe mag ik je noemen?",
                      "What should I call you?",
                    )}
                    required
                  />
                </label>
                <label>
                  <span>{t("Je e-mailadres", "Your email address")}</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="naam@bedrijf.nl"
                    required
                  />
                </label>
              </div>
              <label className="idea-field">
                <span>
                  {t("Vertel me over je idee", "Tell me about your idea")}
                </span>
                <textarea
                  name="idea"
                  rows={6}
                  placeholder={t(
                    "Wat wil je maken, voor wie en wat zou het moeten opleveren? Een paar zinnen is genoeg.",
                    "What would you like to make, who is it for and what should it achieve? A few sentences is enough.",
                  )}
                  required
                />
              </label>
              <div className="contact-form-footer">
                <span>
                  <MessageCircle size={16} />
                  {t(
                    "Geen verplichtingen. Eerst even kennismaken.",
                    "No obligations. Let's get acquainted first.",
                  )}
                </span>
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={submitStatus === "submitting"}
                >
                  {submitStatus === "submitting" ? (
                    <LoaderCircle className="submit-spinner" size={18} />
                  ) : submitStatus === "success" ? (
                    <Check size={18} />
                  ) : (
                    <Mail size={18} />
                  )}
                  {submitStatus === "submitting"
                    ? t("Even versturen…", "Sending…")
                    : submitStatus === "success"
                      ? t("Bericht verzonden", "Message sent")
                      : t("Versturen", "Send message")}
                  {submitStatus === "idle" && <ArrowUpRight size={18} />}
                </button>
              </div>
              <div
                className={`contact-form-status ${submitStatus}`}
                role="status"
                aria-live="polite"
              >
                {submitStatus === "success" ? (
                  <>
                    <Check size={17} />
                    {t(
                      "Dankjewel! Je bericht is verzonden. Ik neem persoonlijk contact met je op.",
                      "Thank you! Your message has been sent. I'll get back to you personally.",
                    )}
                  </>
                ) : submitStatus === "error" ? (
                  <>
                    {t(
                      "Verzenden lukte niet. Mail me rechtstreeks via",
                      "Sending failed. Email me directly at",
                    )}{" "}
                    <a href={`mailto:${email}`}>{email}</a>
                  </>
                ) : (
                  t(
                    "Je gegevens worden alleen gebruikt om op je bericht te reageren.",
                    "Your details are only used to respond to your message.",
                  )
                )}
              </div>
            </form>
          </div>
        </section>

        <section
          className="contact-expectations"
          aria-label={t("Wat je kunt verwachten", "What to expect")}
        >
          {[
            [
              t("01 / Persoonlijk", "01 / Personal"),
              t(
                "Ik lees ieder bericht zelf en je hebt rechtstreeks contact met mij.",
                "I read every message myself and you'll be in direct contact with me.",
              ),
            ],
            [
              t("02 / Eerlijk", "02 / Honest"),
              t(
                "Je krijgt een eerlijk beeld van wat slim, haalbaar en waardevol is.",
                "You'll get an honest view of what's smart, achievable and valuable.",
              ),
            ],
            [
              t("03 / Zonder druk", "03 / No pressure"),
              t(
                "We beginnen gewoon met een gesprek en bepalen daarna de beste stap.",
                "We simply start with a conversation and decide on the best next step after that.",
              ),
            ],
          ].map(([title, text]) => (
            <article key={title}>
              <span>{title}</span>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="direct-contact">
          <div>
            <span className="eyebrow">
              {t("LIEVER DIRECT?", "PREFER DIRECT?")}
            </span>
            <h2>
              {t(
                "Een gewone e-mail is ook goed.",
                "A regular email works too.",
              )}
            </h2>
          </div>
          <div className="direct-contact-actions">
            <div className="direct-email">
              <a href={`mailto:${email}`}>{email}</a>
              <button
                onClick={copyEmail}
                aria-label={t("Kopieer e-mailadres", "Copy email address")}
              >
                {copyStatus === "copied" ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}
              </button>
            </div>
            <span className="copy-status" role="status">
              {copyStatus === "copied"
                ? t("E-mailadres gekopieerd", "Email address copied")
                : copyStatus === "failed"
                  ? t("Kopiëren is niet gelukt", "Couldn't copy the address")
                  : ""}
            </span>
          </div>
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
