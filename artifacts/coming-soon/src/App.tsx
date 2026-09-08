import { useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, ArrowUpRight, Check, Compass, Lightbulb, Mail, Sparkles, Target } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Brand() {
  return (
    <a className="brand" href="#top" data-testid="link-brand">
      <span className="brand-mark" aria-hidden="true" />
      morrow
    </a>
  );
}

function HeroArtwork() {
  return (
    <div className="signal-board" aria-label="A visual map of ideas becoming momentum">
      <div className="signal-orbit">
        <svg className="orbit-line" viewBox="0 0 430 430" aria-hidden="true">
          <path d="M55 133 C118 37, 276 43, 355 121 C402 168, 383 274, 309 340" fill="none" stroke="hsl(75 71% 68% / .56)" strokeWidth="1.5" />
          <path d="M71 312 C145 392, 282 390, 363 294" fill="none" stroke="hsl(45 28% 94% / .26)" strokeWidth="1" />
        </svg>
        <div className="signal-core">
          <Sparkles aria-hidden="true" />
        </div>
        <div className="orbit-card one">
          <div className="mono-label card-kicker">signal 01</div>
          <strong>Start a small studio</strong>
          <small>just now · 4 fragments</small>
        </div>
        <div className="orbit-card two">
          <div className="mono-label card-kicker">clarity</div>
          <strong>Make the first thing</strong>
          <small>next good move</small>
        </div>
        <div className="orbit-card three">
          <div className="mono-label card-kicker">in motion</div>
          <strong>Thursday, 10:00</strong>
          <small>on your calendar</small>
        </div>
      </div>
    </div>
  );
}

function MethodSection() {
  const steps = [
    {
      number: '01 / notice',
      icon: <Lightbulb size={21} strokeWidth={1.7} aria-hidden="true" />,
      title: 'Catch the signal',
      copy: 'Drop in the half-sentence, voice note, or strange little spark before it disappears.',
    },
    {
      number: '02 / shape',
      icon: <Compass size={21} strokeWidth={1.7} aria-hidden="true" />,
      title: 'Find the thread',
      copy: 'Morrow gently gathers the fragments until the idea starts to tell you what it wants.',
    },
    {
      number: '03 / move',
      icon: <Target size={21} strokeWidth={1.7} aria-hidden="true" />,
      title: 'Choose a next',
      copy: 'Leave the swirl with one clear, doable action — and a little more trust in yourself.',
    },
  ];

  return (
    <section className="section" id="method" data-testid="section-method">
      <div className="container-wide">
        <div className="section-heading reveal">
          <div className="mono-label section-kicker">a quieter way forward</div>
          <h2>Less sorting.<br /><em>More becoming.</em></h2>
          <p>
            Morrow is a thinking space for people with more ideas than spare tabs.
            It turns mental static into a shape you can actually move with.
          </p>
        </div>
        <div className="method-grid" data-testid="content-method-steps">
          {steps.map((step, index) => (
            <article className={`method-step reveal reveal-delay-${index + 1}`} key={step.number} data-testid={`card-method-${index + 1}`}>
              <div className="step-number">
                <strong>{step.number}</strong>
                <span className="step-icon">{step.icon}</span>
              </div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkspacePreview() {
  return (
    <section className="workspace-section" id="preview" data-testid="section-preview">
      <div className="container-wide workspace-layout">
        <div className="section-heading reveal">
          <div className="mono-label section-kicker">the little room in your head</div>
          <h2>Give your ideas somewhere <em>to land.</em></h2>
          <p>
            A calm, visual workspace that respects the way real thinking happens:
            in loops, leaps, and occasional very good detours.
          </p>
          <div className="workspace-caption">
            <ArrowUpRight size={17} aria-hidden="true" />
            <span>Built for the space between “someday” and “I started.”</span>
          </div>
        </div>

        <div className="app-window reveal reveal-delay-2" data-testid="preview-app-window">
          <div className="window-bar">
            <span className="window-dot" />
            <span className="window-dot" />
            <span className="window-dot" />
            <span className="window-title">morrow / today</span>
          </div>
          <div className="window-body">
            <aside className="window-sidebar">
              <div className="window-brand"><span className="mini-mark" />morrow</div>
              <div className="side-link active"><Sparkles size={11} />Today</div>
              <div className="side-link"><Lightbulb size={11} />Signals</div>
              <div className="side-link"><Compass size={11} />Threads</div>
              <div className="side-link"><Target size={11} />In motion</div>
            </aside>
            <div className="window-content">
              <div className="window-content-head">
                <div>
                  <h4>Thursday, softly</h4>
                  <div className="date">a little room for what matters</div>
                </div>
                <span className="window-chip">3 clear</span>
              </div>
              <div className="focus-card">
                <div>
                  <small>YOUR NEXT GOOD MOVE</small>
                  <strong>Sketch the first ten minutes</strong>
                </div>
                <span className="focus-check"><Check size={13} strokeWidth={3} /></span>
              </div>
              <div className="progress-row"><span>Making a tiny studio</span><span>67% clear</span></div>
              <div className="progress-track"><div className="progress-fill" /></div>
              <div className="idea-list">
                <div className="idea-row"><span className="idea-dot" />Name the feeling <small>signal</small></div>
                <div className="idea-row"><span className="idea-dot" />Find the first shape <small>thread</small></div>
                <div className="idea-row"><span className="idea-dot" />Send one note <small>move</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignupForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setError('Enter an email so we know where to send the signal.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('That email looks a little unfinished. Try again?');
      return;
    }
    setError('');
    setIsJoined(true);
  };

  if (isJoined) {
    return (
      <div className="success-state" aria-live="polite" data-testid="status-signup-success">
        <span className="success-icon"><Check size={17} strokeWidth={3} /></span>
        <div>
          <strong>You’re on the list.</strong>
          <p>We’ll send a quiet note when Morrow is ready to meet you.</p>
          <button className="text-button" type="button" onClick={() => { setIsJoined(false); setEmail(''); }} data-testid="button-signup-another">
            Use another email <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate data-testid="form-signup">
      <label className="form-label" htmlFor="email">Your email, if you’d like to hear first</label>
      <div className="input-row">
        <input
          className="email-input"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => { setEmail(event.target.value); setError(''); }}
          placeholder="you@somewhere.good"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'email-error' : 'email-hint'}
          data-testid="input-email"
        />
        <button className="submit-button" type="submit" data-testid="button-join-list">Join the list</button>
      </div>
      {error ? <div className="form-error" id="email-error" role="alert" data-testid="status-signup-error">{error}</div> : null}
      <div className="form-hint" id="email-hint"><Mail size={11} style={{ verticalAlign: 'middle', marginRight: 5 }} aria-hidden="true" /> No noise. Just the occasional useful thing.</div>
    </form>
  );
}

function Home() {
  return (
    <main className="site-shell" id="top">
      <header className="container-wide topbar">
        <Brand />
        <nav className="topnav" aria-label="Main navigation">
          <a href="#method" data-testid="link-method">How it works</a>
          <a href="#preview" data-testid="link-preview">A look inside</a>
          <a className="nav-cta" href="#join" data-testid="link-join-top">Get the first note <ArrowUpRight size={14} aria-hidden="true" /></a>
        </nav>
      </header>

      <div className="container-wide hero-wrap">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow mono-label reveal"><span className="eyebrow-dot" /> arriving early 2025</div>
            <h1 className="reveal reveal-delay-1" id="hero-title">Your next good idea is <em>closer</em> than it feels.</h1>
            <p className="hero-description reveal reveal-delay-2">
              Morrow is a gentle tool for turning scattered thoughts into clear momentum.
              Less pressure to have it all figured out. More room to begin.
            </p>
            <div className="hero-actions reveal reveal-delay-3">
              <a className="primary-button" href="#join" data-testid="link-hero-join">Join the first wave <ArrowRight size={15} aria-hidden="true" /></a>
              <a className="text-button" href="#method" data-testid="link-hero-method">See the signal <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
            <div className="hero-note mono-label reveal reveal-delay-3">For the curious, the in-progress, and the quietly ambitious.</div>
          </div>
          <HeroArtwork />
        </section>
      </div>

      <div className="container-wide">
        <div className="proof-strip" data-testid="content-proof-strip">
          <span className="proof-copy">A better place for the ideas you keep returning to.</span>
          <div className="proof-words" aria-label="Morrow is for thinkers, makers, and starters">
            <span>thinkers</span>
            <span>makers</span>
            <span>starters_</span>
            <span>noticers</span>
          </div>
        </div>
      </div>

      <MethodSection />
      <WorkspacePreview />

      <section className="quote-section" data-testid="section-quote">
        <div className="container-wide">
          <div className="quote-mark" aria-hidden="true">“</div>
          <blockquote className="quote">
            The point isn’t to do <em>more</em>. It’s to hear the thing that’s been trying to become clear.
          </blockquote>
          <div className="quote-attribution">
            <span className="avatar">AM</span>
            <span>A note from the Morrow field guide</span>
          </div>
        </div>
      </section>

      <section className="join-section" id="join" data-testid="section-join">
        <div className="container-wide">
          <div className="join-panel">
            <div>
              <div className="mono-label" style={{ color: 'hsl(var(--accent))' }}>stay near the signal</div>
              <h2>Make room for <em>what’s next.</em></h2>
              <p>We’re building Morrow slowly and with care. Leave your email and we’ll let you know when the first door opens.</p>
            </div>
            <SignupForm />
          </div>
        </div>
      </section>

      <footer className="container-wide footer">
        <a className="brand footer-brand" href="#top" data-testid="link-footer-brand"><span className="brand-mark" aria-hidden="true" />morrow</a>
        <span>© 2025 Morrow, for ideas in progress.</span>
        <div className="footer-links">
          <a href="#method" data-testid="link-footer-method">Method</a>
          <a href="#join" data-testid="link-footer-join">Launch list</a>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;