import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { initContact } from "./contact";

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = <T extends Element = HTMLElement>(s: string, ctx: ParentNode = document) =>
  ctx.querySelector<T>(s as string) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, ctx: ParentNode = document) =>
  Array.from(ctx.querySelectorAll<T>(s as string)) as T[];

/* ------------------------------------------------------------------ */
/* Smooth scroll                                                       */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  if (el.id === "main") el.setAttribute("tabindex", "-1");
}

// In-page anchors go through Lenis; keep focus management for keyboard users.
document.addEventListener("click", (event) => {
  const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!link) return;
  const hash = link.getAttribute("href")!;
  if (hash.length < 2) return;
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  event.preventDefault();
  closeMenu();
  scrollToTarget(target);
  history.pushState(null, "", hash);
  const focusable = target.tagName === "MAIN" ? target : target.querySelector<HTMLElement>("h2, h1");
  if (focusable) {
    focusable.setAttribute("tabindex", "-1");
    window.setTimeout(() => focusable.focus({ preventScroll: true }), lenis ? 900 : 50);
  }
});

// Language links keep the current section.
$$<HTMLAnchorElement>("[data-lang-link]").forEach((a) => {
  a.addEventListener("click", () => {
    try {
      localStorage.setItem("kevin-rebuilds-language", a.hreflang);
    } catch {}
    if (location.hash) a.href = a.getAttribute("href")!.split("#")[0] + location.hash;
  });
});

/* ------------------------------------------------------------------ */
/* Header + mobile menu                                                */
/* ------------------------------------------------------------------ */
const header = $(".site-header")!;
const toggle = $<HTMLButtonElement>(".menu-toggle")!;
function closeMenu() {
  if (!root.classList.contains("menu-open")) return;
  root.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.querySelector("span")!.textContent = toggle.dataset.open!;
  lenis?.start();
}
toggle.addEventListener("click", () => {
  const open = !root.classList.contains("menu-open");
  root.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector("span")!.textContent = open ? toggle.dataset.close! : toggle.dataset.open!;
  if (open) lenis?.stop();
  else lenis?.start();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && root.classList.contains("menu-open")) {
    closeMenu();
    toggle.focus();
  }
});

let lastY = 0;
ScrollTrigger.create({
  start: 0,
  end: "max",
  onUpdate(self) {
    const y = self.scroll();
    header.classList.toggle("is-scrolled", y > 40);
    const hide = y > 400 && y > lastY && !root.classList.contains("menu-open");
    header.classList.toggle("is-hidden", hide && !header.contains(document.activeElement));
    lastY = y;
  },
});

// Active nav item
const navLinks = $$<HTMLAnchorElement>("[data-nav]");
navLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute("href")!);
  if (!section) return;
  ScrollTrigger.create({
    trigger: section,
    start: "top 50%",
    end: "bottom 50%",
    onToggle: (self) => {
      link.classList.toggle("is-active", self.isActive);
      if (self.isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    },
  });
});

/* ------------------------------------------------------------------ */
/* Chapters: the whole page shifts colour per section                  */
/* ------------------------------------------------------------------ */
// Checked on every scroll update (not per-trigger toggles) so fast jumps via
// anchor links always land on the right colour.
const chapters = $$("[data-chapter]");
function syncChapter() {
  const line = window.innerHeight * 0.55;
  let theme = "dark";
  for (const section of chapters) {
    const r = section.getBoundingClientRect();
    if (r.top <= line && r.bottom > line) {
      theme = section.dataset.chapter!;
      break;
    }
    if (r.top > line) break;
    theme = section.dataset.chapter!;
  }
  if (root.dataset.theme !== theme) root.dataset.theme = theme;
}
ScrollTrigger.create({ start: 0, end: "max", onUpdate: syncChapter, onRefresh: syncChapter });
syncChapter();

/* ------------------------------------------------------------------ */
/* Cursor + magnetic buttons (desktop only)                            */
/* ------------------------------------------------------------------ */
if (finePointer && !reduced) {
  const cursor = $(".cursor")!;
  const dot = $(".cursor-dot")!;
  const ring = $(".cursor-ring")!;
  const dotX = gsap.quickTo(dot, "x", { duration: 0.08 });
  const dotY = gsap.quickTo(dot, "y", { duration: 0.08 });
  const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
  const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
  window.addEventListener(
    "pointermove",
    (e) => {
      cursor.classList.remove("is-hidden");
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      const el = e.target as HTMLElement;
      const hint = el.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      const interactive = el.closest("a, button, summary, label, input, textarea");
      cursor.classList.toggle("is-view", hint === "view");
      cursor.classList.toggle("is-link", hint !== "view" && hint !== "none" && !!interactive);
    },
    { passive: true },
  );
  document.addEventListener("pointerleave", () => cursor.classList.add("is-hidden"));
  document.addEventListener("pointerenter", () => cursor.classList.remove("is-hidden"));

  $$(".magnetic").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.28);
      yTo((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener("pointerleave", () => {
      xTo(0);
      yTo(0);
    });
  });

  // Hero orbs drift toward the pointer
  const orbs = $$(".orb");
  window.addEventListener(
    "pointermove",
    (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      orbs.forEach((orb, i) =>
        gsap.to(orb, { x: x * (60 + i * 40), y: y * (50 + i * 30), duration: 1.6, ease: "power2.out", overwrite: "auto" }),
      );
    },
    { passive: true },
  );
}

// Bento spotlight follows the pointer
$$(".bento-card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - r.left}px`);
    card.style.setProperty("--y", `${e.clientY - r.top}px`);
  });
});

/* ------------------------------------------------------------------ */
/* Intro: preloader → hero                                             */
/* ------------------------------------------------------------------ */
function heroIntro(delay = 0) {
  if (reduced) return;
  const tl = gsap.timeline({ delay });
  tl.from(".hero-title .line > span", { yPercent: 110, rotate: 3, duration: 1.25, stagger: 0.1, ease: "expo.out" })
    .from("[data-hero-fade]", { opacity: 0, y: 24, duration: 1, stagger: 0.08, ease: "power3.out" }, "-=0.85")
    .from(".site-header", { yPercent: -100, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity" }, "-=1")
    .from(".orb", { scale: 0.6, opacity: 0, duration: 2, stagger: 0.15, ease: "power2.out" }, 0);
}

const preloader = $(".preloader");
if (root.classList.contains("first-visit") && preloader && !reduced) {
  lenis?.stop();
  const count = $(".preloader-count", preloader)!;
  const counter = { v: 0 };
  const tl = gsap.timeline({
    onComplete: () => {
      preloader.remove();
      lenis?.start();
    },
  });
  tl.from(".preloader-name .line > span", { yPercent: 110, duration: 0.9, ease: "expo.out" })
    .from(".preloader-sub", { opacity: 0, y: 12, duration: 0.6 }, "-=0.5")
    .to(counter, {
      v: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => (count.textContent = String(Math.round(counter.v))),
    }, 0.1)
    .to(".preloader-bar", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.1)
    .to(preloader, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "+=0.15");
  heroIntro(tl.duration() - 0.55);
} else {
  preloader?.remove();
  heroIntro(0.05);
}

/* ------------------------------------------------------------------ */
/* Scroll reveals                                                      */
/* ------------------------------------------------------------------ */
if (!reduced) {
  // Headline line masks
  $$("[data-lines]").forEach((heading) => {
    gsap.from($$(".line > span", heading), {
      yPercent: 110,
      rotate: 2,
      duration: 1.2,
      stagger: 0.09,
      ease: "expo.out",
      scrollTrigger: { trigger: heading, start: "top 85%" },
    });
  });

  // Generic fade-up
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 90%",
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "power3.out", overwrite: true }),
  });

  // Statement: words light up as you scroll
  $$("[data-split-words]").forEach((p) => {
    const words = p.textContent!.trim().split(/\s+/);
    p.setAttribute("aria-label", p.textContent!.trim());
    p.innerHTML = words.map((w) => `<span class="word" aria-hidden="true">${w}</span>`).join(" ");
    gsap.to($$(".word", p), {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: { trigger: p, start: "top 80%", end: "bottom 45%", scrub: true },
    });
  });

  // Hero parallax out
  gsap.to(".hero-title", {
    yPercent: -18,
    opacity: 0.3,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  // Services: previous cards sink back as the next one arrives
  const cards = $$(".svc");
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    gsap.to(card, {
      scale: 0.92 + i * 0.02,
      opacity: 0.55,
      ease: "none",
      scrollTrigger: {
        trigger: cards[i + 1],
        start: "top bottom",
        end: "top 25%",
        scrub: true,
      },
    });
  });

  // Process timeline draws itself
  const steps = $("[data-steps]");
  if (steps) {
    gsap.to(".steps-line span", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: steps, start: "top 60%", end: "bottom 60%", scrub: true },
    });
    $$(".step", steps).forEach((step) =>
      ScrollTrigger.create({
        trigger: step,
        start: "top 62%",
        onEnter: () => step.classList.add("is-active"),
        onLeaveBack: () => step.classList.remove("is-active"),
      }),
    );
  }

  // About: portrait unveils, then drifts
  const photo = $("[data-clip-reveal]");
  if (photo) {
    gsap.from(photo, {
      clipPath: "inset(18% 12% 18% 12% round 28px)",
      duration: 1.6,
      ease: "expo.out",
      scrollTrigger: { trigger: photo, start: "top 80%" },
    });
    gsap.to($("img", photo), {
      yPercent: -7,
      ease: "none",
      scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true },
    });
  }

  // Footer wordmark rises
  gsap.from("[data-wordmark]", {
    yPercent: 40,
    opacity: 0,
    duration: 1.4,
    ease: "expo.out",
    scrollTrigger: { trigger: "[data-wordmark]", start: "top 95%" },
  });
} else {
  $$(".step").forEach((s) => s.classList.add("is-active"));
}

/* ------------------------------------------------------------------ */
/* Marquee: endless, reacts to scroll speed and direction              */
/* ------------------------------------------------------------------ */
const track = $(".marquee-track");
if (track && !reduced) {
  const group = $(".marquee-group", track)!;
  let x = 0;
  let direction = -1;
  let boost = 0;
  const base = 0.6;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      direction = self.direction === 1 ? -1 : 1;
      boost = Math.min(Math.abs(self.getVelocity()) / 120, 14);
    },
  });
  gsap.ticker.add(() => {
    const width = group.offsetWidth;
    x += (base + boost) * direction;
    boost *= 0.94;
    if (x <= -width) x += width;
    if (x > 0) x -= width;
    gsap.set(track, { x, skewX: -boost * 0.5 * direction * -1 });
  });
}

/* ------------------------------------------------------------------ */
/* Work: horizontal gallery on desktop, parallax everywhere            */
/* ------------------------------------------------------------------ */
const work = $<HTMLElement>(".work");
const mm = gsap.matchMedia();
if (work && !reduced) {
  mm.add("(min-width: 1024px)", () => {
    work.classList.add("is-horizontal");
    const workTrack = $(".work-track", work)!;
    const pin = $(".work-pin", work)!;
    const distance = () => workTrack.scrollWidth - window.innerWidth + 40;
    const tween = gsap.to(workTrack, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
    $$("[data-parallax-x]", work).forEach((inner) =>
      gsap.fromTo(inner, { xPercent: 4 }, {
        xPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: inner.parentElement!,
          containerAnimation: tween,
          start: "left right",
          end: "right left",
          scrub: true,
        },
      }),
    );
    return () => work.classList.remove("is-horizontal");
  });
  mm.add("(max-width: 1023px)", () => {
    $$("[data-parallax-x]", work).forEach((inner) =>
      gsap.fromTo(inner, { yPercent: 3 }, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: { trigger: inner.parentElement!, start: "top bottom", end: "bottom top", scrub: true },
      }),
    );
  });
}

// Flowdesk rows tick through
const flowRows = $$("[data-flow-row]");
if (flowRows.length && !reduced) {
  gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
    .set(flowRows, { opacity: 0.35 })
    .to(flowRows, { opacity: 1, duration: 0.4, stagger: 0.6 });
}

/* ------------------------------------------------------------------ */
/* Bento micro-interactions                                            */
/* ------------------------------------------------------------------ */
const gauge = $("[data-gauge]");
if (gauge) {
  const value = $<SVGCircleElement>(".value", gauge)!;
  const label = $("[data-count-to]", gauge)!;
  ScrollTrigger.create({
    trigger: gauge,
    start: "top 85%",
    once: true,
    onEnter: () => {
      const n = { v: 0 };
      gsap.to(value, { strokeDashoffset: 16, duration: reduced ? 0 : 2, ease: "power3.out" });
      gsap.to(n, {
        v: 95,
        duration: reduced ? 0 : 2,
        ease: "power3.out",
        onUpdate: () => (label.textContent = String(Math.round(n.v))),
        onComplete: () => (label.textContent = "90+"),
      });
    },
  });
}

$$("[data-typer]").forEach((el) => {
  if (reduced) return;
  const phrase = el.dataset.typer!;
  ScrollTrigger.create({
    trigger: el,
    start: "top 90%",
    once: true,
    onEnter: () => {
      el.textContent = "";
      let i = 0;
      const tick = () => {
        el.textContent = phrase.slice(0, ++i);
        if (i < phrase.length) window.setTimeout(tick, 55 + Math.random() * 60);
      };
      window.setTimeout(tick, 300);
    },
  });
});

$$("[data-flip-words]").forEach((el) => {
  if (reduced) return;
  const words = el.dataset.flipWords!.split("|");
  let i = 0;
  window.setInterval(() => {
    i = (i + 1) % words.length;
    gsap.to(el, {
      yPercent: -30,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        el.textContent = words[i];
        gsap.fromTo(el, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
      },
    });
  }, 2200);
});

// Count-up facts
$$(".facts [data-count-to]").forEach((el) => {
  if (reduced) return;
  const to = Number(el.dataset.countTo);
  const n = { v: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: "top 90%",
    once: true,
    onEnter: () =>
      gsap.to(n, { v: to, duration: 1.4, ease: "power2.out", onUpdate: () => (el.textContent = String(Math.round(n.v))) }),
  });
});

/* ------------------------------------------------------------------ */
/* FAQ accordion                                                       */
/* ------------------------------------------------------------------ */
$$<HTMLButtonElement>(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item")!;
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    item.classList.toggle("is-open", open);
    window.setTimeout(() => ScrollTrigger.refresh(), 600);
  });
});

/* ------------------------------------------------------------------ */
/* Footer clock                                                        */
/* ------------------------------------------------------------------ */
const clock = $("[data-clock]");
if (clock) {
  const fmt = new Intl.DateTimeFormat(document.documentElement.lang === "nl" ? "nl-NL" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Amsterdam",
  });
  const update = () => (clock.textContent = fmt.format(new Date()));
  update();
  window.setInterval(update, 15000);
}

initContact();

// Fonts and images change layout; recalculate trigger positions.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener("load", () => ScrollTrigger.refresh());
