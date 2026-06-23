import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles,
  Radar,
  Target,
  Shield,
  Zap,
  TrendingUp,
  Upload,
  BarChart3,
  Brain,
  Briefcase,
  Star,
} from "lucide-react";

function BrandMark() {
  return (
    <span className="relative inline-grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary shadow-glow">
      <Radar className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} />
      <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/40" />
    </span>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <BrandMark />
          <span className="font-display text-2xl tracking-tight">Resume<span className="text-gradient italic">Radar</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="/jobs" className="hover:text-foreground transition">Jobs</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
            100% Free
          </span>
          <a href="/auth" className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-lg hover:bg-muted transition">
            Sign in
          </a>
          <a
            href="/auth"
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow transition"
          >
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Powered by Gemini AI · 90% of Fortune 500 use ATS
        </div>

        <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] text-foreground max-w-5xl mx-auto">
          Beat the bots. <br />
          <span className="text-gradient italic">Land the interview.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          75% of resumes never reach a human. Upload yours, paste a job description, and get an
          instant ATS score with AI-powered fixes in seconds.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/auth"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition"
          >
            Analyze my resume free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card/80 backdrop-blur font-semibold hover:bg-card transition"
          >
            See how it works
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> No credit card</div>
          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 30-second results</div>
          <div className="hidden sm:flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Private & secure</div>
        </div>

        {/* Dashboard mock */}
        <div className="relative mt-16 mx-auto max-w-5xl">
          <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
          <div className="relative rounded-2xl border border-border bg-gradient-card shadow-elegant overflow-hidden text-left">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/40">
              <div className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
              <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <div className="ml-3 text-xs text-muted-foreground">resuscore.app / analysis</div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 p-6 md:p-8">
              <div className="md:col-span-1 flex flex-col items-center justify-center text-center p-6 rounded-xl border border-border bg-background/60">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">ATS Score</div>
                <div className="relative my-3">
                  <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="oklch(0.93 0.015 25)" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke="url(#g)" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${(87 / 100) * 326.7} 326.7`}
                    />
                    <defs>
                      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="oklch(0.58 0.22 27)" />
                        <stop offset="100%" stopColor="oklch(0.72 0.22 18)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div>
                      <div className="font-display text-5xl text-gradient leading-none">87</div>
                      <div className="text-xs text-muted-foreground mt-1">/ 100</div>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-primary">Strong match</div>
              </div>
              <div className="md:col-span-2 space-y-3">
                {[
                  { label: "Keyword Match", v: 92, tag: "Excellent" },
                  { label: "Formatting & Parseability", v: 96, tag: "Perfect" },
                  { label: "Skills Coverage", v: 78, tag: "Good" },
                  { label: "Action Verbs & Impact", v: 71, tag: "Improve" },
                ].map((r) => (
                  <div key={r.label} className="p-4 rounded-xl border border-border bg-background/60">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium">{r.label}</span>
                      <span className="text-xs text-muted-foreground">{r.tag} · {r.v}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-primary rounded-full" style={{ width: `${r.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const logos = ["Jobscan", "ResumeWorded", "SkillSyncer", "Enhancv", "Kickresume", "Novoresume"];
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-5">
          Built on the same playbook the pros use
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-muted-foreground/70 font-display text-xl">
          {logos.map((l) => <span key={l}>{l}</span>)}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Target, title: "ATS Keyword Scoring", desc: "Match your resume to job descriptions with surgical precision and find missing keywords instantly." },
    { icon: Brain, title: "Gemini-Powered Rewrites", desc: "Get specific, line-by-line suggestions to strengthen bullets, verbs, and quantified impact." },
    { icon: FileText, title: "PDF Parsing That Works", desc: "Bulletproof extraction from any PDF resume — even messy ones with columns and tables." },
    { icon: Shield, title: "Private by Design", desc: "Your resume never trains a model. Encrypted in transit, deleted on request." },
    { icon: BarChart3, title: "Per-Section Insights", desc: "Formatting, skills, experience, summary — each scored independently so you know what to fix." },
    { icon: Zap, title: "30-Second Results", desc: "From upload to actionable feedback in under a minute. Iterate, re-score, apply." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">Features</div>
        <h2 className="mt-3 font-display text-4xl md:text-6xl leading-tight">
          Everything you need to <span className="italic text-gradient">get past the filter</span>.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A complete toolkit that mirrors how real ATS systems read, rank, and reject — so yours doesn't.
        </p>
      </div>
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group relative p-7 rounded-2xl border border-border bg-gradient-card hover:shadow-elegant transition">
            <div className="h-11 w-11 rounded-xl bg-accent grid place-items-center text-accent-foreground group-hover:bg-gradient-primary group-hover:text-primary-foreground transition">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-2xl">{title}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function How() {
  const steps = [
    { n: "01", icon: Upload, title: "Upload your resume", desc: "Drop in your PDF. We extract every line, even from complex layouts." },
    { n: "02", icon: FileText, title: "Paste the job description", desc: "We tokenize and weight keywords the way modern ATS scanners do." },
    { n: "03", icon: TrendingUp, title: "Get your score + fixes", desc: "Section-by-section breakdown plus AI rewrites you can apply in one click." },
  ];
  return (
    <section id="how" className="relative bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">How it works</div>
          <h2 className="mt-3 font-display text-4xl md:text-6xl leading-tight">
            Three steps. <span className="italic text-gradient">One better resume.</span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6 relative">
          {steps.map(({ n, icon: Icon, title, desc }, i) => (
            <div key={n} className="relative p-7 rounded-2xl bg-background border border-border shadow-soft">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl text-gradient">{n}</span>
                <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mt-6 font-display text-2xl">{title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 h-px w-6 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Analyze() {
  return (
    <section id="analyze" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-card shadow-elegant">
        <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
        <div className="relative p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Try it now</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight">
              Score your resume in <span className="italic text-gradient">under a minute</span>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              No signup needed for your first analysis. See exactly why ATS systems reject — or accept — your resume.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Instant ATS score", "Missing keyword detection", "AI-rewritten bullet points", "Section-level grading"].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />{t}</li>
              ))}
            </ul>
          </div>
          <form className="space-y-4 p-6 rounded-2xl bg-background border border-border shadow-soft">
            <label className="block">
              <span className="text-sm font-medium">Resume (PDF)</span>
              <div className="mt-2 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition p-8 text-center cursor-pointer bg-muted/30">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                <div className="mt-2 text-sm font-medium">Drop PDF or click to upload</div>
                <div className="text-xs text-muted-foreground">Max 10MB</div>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium">Job description</span>
              <textarea
                rows={4}
                placeholder="Paste the role you're targeting…"
                className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </label>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] transition"
            >
              Analyze now <Sparkles className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { q: "Went from 0 interviews in 3 months to 6 in 2 weeks. The keyword gap report was a game-changer.", a: "Priya S.", r: "SWE @ fintech" },
    { q: "I thought my resume was great. ResumeRadar showed me it was scoring 41/100. After fixes, 89.", a: "Marcus L.", r: "PM, ex-startup" },
    { q: "Better than any paid resume review I've used. And it takes 30 seconds.", a: "Aïcha B.", r: "Data analyst" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">Loved by job seekers</div>
        <h2 className="mt-3 font-display text-4xl md:text-6xl leading-tight">
          Real callbacks. <span className="italic text-gradient">Real offers.</span>
        </h2>
      </div>
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {t.map((x) => (
          <figure key={x.a} className="p-7 rounded-2xl border border-border bg-gradient-card shadow-soft">
            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-4 font-display text-2xl leading-snug">"{x.q}"</blockquote>
            <figcaption className="mt-5 text-sm">
              <div className="font-semibold">{x.a}</div>
              <div className="text-muted-foreground">{x.r}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Free", price: "$0", desc: "Get started, no card required.", features: ["3 analyses / month", "ATS score & keyword report", "Basic AI suggestions"], cta: "Start free", featured: false },
    { name: "Pro", price: "$12", desc: "For active job seekers.", features: ["Unlimited analyses", "Full AI rewrites", "Cover letter generator", "Version history"], cta: "Go Pro", featured: true },
    { name: "Teams", price: "$29", desc: "Career services & coaches.", features: ["5 seats included", "Shared templates", "Bulk uploads", "Priority support"], cta: "Contact sales", featured: false },
  ];
  return (
    <section id="pricing" className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Pricing</div>
          <h2 className="mt-3 font-display text-4xl md:text-6xl leading-tight">
            Simple. <span className="italic text-gradient">Honest.</span>
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative p-8 rounded-2xl border ${p.featured ? "border-primary bg-background shadow-glow" : "border-border bg-background shadow-soft"}`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-primary text-primary-foreground">
                  Most popular
                </div>
              )}
              <div className="font-display text-2xl">{p.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl">{p.price}</span>
                <span className="text-muted-foreground text-sm">/ month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />{f}</li>
                ))}
              </ul>
              <button
                className={`mt-7 w-full py-3 rounded-xl font-semibold transition ${
                  p.featured
                    ? "bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                    : "border border-border hover:bg-muted"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How accurate is the ATS score?", a: "We model the most common parsing and ranking patterns used by Workday, Greenhouse, Lever, Taleo and others. Scores correlate strongly with real callback rates." },
    { q: "Is my resume data private?", a: "Yes. Files are encrypted in transit and at rest. We never sell data or use your resume to train models. Delete anytime." },
    { q: "Which file formats are supported?", a: "PDF is fully supported today. DOCX is coming soon." },
    { q: "Do I need to sign up?", a: "Your first analysis is free without an account. Sign up to save history and unlock unlimited analyses." },
  ];
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">FAQ</div>
        <h2 className="mt-3 font-display text-4xl md:text-6xl leading-tight">
          Questions, <span className="italic text-gradient">answered</span>.
        </h2>
      </div>
      <div className="mt-12 divide-y divide-border border-y border-border">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-display text-xl md:text-2xl">{f.q}</span>
              <span className="h-7 w-7 rounded-full border border-border grid place-items-center text-muted-foreground group-open:bg-gradient-primary group-open:text-primary-foreground group-open:border-transparent transition">+</span>
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl relative overflow-hidden rounded-3xl bg-gradient-primary text-primary-foreground p-12 md:p-20 text-center shadow-glow">
        <div className="absolute inset-0 opacity-30" style={{
          background: "radial-gradient(circle at 20% 20%, white, transparent 40%), radial-gradient(circle at 80% 80%, white, transparent 40%)"
        }} />
        <div className="relative">
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Your next offer is one <span className="italic">score</span> away.
          </h2>
          <p className="mt-4 text-primary-foreground/85 max-w-xl mx-auto">
            Stop guessing why you're not hearing back. Get the answer in 30 seconds.
          </p>
          <a
            href="/auth"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-background text-foreground font-semibold hover:scale-[1.02] transition shadow-elegant"
          >
            Analyze my resume free <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <BrandMark />
            <span className="font-display text-2xl tracking-tight">Resume<span className="text-gradient italic">Radar</span></span>
          </div>
          <p className="mt-3 text-muted-foreground max-w-sm">
            Free AI-powered ATS analysis and curated job suggestions. Get past the bots and into the interview.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3">Product</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="/jobs" className="hover:text-foreground">Jobs</a></li>
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} ResumeRadar. Free forever.</span>
          <span>Made with ♥ for job seekers everywhere.</span>
        </div>
      </div>
    </footer>
  );
}

function JobsTeaser() {
  const jobs = [
    { title: "Senior Frontend Engineer", company: "Stripe", location: "Remote · US", tags: ["React", "TypeScript"] },
    { title: "Product Designer", company: "Linear", location: "Remote · EU", tags: ["Figma", "Design Systems"] },
    { title: "Data Scientist", company: "Notion", location: "San Francisco", tags: ["Python", "ML"] },
  ];
  return (
    <section id="jobs" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Job panel</div>
          <h2 className="mt-3 font-display text-4xl md:text-6xl leading-tight">
            Find roles. <span className="italic text-gradient">Apply on LinkedIn.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Search companies and titles, then jump straight to the live LinkedIn posting in one click.
          </p>
        </div>
        <a
          href="/jobs"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition"
        >
          <Briefcase className="h-4 w-4" /> Open Job Panel
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {jobs.map((j) => (
          <a
            key={j.title}
            href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(j.title + " " + j.company)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl border border-border bg-gradient-card hover:shadow-elegant transition"
          >
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-accent grid place-items-center text-accent-foreground font-display text-lg">
                {j.company[0]}
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-primary transition">Open on LinkedIn →</span>
            </div>
            <h3 className="mt-4 font-display text-xl leading-tight">{j.title}</h3>
            <div className="mt-1 text-sm text-muted-foreground">{j.company} · {j.location}</div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {j.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Landing() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Logos />
      <Features />
      <How />
      <Analyze />
      <JobsTeaser />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

export default function LandingPage() {
  return <Landing />;
}
