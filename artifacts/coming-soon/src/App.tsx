import { useState } from "react";
import { SiFiverr } from "react-icons/si";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Monitor,
  Box,
  Workflow,
  Check,
  Zap,
  Mail,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const options = [
  {
    id: "website",
    name: "A website",
    icon: Monitor,
    caption: "Beautiful websites that make your business feel impossible to ignore.",
    note: "A clear story. A stronger first impression. More enquiries.",
    deviceLabel: "WEBSITE / DESIGN + BUILD",
    mobileTitle: "Beautiful websites, built to win trust.",
    mobileSummary:
      "Turn an outdated or unclear site into a distinctive online home that makes the next step obvious.",
    description:
      "For the business you’ve outgrown your old website to become. We find the story, give it a distinct look, and build a site that makes the next step obvious.",
  },
  {
    id: "product",
    name: "A product",
    icon: Box,
    caption: "Beautiful apps people can actually open, use, and come back to.",
    note: "From the idea in your head to a product in someone’s hand.",
    deviceLabel: "APP / PRODUCT PROTOTYPE",
    mobileTitle: "Beautiful apps, made real.",
    mobileSummary:
      "Shape the right idea into a polished, testable app—so people can use it, not just imagine it.",
    description:
      "An idea becomes easier to explain when someone can use it. I turn the important part into a working first version, so we can learn from something real.",
  },
  {
    id: "system",
    name: "A system",
    icon: Workflow,
    caption: "Smart business systems that solve the bottlenecks stealing your time.",
    note: "Connect the dots. Remove the chasing. Get your time back.",
    deviceLabel: "SYSTEM / BUSINESS AUTOMATION",
    mobileTitle: "Systems that make business feel lighter.",
    mobileSummary:
      "Connect the messy steps behind the scenes, so leads, projects, and follow-ups keep moving without the manual chase.",
    description:
      "The spreadsheet, the copied email, the step everyone forgets. We join the loose ends into a simple workflow that helps your business run with less chasing.",
  },
];
function Website() {
  return (
    <div className="website-demo">
      <div className="demo-nav">
        <b className="after-brand">
          FOUND<span>/FORM</span>
        </b>
        <span>WORK &nbsp; STUDIO &nbsp; START A PROJECT ↗</span>
      </div>
      <div className="website-content">
        <div className="after-copy">
          <small>INDEPENDENT CREATIVE STUDIO / 2026</small>
          <h3>
            IDEAS
            <br />
            <em>BUILT TO</em>
            <br />
            MOVE.
          </h3>
          <div className="after-cta">
            <span>START A PROJECT</span>
            <b>↗</b>
          </div>
        </div>
        <div className="sculpture-stage">
          <span className="sculpture-kicker">DIGITAL, WITH DIMENSION.</span>
          <div className="sculpture" aria-hidden="true">
            <i /><i /><i /><i /><i />
            <span className="sculpture-core" />
          </div>
          <small>DESIGNED TO STAND OUT ↗</small>
        </div>
      </div>
      <div className="demo-footer">
        <span>↗</span>
        <b>SCROLL TO EXPLORE</b>
        <small>AMSTERDAM / AVAILABLE WORLDWIDE</small>
      </div>
    </div>
  );
}
function WebsiteBefore() {
  return (
    <div className="website-before-demo" aria-hidden="true">
      <div className="before-nav">
        <b>FOUND / FORM</b>
        <span>HOME | ABOUT | SERVICES | CONTACT</span>
      </div>
      <div className="before-content">
        <div>
          <small>WELCOME TO OUR WEBSITE</small>
          <h3>Quality solutions for your business</h3>
          <p>
            We are passionate about delivering professional services that help
            you succeed.
          </p>
          <span className="before-button">CLICK HERE</span>
        </div>
        <div className="before-card">
          <strong>WHY CHOOSE US?</strong>
          <span>✓ Professional</span>
          <span>✓ Reliable</span>
          <span>✓ Affordable</span>
        </div>
      </div>
      <div className="before-footer">
        © 2026 FOUND / FORM | ALL RIGHTS RESERVED
      </div>
    </div>
  );
}
function WebsiteComparison() {
  const [reveal, setReveal] = useState(52);

  return (
    <div className="website-comparison">
      <div className="comparison-layer comparison-after">
        <Website />
      </div>
      <div
        className="comparison-layer comparison-before"
        style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
      >
        <WebsiteBefore />
      </div>
      <span className="comparison-label comparison-label-before">BEFORE</span>
      <span className="comparison-label comparison-label-after">AFTER</span>
      <div className="comparison-divider" style={{ left: `${reveal}%` }}>
        <span aria-hidden="true">↔</span>
      </div>
      <input
        className="comparison-range"
        type="range"
        min="0"
        max="100"
        value={reveal}
        onChange={(event) => setReveal(Number(event.target.value))}
        aria-label="Compare the website before and after the redesign"
      />
    </div>
  );
}
function Product() {
  const [done, setDone] = useState([false, true, false]);
  return (
    <div className="product-demo">
      <div className="demo-nav">
        <b>morrow ●</b>
        <span>Your space, a little clearer.</span>
      </div>
      <div className="product-top">
        <div>
          <small>YOUR NEXT CHAPTER</small>
          <h3>
            Make room
            <br />
            for the good stuff.
          </h3>
        </div>
        <span className="spark">✳</span>
      </div>
      <div className="tasks">
        {[
          "Catch that new idea",
          "Make the first small move",
          "Put something into the world",
        ].map((t, i) => (
          <button
            className={done[i] ? "done" : ""}
            key={t}
            onClick={() => setDone((v) => v.map((x, j) => (i === j ? !x : x)))}
            aria-pressed={done[i]}
          >
            <span>{done[i] && <Check size={13} />}</span>
            {t}
            <ArrowUpRight size={14} />
          </button>
        ))}
      </div>
      <div className="product-bottom">
        <span>{done.filter(Boolean).length} of 3 little wins</span>
        <span>One thing at a time. ↗</span>
      </div>
    </div>
  );
}
function System() {
  const [runs, setRuns] = useState(0);
  return (
    <div className="system-demo">
      <div className="demo-nav">
        <b>FLOW / workspace</b>
        <span className="live">System online</span>
      </div>
      <div className="system-heading">
        <small>THE WORK BEHIND THE WORK</small>
        <h3>
          A little less
          <br />
          on your plate.
        </h3>
      </div>
      <div className="flow" key={runs}>
        {[
          { icon: Mail, title: "New enquiry", sub: "The conversation starts" },
          {
            icon: Workflow,
            title: "Everything in place",
            sub: "Brief + project created",
          },
          { icon: Check, title: "Ready for you", sub: "One clear next step" },
        ].map(({ icon: Icon, title, sub }, i) => (
          <div
            className="flow-node"
            key={title}
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <span>
              <Icon size={19} />
            </span>
            <div>
              <b>{title}</b>
              <small>{sub}</small>
            </div>
            <Check size={14} />
          </div>
        ))}
      </div>
      <button className="run-flow" onClick={() => setRuns((v) => v + 1)}>
        <Zap size={14} />
        {runs ? "Run it again" : "Try the workflow"}
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
const previews = [Website, Product, System];
const interactivePreviews = [WebsiteComparison, Product, System];
export default function App() {
  const [selected, setSelected] = useState("website");
  const [project, setProject] = useState<number | null>(null);
  const index = options.findIndex((o) => o.id === selected);
  return (
    <MotionConfig reducedMotion="user">
      <div className="site" id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header>
          <a className="brand" href="#top">
            KEVIN <span>REBUILDS</span>
            <sup>®</sup>
          </a>
          <nav aria-label="Main navigation">
            <a href="#work">Recent work</a>
            <a href="#about">Meet the builder</a>
            <a className="button small" href="#contact">
              Start with a question <ArrowUpRight size={17} />
            </a>
          </nav>
        </header>
        <main id="main">
          <Tabs
            value={selected}
            onValueChange={setSelected}
            className="hero"
            orientation="vertical"
          >
            <div className="hero-copy">
              <div className="eyebrow">
                <i /> INDEPENDENT BUILDER. CURIOUS BY DEFAULT.
              </div>
              <h1>
                WHAT ARE
                <br />
                WE <span>MAKING?</span>
              </h1>
              <p className="intro">
                Websites, products, and the systems behind them.
                <br />
                I’m Kevin. I help good ideas become real things.
              </p>
            </div>
            <div className="portrait-note">
              <img
                src={`${import.meta.env.BASE_URL}images/kevin-friendly.webp`}
                width="320"
                height="360"
                alt="Kevin smiling in his navy sweater"
                fetchPriority="high"
              />
              <div className="portrait-copy">
                <span className="scribble">Hi, I’m Kevin.</span>
                <p>
                  A person to think with.
                  <br />A builder to get it done.
                </p>
                <div className="portrait-actions">
                  <a
                    className="fiverr-button"
                    href="https://www.fiverr.com/s/NeBXK68"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Work with me on <span className="sr-only">Fiverr</span></span>
                    <SiFiverr className="fiverr-logo" viewBox="0 8 24 8" aria-hidden="true" />
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                  <a className="portrait-link" href="#about">
                    Meet your builder <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-controls">
              <TabsList
                className="offering-tabs"
                aria-label="What are we making?"
              >
                {options.map(({ id, name, icon: Icon }, i) => (
                  <TabsTrigger className="offering" key={id} value={id}>
                    <span className="offering-icon">
                      <Icon size={25} strokeWidth={1.5} />
                    </span>
                    <span>{name}</span>
                    <small>0{i + 1}</small>
                    <ArrowRight size={25} />
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="human-note">
                <span className="scribble">Ideas into reality.</span>
                <span>
                  One person. From the first
                  <br />
                  conversation to the final detail.
                </span>
              </div>
            </div>
            <div className="showcase">
              <div className="scene-heading" aria-live="polite">
                <span className="counter">0{index + 1} / 03</span>
                <h2>{options[index].name}</h2>
                <p>{options[index].caption}</p>
              </div>
              <div className="mobile-scene-intro" aria-live="polite">
                <span>{options[index].deviceLabel}</span>
                <strong>{options[index].mobileTitle}</strong>
                <p>{options[index].mobileSummary}</p>
              </div>
              <div className={`device device-${selected}`}>
                <div className="device-bar">
                  <i />
                  <i />
                  <i />
                  <small>{options[index].deviceLabel}</small>
                </div>
                {options.map(({ id }, i) => {
                  const Preview = interactivePreviews[i];
                  return (
                    <TabsContent className="preview-panel" key={id} value={id}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Preview />
                      </motion.div>
                    </TabsContent>
                  );
                })}
                <div className="device-base" />
              </div>
              <div className="scene-caption">
                <span className="scribble">{options[index].note}</span>
                <span>INTERACTIVE PREVIEW ↗</span>
              </div>
              <div className="capability-detail">
                <strong>{options[index].mobileTitle}</strong>
                <p>{options[index].mobileSummary}</p>
                <small>INTERACTIVE CONCEPT DEMO · EXPLORE SELECTED WORK BELOW</small>
              </div>
            </div>
          </Tabs>
          <section className="work-section" id="work">
            <div className="section-top">
              <div>
                <span className="eyebrow">SELECTED WORK</span>
                <h2>
                  Ideas I’ve
                  <br />
                  <span>brought to life.</span>
                </h2>
              </div>
              <p>
                A closer look at what we could make.
                <br />
                Three concept projects. Three different starting points.
              </p>
            </div>
            <div className="work-grid">
              {[
                "A calmer internet.",
                "Tools for real progress.",
                "Small systems. Big change.",
              ].map((title, i) => {
                const Preview = previews[i];
                return (
                  <article className="work-card" key={title}>
                    <div className="work-preview" aria-hidden="true" inert>
                      <Preview />
                    </div>
                    <button
                      className="work-title"
                      onClick={() => setProject(project === i ? null : i)}
                      aria-expanded={project === i}
                      aria-controls="project-detail"
                    >
                      <span>
                        <small>
                          0{i + 1} / {options[i].name.slice(2).toUpperCase()}{" "}
                          CONCEPT
                        </small>
                        <strong>{title}</strong>
                      </span>
                      <span className="work-arrow">
                        <ArrowUpRight size={24} />
                      </span>
                    </button>
                  </article>
                );
              })}
            </div>
            <div id="project-detail">
              {project !== null && (
                <motion.div
                  className="project-detail"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="eyebrow">WHAT THIS COULD BECOME</span>
                  <h3>{options[project].name}, built around you.</h3>
                  <p>{options[project].description}</p>
                  <a
                    href="#contact"
                    className="text-link"
                    onClick={() => setSelected(options[project].id)}
                  >
                    Make something like this <ArrowRight size={17} />
                  </a>
                </motion.div>
              )}
            </div>
          </section>
          <section className="about" id="about">
            <div className="about-label">
              <span className="eyebrow">MEET THE BUILDER</span>
              <span className="scribble">
                A real person.
                <br />
                Very real curiosity.
              </span>
              <figure className="about-portrait">
                <img
                  src={`${import.meta.env.BASE_URL}images/kevin-casual-v2.png`}
                  width="1122"
                  height="1402"
                  alt="Kevin relaxing in a warm creative workspace"
                  loading="lazy"
                />
              </figure>
            </div>
            <div>
              <h2>
                I’ve always loved the moment
                <br />
                <span>an idea becomes real.</span>
              </h2>
              <p>
                I’ve been fascinated by the online world for as long as I can
                remember. From the moment I built my first website, I knew I
                wanted to do more with it. Seeing something turn out exactly as
                you pictured it in your head. That feeling never gets old.
              </p>
              <p>
                Since then, I’ve built a YouTube channel to 140,000 subscribers,
                managed another with 3 million, grown an Instagram account from
                zero to 340,000 followers, and launched an online store of my
                own. Different projects, but always the same curiosity: what
                makes an idea connect with people?
              </p>
              <p>
                Away from the screen, I’m a proud dad of three. It’s the best
                thing that ever happened to me. Even after a full day at work,
                I’ll often spend my evenings creating because it gives me
                genuine fulfilment. I bring creativity, ambition, a hunger to
                learn and, when the moment allows, a good sense of humour.
              </p>
              <p>
                When someone trusts me with their idea, I treat them exactly as
                I’d want to be treated: honestly, thoughtfully and with real
                care. I’ll always aim to overdeliver, never under.
              </p>
              <a className="text-link" href="#contact">
                Tell me what’s on your mind <ArrowRight size={18} />
              </a>
            </div>
          </section>
          <section className="contact" id="contact">
            <span className="eyebrow">NO PERFECT BRIEF REQUIRED</span>
            <h2>
              What’s the idea
              <br />
              <span>you keep coming back to?</span>
            </h2>
            <p>
              A sentence, a sketch, a “could we…?”
              <br />
              That’s plenty to start a conversation.
            </p>
            <div className="contact-actions">
              <a
                className="button"
                href={`mailto:webwinkelzakelijk@gmail.com?subject=${encodeURIComponent(`Let's make ${options[index].name.toLowerCase()}`)}`}
              >
                Let’s talk about it <ArrowUpRight size={21} />
              </a>
              <a
                className="button fiverr-contact-button"
                href="https://www.fiverr.com/s/NeBXK68"
                target="_blank"
                rel="noreferrer"
              >
                Hire me on Fiverr <ArrowUpRight size={21} />
              </a>
            </div>
            <small>Email me directly or book through Fiverr.</small>
          </section>
        </main>
        <footer>
          <a className="brand" href="#top">
            KEVIN <span>REBUILDS</span>
          </a>
          <span>Ideas into reality. With a human behind it.</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </MotionConfig>
  );
}
