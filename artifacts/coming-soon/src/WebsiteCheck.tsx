import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleHelp,
  Globe2,
  LoaderCircle,
  LockKeyhole,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import type { Translate } from "./App";
import "./website-check.css";

type CheckResult = {
  id: string;
  status: "pass" | "warn" | "fail" | "unknown";
  weight: number;
  value?: number;
  lcp?: number | null;
};
type Report = {
  id: string;
  domain: string;
  url: string;
  score: number | null;
  partial: boolean;
  checkedAt: string;
  copyrightYear: number | null;
  checks: CheckResult[];
};
// Keep production scans on the protected server while Vercel serves the portfolio.
const api = import.meta.env.PROD
  ? "https://hosting.kevinrebuilds.com/api/website-check"
  : `${import.meta.env.BASE_URL}api/website-check`;

export function WebsiteCheck({ t }: { t: Translate }) {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [sending, setSending] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [reference, setReference] = useState("");
  const [showForm, setShowForm] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const urlInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.location.hash !== "#website-check") return;
    const frame = requestAnimationFrame(() =>
      document.getElementById("website-check")?.scrollIntoView(),
    );
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (!scanning) return;
    const timer = window.setInterval(
      () => setElapsed((value) => value + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [scanning]);
  useEffect(() => {
    if (report) resultHeading.current?.focus({ preventScroll: true });
  }, [report]);
  useEffect(() => {
    if (showForm) nameInput.current?.focus({ preventScroll: true });
  }, [showForm]);
  useEffect(() => {
    if (reference) successHeading.current?.focus({ preventScroll: true });
  }, [reference]);

  function message(code: string) {
    if (code === "invalid_url" || code === "blocked_address")
      return t(
        "Vul een openbaar websiteadres in, bijvoorbeeld jouwbedrijf.nl.",
        "Enter a public website address, such as yourcompany.com.",
      );
    if (code === "rate_limited")
      return t(
        "Je hebt meerdere checks gedaan. Probeer het over een uur opnieuw.",
        "You have made several checks. Please try again in an hour.",
      );
    if (code === "busy")
      return t(
        "Het is even druk. Probeer het over een minuut nog eens.",
        "The scanner is busy. Please try again in a minute.",
      );
    if (["unreachable", "unreadable", "page_too_large"].includes(code))
      return t(
        "Deze website kon ik niet uitlezen. Controleer het adres. Sommige websites blokkeren automatische checks.",
        "I could not read this website. Check the address. Some sites block automated checks.",
      );
    if (code === "scan_expired")
      return t(
        "Je uitslag is verlopen. Doe een nieuwe check en vraag je demo opnieuw aan.",
        "Your result has expired. Run a new check and request your demo again.",
      );
    if (code === "invalid_form")
      return t(
        "Controleer je naam, e-mailadres en toestemming.",
        "Please check your name, email and consent.",
      );
    return t(
      "De verbinding lukt even niet. Probeer het opnieuw of mail me via de contactsectie.",
      "The connection is unavailable. Please try again or email me using the contact section.",
    );
  }

  async function runScan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (scanning) return;
    let target: URL;
    try {
      target = new URL(
        /^[a-z]+:\/\//i.test(url.trim()) ? url.trim() : `https://${url.trim()}`,
      );
      if (
        !["http:", "https:"].includes(target.protocol) ||
        !target.hostname.includes(".") ||
        target.username ||
        target.password ||
        target.port
      )
        throw new Error();
    } catch {
      setError(message("invalid_url"));
      urlInput.current?.focus();
      return;
    }
    const abort = new AbortController();
    controller.current = abort;
    setScanning(true);
    setError("");
    setElapsed(0);
    setReport(null);
    setReference("");
    setShowForm(false);
    setLeadError("");
    const timeout = window.setTimeout(() => abort.abort("timeout"), 85000);
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target.origin }),
        signal: abort.signal,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      if (!data.id || !Array.isArray(data.checks))
        throw new Error("server_error");
      setReport(data);
    } catch (failure) {
      if (abort.signal.reason !== "cancelled")
        setError(
          message(failure instanceof Error ? failure.message : "server_error"),
        );
    } finally {
      window.clearTimeout(timeout);
      setScanning(false);
    }
  }

  async function requestDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!report || sending) return;
    const form = new FormData(event.currentTarget);
    setSending(true);
    setLeadError("");
    try {
      const response = await fetch(`${api}/demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          scanId: report.id,
          name: form.get("name"),
          email: form.get("email"),
          note: form.get("note"),
          consent: form.get("consent") === "on",
          companyWebsite: form.get("companyWebsite"),
          language: t("nl", "en"),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok)
        throw new Error(data.error || "server_error");
      setReference(data.reference);
    } catch (failure) {
      setLeadError(
        message(failure instanceof Error ? failure.message : "server_error"),
      );
    } finally {
      setSending(false);
    }
  }

  const labels: Record<string, [string, string, string]> = {
    https: [
      t("Veilige verbinding", "Secure connection"),
      t(
        "HTTPS is bereikbaar met een geldig certificaat.",
        "HTTPS is reachable with a valid certificate.",
      ),
      t(
        "De pagina is alleen via HTTP uitgelezen. Controleer HTTPS en je certificaat.",
        "The page was only readable over HTTP. Check HTTPS and your certificate.",
      ),
    ],
    viewport: [
      t("Mobiele basis", "Mobile essentials"),
      t(
        "De pagina past de viewport aan het scherm aan.",
        "The page sets its viewport to the screen width.",
      ),
      t(
        "Geen device-width instelling gevonden in de HTML.",
        "No device-width setting found in the HTML.",
      ),
    ],
    title: [
      t("Paginatitel", "Page title"),
      t("Een paginatitel is aanwezig.", "A page title is present."),
      t(
        "Geen paginatitel gevonden in de HTML.",
        "No page title found in the HTML.",
      ),
    ],
    description: [
      t("Zoekbeschrijving", "Search description"),
      t("Een meta-description is aanwezig.", "A meta description is present."),
      t(
        "Geen meta-description gevonden in de HTML.",
        "No meta description found in the HTML.",
      ),
    ],
    speed: [t("Snelheid op mobiel", "Mobile performance"), "", ""],
  };
  const icons = {
    https: ShieldCheck,
    viewport: MonitorSmartphone,
    title: Search,
    description: Search,
    speed: Zap,
  };
  const formatScore = (value: number) =>
    value.toLocaleString(t("nl-NL", "en-GB"), { maximumFractionDigits: 1 });

  return (
    <section
      className="website-check"
      id="website-check"
      aria-labelledby="website-check-title"
    >
      <div className="wc-intro">
        <span className="eyebrow">
          <span className="wc-live-dot" />
          {t("GRATIS WEBSITE-CHECK", "FREE WEBSITE CHECK")}
        </span>
        <h2 id="website-check-title">
          {t("Werkt jouw website", "Is your website working")}
          <br />
          <span>{t("ook voor jou?", "for you?")}</span>
        </h2>
        <p>
          {t(
            "Je krijgt maar één eerste indruk. Ontdek waar jouw website sterk is en waar kansen liggen.",
            "You only get one first impression. Discover your website’s strengths and where it can improve.",
          )}
        </p>
        <div className="wc-benefits">
          <span>
            <Check size={16} />
            {t("Direct inzicht", "Instant insights")}
          </span>
          <span>
            <Check size={16} />
            {t("Geen e-mail nodig", "No email needed")}
          </span>
          <span>
            <Check size={16} />
            {t("Helemaal gratis", "Completely free")}
          </span>
        </div>
        <div className="wc-human">
          <img
            src={`${import.meta.env.BASE_URL}images/kevin-head-portrait.webp`}
            alt="Kevin"
            width="44"
            height="44"
            loading="lazy"
          />
          <p>
            {t("Zie je ruimte voor verbetering?", "Room for improvement?")}
            <strong>
              {t(
                "Ik laat je gratis zien wat er mogelijk is.",
                "I’ll show you what’s possible, for free.",
              )}
            </strong>
          </p>
        </div>
      </div>
      <div className="wc-panel">
        <div className="wc-panel-top">
          <span>
            <Globe2 size={16} />
            {t(
              "Jouw website, onder de loep.",
              "A closer look at your website.",
            )}
          </span>
          <span className="wc-free">{t("GRATIS", "FREE")}</span>
        </div>
        <form onSubmit={runScan} className="wc-scan-form" aria-busy={scanning}>
          <label htmlFor="wc-url">
            {t("Wat is je websiteadres?", "What is your website address?")}
          </label>
          <div className="wc-url-row">
            <div className="wc-url-input">
              <Globe2 size={20} aria-hidden="true" />
              <input
                ref={urlInput}
                id="wc-url"
                name="url"
                type="text"
                inputMode="url"
                autoComplete="url"
                autoCapitalize="none"
                spellCheck={false}
                placeholder={t("jouwbedrijf.nl", "yourcompany.com")}
                required
                maxLength={500}
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  setError("");
                }}
                readOnly={scanning || sending}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "wc-error" : "wc-url-help"}
              />
            </div>
            <button
              className="wc-primary"
              disabled={scanning || sending}
              type="submit"
            >
              {scanning ? (
                <LoaderCircle size={18} className="wc-spin" />
              ) : (
                <ArrowRight size={18} />
              )}
              {t("Check mijn website", "Check my website")}
            </button>
          </div>
          <p id="wc-url-help" className="wc-small">
            {t(
              "We controleren je homepage. Meestal klaar binnen een minuut.",
              "We check your homepage. Usually ready within a minute.",
            )}
          </p>
          {error && (
            <p className="wc-error" id="wc-error" role="alert">
              {error}
            </p>
          )}
        </form>

        {scanning && (
          <div className="wc-loading" role="status">
            <div className="wc-scan-orbit">
              <Search size={28} />
              <span />
            </div>
            <strong>
              {elapsed < 10
                ? t("Je website wordt onderzocht…", "Examining your website…")
                : t(
                    "De metingen worden verzameld…",
                    "Collecting the measurements…",
                  )}
            </strong>
            <p>
              {elapsed < 35
                ? t(
                    "HTTPS, mobiele instellingen en snelheid.",
                    "HTTPS, mobile settings and performance.",
                  )
                : t(
                    "Deze website heeft wat meer tijd nodig. Je uitslag komt zodra de metingen klaar zijn.",
                    "This website needs a little longer. Your result will appear when the checks finish.",
                  )}
            </p>
            <button
              type="button"
              className="wc-text-button"
              onClick={() => {
                controller.current?.abort("cancelled");
              }}
            >
              {t("Annuleren", "Cancel")}
            </button>
          </div>
        )}

        {!scanning && !report && (
          <div className="wc-preview">
            <div className="wc-preview-icon">
              <ShieldCheck size={25} />
            </div>
            <div>
              <strong>
                {t(
                  "Een kleine check. Een helder begin.",
                  "A quick check. A clear starting point.",
                )}
              </strong>
              <p>
                {t(
                  "Beveiliging, mobiele basis, vindbaarheid en snelheid. In begrijpelijke taal.",
                  "Security, mobile essentials, search basics and speed. In plain language.",
                )}
              </p>
            </div>
            <div className="wc-preview-tags">
              <span>
                <LockKeyhole size={14} />
                HTTPS
              </span>
              <span>
                <MonitorSmartphone size={14} />
                {t("Mobiel", "Mobile")}
              </span>
              <span>
                <Zap size={14} />
                PageSpeed
              </span>
            </div>
          </div>
        )}

        {report && !scanning && (
          <div className="wc-results">
            <div className="wc-result-summary">
              <div
                className={`wc-score ${report.score !== null && report.score < 5 ? "wc-score-low" : ""}`}
                aria-label={`${t("Score", "Score")}: ${report.score}/10`}
              >
                <strong>
                  {report.score === null ? "—" : formatScore(report.score)}
                </strong>
                <span>/ 10</span>
              </div>
              <div>
                <span className="wc-small">
                  {report.partial
                    ? t("TECHNISCHE BASISSCORE", "TECHNICAL BASE SCORE")
                    : t("TECHNISCHE WEBSITESCORE", "TECHNICAL WEBSITE SCORE")}
                </span>
                <h3 ref={resultHeading} tabIndex={-1}>
                  {report.domain}
                </h3>
                <p>
                  {report.partial
                    ? t(
                        "Een eerste beeld. De snelheidsmeting ontbreekt.",
                        "An initial picture. The speed measurement is unavailable.",
                      )
                    : report.score !== null && report.score >= 8
                      ? t(
                          "Een sterke technische basis. Mooi vertrekpunt!",
                          "A strong technical foundation. A great starting point!",
                        )
                      : t(
                          "Hier liggen kansen voor jouw website.",
                          "Here are opportunities for your website.",
                        )}
                </p>
              </div>
            </div>
            <ul className="wc-checks">
              {report.checks.map((check) => {
                const Icon = icons[check.id as keyof typeof icons] || Search;
                const statusLabel =
                  check.status === "pass"
                    ? t("Goed", "Good")
                    : check.status === "unknown"
                      ? t("Onbekend", "Unknown")
                      : t("Aandachtspunt", "Needs attention");
                const description =
                  check.id === "speed"
                    ? check.status === "unknown"
                      ? t(
                          "PageSpeed leverde geen meting. Dit verlaagt je score niet.",
                          "PageSpeed did not return a measurement. This does not lower your score.",
                        )
                      : `${t("PageSpeed mobiel", "PageSpeed mobile")}: ${Math.round((check.value || 0) * 100)}/100${check.lcp != null ? ` · LCP ${formatScore(check.lcp)} s` : ""}`
                    : labels[check.id]?.[check.status === "pass" ? 1 : 2];
                return (
                  <li key={check.id}>
                    <div className="wc-check-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <strong>{labels[check.id]?.[0]}</strong>
                      <p>{description}</p>
                    </div>
                    <span
                      className={`wc-status wc-status-${check.status}`}
                      title={statusLabel}
                    >
                      {check.status === "pass" ? (
                        <Check size={16} />
                      ) : check.status === "unknown" ? (
                        <CircleHelp size={16} />
                      ) : (
                        <X size={16} />
                      )}
                      <span className="sr-only">{statusLabel}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <details className="wc-method">
              <summary>
                {t(
                  "Hoe komt mijn score tot stand?",
                  "How is my score calculated?",
                )}
              </summary>
              <p>
                {t(
                  "HTTPS: 2 punten. Mobiele viewport: 2. Paginatitel: 1. Zoekbeschrijving: 1. PageSpeed: maximaal 4, evenredig met de mobiele prestatiescore. Ontbreekt een meting? Dan rekenen we alleen de beschikbare punten om naar een score op 10.",
                  "HTTPS: 2 points. Mobile viewport: 2. Page title: 1. Search description: 1. PageSpeed: up to 4, proportional to the mobile performance score. Missing measurements are excluded and available points are scaled to a score out of 10.",
                )}
              </p>
              <p>
                {t(
                  "Dit is een automatische technische indicatie op basis van de ontvangen HTML. Geen beoordeling van je ontwerp, volledige veiligheid, mobiele gebruiksvriendelijkheid of positie in Google. Inhoud die pas via JavaScript verschijnt kan ontbreken. LCP meet wanneer de grootste zichtbare inhoud verschijnt in een gesimuleerde mobiele test.",
                  "This is an automated technical indication based on the received HTML. It does not assess design, overall security, mobile usability or Google ranking. Content loaded through JavaScript may be missed. LCP measures when the largest visible content appears in a simulated mobile test.",
                )}
              </p>
              <p>
                {report.copyrightYear
                  ? t(
                      `Copyrightjaar gevonden: ${report.copyrightYear}. Dit telt niet mee in je score.`,
                      `Copyright year found: ${report.copyrightYear}. This does not affect your score.`,
                    )
                  : t(
                      "Geen copyrightjaar gevonden. Dit telt niet mee in je score.",
                      "No copyright year found. This does not affect your score.",
                    )}
              </p>
              <p>
                {t("Gecontroleerd op", "Checked on")}{" "}
                {new Date(report.checkedAt).toLocaleString(t("nl-NL", "en-GB"))}
                .{" "}
                {t(
                  "Uitslagen worden maximaal een uur hergebruikt.",
                  "Results may be reused for up to one hour.",
                )}
              </p>
            </details>

            <div className="wc-demo">
              {reference ? (
                <div className="wc-success" role="status">
                  <CheckCircle2 size={34} />
                  <h3 ref={successHeading} tabIndex={-1}>
                    {t("Je aanvraag is binnen!", "Your request is in!")}
                  </h3>
                  <p>
                    {t(
                      "Ik bekijk je website en neem persoonlijk contact met je op over jouw gratis homepage-demo.",
                      "I’ll look at your website and personally contact you about your free homepage demo.",
                    )}
                  </p>
                  <span className="wc-small">
                    {t("Referentie", "Reference")}: {reference}
                  </span>
                </div>
              ) : (
                <>
                  <span className="wc-demo-eyebrow">
                    <Sparkles size={16} />
                    {t("VAN INZICHT NAAR IDEE", "FROM INSIGHT TO IDEA")}
                  </span>
                  <h3>
                    {t(
                      "Zo kan jouw website óók zijn.",
                      "Imagine what your website could be.",
                    )}
                  </h3>
                  <p>
                    {t(
                      "Ik maak een persoonlijke website-demo voor jouw bedrijf. Een fris homepage-concept dat laat zien wat er mogelijk is.",
                      "I’ll create a personal website demo for your business. A fresh homepage concept that shows what’s possible.",
                    )}
                  </p>
                  {!showForm ? (
                    <>
                      <button
                        type="button"
                        className="wc-primary"
                        onClick={() => setShowForm(true)}
                      >
                        {t("Ontvang mijn gratis demo", "Get my free demo")}
                        <ArrowRight size={18} />
                      </button>
                      <span className="wc-small">
                        {t(
                          "Persoonlijk gemaakt door Kevin. Gratis en vrijblijvend.",
                          "Personally created by Kevin. Free, with no obligation.",
                        )}
                      </span>
                    </>
                  ) : (
                    <form
                      className="wc-lead-form"
                      onSubmit={requestDemo}
                      aria-busy={sending}
                    >
                      <div className="wc-fields">
                        <label htmlFor="wc-name">
                          {t("Je naam", "Your name")}
                          <input
                            ref={nameInput}
                            id="wc-name"
                            name="name"
                            autoComplete="name"
                            required
                            minLength={2}
                            maxLength={100}
                            disabled={sending}
                          />
                        </label>
                        <label htmlFor="wc-email">
                          {t("E-mailadres", "Email address")}
                          <input
                            id="wc-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            maxLength={254}
                            disabled={sending}
                          />
                        </label>
                      </div>
                      <label htmlFor="wc-note">
                        {t(
                          "Wat zou je willen verbeteren?",
                          "What would you like to improve?",
                        )}{" "}
                        <span className="wc-optional">
                          {t("(optioneel)", "(optional)")}
                        </span>
                        <textarea
                          id="wc-note"
                          name="note"
                          maxLength={1000}
                          rows={2}
                          disabled={sending}
                          placeholder={t(
                            "Bijvoorbeeld: meer aanvragen of een modernere uitstraling.",
                            "For example: more enquiries or a more modern look.",
                          )}
                        />
                      </label>
                      <div className="wc-honeypot" aria-hidden="true">
                        <label htmlFor="wc-company-website">Leave empty</label>
                        <input
                          id="wc-company-website"
                          name="companyWebsite"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>
                      <label className="wc-consent">
                        <input
                          type="checkbox"
                          name="consent"
                          required
                          disabled={sending}
                        />
                        <span>
                          {t(
                            "Kevin mag mij e-mailen over mijn gratis website-demo.",
                            "Kevin may email me about my free website demo.",
                          )}
                        </span>
                      </label>
                      <details className="wc-privacy">
                        <summary>
                          {t(
                            "Wat gebeurt er met mijn gegevens?",
                            "What happens to my details?",
                          )}
                        </summary>
                        <p>
                          {t(
                            "Kevin Rebuilds bewaart je naam, e-mailadres, toelichting en scan maximaal 90 dagen om je aanvraag te behandelen. Geen nieuwsbrief. Je kunt verwijdering aanvragen via webwinkelzakelijk@gmail.com. Voor de snelheidsmeting wordt alleen het openbare homepageadres met Google PageSpeed gedeeld.",
                            "Kevin Rebuilds stores your name, email, note and scan for up to 90 days to handle your request. No newsletter. Request deletion at webwinkelzakelijk@gmail.com. Only the public homepage address is shared with Google PageSpeed for the performance test.",
                          )}
                        </p>
                      </details>
                      {leadError && (
                        <p className="wc-error" role="alert">
                          {leadError}
                        </p>
                      )}
                      <button
                        type="submit"
                        className="wc-primary"
                        disabled={sending}
                      >
                        {sending ? (
                          <LoaderCircle size={18} className="wc-spin" />
                        ) : (
                          <ArrowRight size={18} />
                        )}
                        {sending
                          ? t("Aanvraag versturen…", "Sending request…")
                          : t(
                              "Vraag mijn gratis demo aan",
                              "Request my free demo",
                            )}
                      </button>
                      <span className="wc-small">
                        {t(
                          "Een homepage-concept, geen volledige website. Zonder verplichtingen.",
                          "A homepage concept, not a complete website. No obligation.",
                        )}
                      </span>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        <p className="wc-footnote">
          <LockKeyhole size={12} />
          {t(
            "Je openbare homepage wordt uitgelezen. Snelheidsmeting via Google PageSpeed.",
            "Your public homepage is read. Performance testing uses Google PageSpeed.",
          )}
        </p>
      </div>
    </section>
  );
}
