// Progressive enhancement only: every page is complete and readable without this file.
const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

// JS-only controls (demo buttons, tabs) are hidden in the HTML and revealed here.
$$("[data-js-only]").forEach((el) => (el.hidden = false));

/* Header: border on scroll + mobile menu --------------------------------- */
const header = $(".site-header");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const toggle = $<HTMLButtonElement>("[data-menu-toggle]");
const label = $("[data-menu-label]");
function setMenu(open: boolean) {
  if (!toggle || !header) return;
  header.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  if (label) label.textContent = open ? toggle.dataset.close! : toggle.dataset.open!;
}
toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
$$("#site-nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    toggle.focus();
  }
});

/* Language switch keeps the current section (anchors differ per language) */
const anchorPairs: [string, string][] = [
  ["oplossingen", "solutions"],
  ["werk", "work"],
  ["recent-werk", "recent-work"],
  ["voorbeelden", "examples"],
  ["werkwijze", "process"],
  ["over-kevin", "about-kevin"],
  ["aanvragen", "request"],
  ["wat-ik-bouw", "what-i-build"],
  ["aanpak", "approach"],
];
$$<HTMLAnchorElement>("[data-lang-link]").forEach((link) =>
  link.addEventListener("click", () => {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const toEn = link.dataset.langLink === "en";
    const pair = anchorPairs.find(([nl, en]) => (toEn ? nl : en) === hash);
    if (pair) link.hash = toEn ? pair[1] : pair[0];
  }),
);

/* Examples: accessible tabs --------------------------------------------- */
const tabs = $("[data-tabs]");
if (tabs) {
  const buttons = $$<HTMLButtonElement>('[role="tab"]', tabs);
  const panels = $$("[data-tab-panel]", tabs);
  panels.forEach((panel, i) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", buttons[i].id);
    panel.tabIndex = 0;
    panel.hidden = i !== 0;
  });
  tabs.classList.add("is-ready");
  const select = (index: number, focus = false) => {
    buttons.forEach((b, i) => {
      const on = i === index;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
    });
    if (focus) buttons[index].focus();
  };
  buttons.forEach((b, i) => {
    b.addEventListener("click", () => select(i));
    b.addEventListener("keydown", (e) => {
      const last = buttons.length - 1;
      const next =
        e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
        : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
        : e.key === "Home" ? 0
        : e.key === "End" ? last
        : -1;
      if (next < 0) return;
      e.preventDefault();
      select(next, true);
    });
  });
}

/* Demo 1: website desktop / mobile view --------------------------------- */
const stage = $("[data-site-stage]");
const viewButtons = $$<HTMLButtonElement>("[data-view]");
const setView = (view: string) => {
  viewButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
  stage?.classList.toggle("is-mobile", view === "mobile");
};
viewButtons.forEach((btn) => btn.addEventListener("click", () => setView(btn.dataset.view!)));
// On phones the desktop screenshot is too small to read: start with the mobile view.
if (matchMedia("(max-width: 639px)").matches) setView("mobile");

/* Demo 2: portal project filter ----------------------------------------- */
$$("[data-portal]").forEach((portal) => {
  const filters = $$<HTMLButtonElement>("[data-filter]", portal);
  const rows = $$("[data-status]", portal);
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      const f = btn.dataset.filter;
      rows.forEach((row) => {
        const s = row.dataset.status;
        const show = f === "all" || (f === "active" ? s === "active" || s === "design" : s === "done");
        row.classList.toggle("is-hidden", !show);
      });
    }),
  );
});

/* Demo 3: request flow, step by step (nothing is sent) ------------------ */
$$("[data-flow]").forEach((flow) => {
  const steps = $$("[data-step]", flow);
  const run = $<HTMLButtonElement>("[data-flow-run]", flow)!;
  const runLabel = $("[data-flow-label]", flow)!;
  const status = $("[data-flow-status]", flow)!;
  const text = document.documentElement.lang === "nl"
    ? { waiting: "Wacht", busy: "Bezig…", done: "Klaar", start: "Start demo-aanvraag", again: "Opnieuw afspelen", complete: "Demo afgerond. Er is niets verstuurd." }
    : { waiting: "Waiting", busy: "Working…", done: "Done", start: "Start demo request", again: "Play again", complete: "Demo finished. Nothing was sent." };
  const set = (step: HTMLElement, state: "waiting" | "busy" | "done") => {
    step.dataset.status = state;
    step.classList.toggle("is-done", state === "done");
    $("[data-state]", step)!.textContent = text[state];
  };
  steps.forEach((s) => set(s, "waiting"));
  let timer = 0;
  run.addEventListener("click", () => {
    window.clearTimeout(timer);
    steps.forEach((s) => set(s, "waiting"));
    status.textContent = "";
    run.disabled = true;
    const delay = reduced ? 150 : 700;
    let i = 0;
    const tick = () => {
      if (i > 0) set(steps[i - 1], "done");
      if (i < steps.length) {
        set(steps[i], "busy");
        i++;
        timer = window.setTimeout(tick, delay);
      } else {
        status.textContent = text.complete;
        runLabel.textContent = text.again;
        run.disabled = false;
      }
    };
    tick();
  });
});

/* Service preselection --------------------------------------------------- */
function preselect(value: string | null | undefined) {
  if (!value) return;
  const radio = $<HTMLInputElement>(`input[data-service-value="${CSS.escape(value)}"]`);
  if (radio) {
    radio.checked = true;
    radio.dispatchEvent(new Event("change", { bubbles: true }));
  }
}
const params = new URLSearchParams(location.search);
preselect(params.get("dienst") ?? params.get("service"));
document.addEventListener("click", (e) => {
  const link = (e.target as HTMLElement).closest<HTMLElement>("[data-service]");
  if (link) preselect(link.dataset.service);
});

/* Request form ----------------------------------------------------------- */
const form = $<HTMLFormElement>("[data-request-form]");
if (form && form.dataset.endpoint) {
  const msg = JSON.parse(form.dataset.msg!) as Record<string, string>;
  const endpoint = form.dataset.endpoint;
  const loadedAt = Date.now();
  const summary = $("[data-error-summary]", form)!;
  const status = $("[data-form-status]", form)!;
  const submit = $<HTMLButtonElement>("[data-submit]", form)!;
  const submitLabel = $("[data-submit-label]", form)!;
  const success = $("[data-form-success]")!;
  const serviceSet = $("#rf-service", form)!;
  const fields = {
    service: { el: serviceSet, focus: () => $<HTMLInputElement>('input[name="dienst"]', form)!.focus() },
    name: { el: $<HTMLInputElement>("#rf-name", form)!, focus: () => $<HTMLInputElement>("#rf-name", form)!.focus() },
    email: { el: $<HTMLInputElement>("#rf-email", form)!, focus: () => $<HTMLInputElement>("#rf-email", form)!.focus() },
    message: { el: $<HTMLTextAreaElement>("#rf-message", form)!, focus: () => $<HTMLTextAreaElement>("#rf-message", form)!.focus() },
  };
  type Key = keyof typeof fields;
  const ids: Record<Key, string> = { service: "rf-service", name: "rf-name", email: "rf-email", message: "rf-message" };

  const validate = (key: Key): string => {
    const data = new FormData(form);
    if (key === "service") return data.get("dienst") ? "" : msg.service;
    if (key === "name") return String(data.get("naam") ?? "").trim().length >= 2 ? "" : msg.name;
    if (key === "email") {
      const v = String(data.get("email") ?? "").trim();
      if (!v) return msg.emailEmpty;
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : msg.emailInvalid;
    }
    return String(data.get("bericht") ?? "").trim().length >= 10 ? "" : msg.message;
  };
  const show = (key: Key, error: string) => {
    const out = $(`[data-error-for="${key}"]`, form)!;
    out.textContent = error;
    out.hidden = !error;
    if (key === "service") serviceSet.classList.toggle("has-error", Boolean(error));
    else fields[key].el.setAttribute("aria-invalid", String(Boolean(error)));
  };
  // Validate on blur once a field has been touched; clear errors as soon as they're fixed.
  (["name", "email", "message"] as Key[]).forEach((key) => {
    const el = fields[key].el;
    el.addEventListener("blur", () => { if (el.dataset.touched || (el as HTMLInputElement).value) { el.dataset.touched = "1"; show(key, validate(key)); } });
    el.addEventListener("input", () => { if (el.getAttribute("aria-invalid") === "true") show(key, validate(key)); });
  });
  form.addEventListener("change", (e) => { if ((e.target as HTMLInputElement).name === "dienst") show("service", ""); });

  const setSending = (on: boolean) => {
    submit.disabled = on;
    submit.classList.toggle("is-sending", on);
    submitLabel.textContent = on ? msg.sending : msg.submit;
    form.setAttribute("aria-busy", String(on));
  };
  const fail = (text: string) => {
    status.textContent = `${text} `;
    const a = document.createElement("a");
    a.href = `mailto:${msg.email}`;
    a.textContent = msg.email;
    status.append(a, ".");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    const errors = (Object.keys(fields) as Key[]).map((k) => [k, validate(k)] as const).filter(([, e]) => e);
    (Object.keys(fields) as Key[]).forEach((k) => show(k, errors.find(([e]) => e === k)?.[1] ?? ""));
    const list = $("ul", summary)!;
    list.innerHTML = "";
    if (errors.length) {
      errors.forEach(([key, error]) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${ids[key]}`;
        a.textContent = error;
        a.addEventListener("click", (ev) => { ev.preventDefault(); fields[key].focus(); });
        li.append(a);
        list.append(li);
      });
      summary.hidden = false;
      summary.focus();
      return;
    }
    summary.hidden = true;

    const data = new FormData(form);
    if (String(data.get("_honey") ?? "")) return; // bot: silently ignore
    if (Date.now() - loadedAt < 3000) { status.textContent = msg.tooFast; return; }

    const payload: Record<string, string> = {};
    data.forEach((value, key) => { if (key !== "_next" && key !== "_honey") payload[key] = String(value).trim(); });
    payload._subject = `${form.dataset.subject} · ${payload.dienst} · ${payload.naam}`;

    setSending(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      });
      const body = (await res.json().catch(() => null)) as { success?: boolean | string } | null;
      // Only a confirmed delivery counts as success.
      if (!res.ok || !(body?.success === true || body?.success === "true")) throw new Error("not-delivered");
      form.reset();
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      fail((error as Error).name === "TypeError" || (error as Error).name === "TimeoutError" ? msg.network : msg.failed);
    } finally {
      setSending(false);
    }
  });

  $("[data-form-reset]")?.addEventListener("click", () => {
    success.hidden = true;
    form.hidden = false;
    $<HTMLInputElement>('input[name="dienst"]', form)?.focus();
  });
}
