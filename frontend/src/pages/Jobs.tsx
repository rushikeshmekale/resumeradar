import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Radar, Search, Briefcase, MapPin, ExternalLink, Building2,
  Sparkles, LogOut, Plus, ArrowRight, Filter,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Job = {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  type: "Full-time" | "Contract" | "Part-time";
  remote: boolean;
  posted: string;
  salary?: string;
  tags: string[];
  match: number;
  reason: string;
};

const SEED_JOBS: Job[] = [
  { id: "1", title: "Senior Frontend Engineer", company: "Stripe", location: "San Francisco, CA", type: "Full-time", remote: true, posted: "2d ago", salary: "$180k – $240k", tags: ["React", "TypeScript", "Next.js"], match: 94, reason: "Strong React + TS match in your resume" },
  { id: "2", title: "Staff Software Engineer", company: "Vercel", location: "Remote · US", type: "Full-time", remote: true, posted: "1d ago", salary: "$220k – $300k", tags: ["Next.js", "Edge", "Node"], match: 91, reason: "Edge runtime experience aligns" },
  { id: "3", title: "Product Designer", company: "Linear", location: "Remote · EU", type: "Full-time", remote: true, posted: "3d ago", salary: "€90k – €130k", tags: ["Figma", "Design Systems"], match: 76, reason: "Portfolio shows systems thinking" },
  { id: "4", title: "Full-Stack Engineer", company: "Notion", location: "New York, NY", type: "Full-time", remote: false, posted: "5h ago", salary: "$170k – $230k", tags: ["React", "Postgres", "TypeScript"], match: 88, reason: "Full-stack TS resume keywords matched" },
  { id: "5", title: "Data Scientist", company: "Airbnb", location: "Remote · US", type: "Full-time", remote: true, posted: "1w ago", salary: "$160k – $210k", tags: ["Python", "ML", "SQL"], match: 72, reason: "Add more ML project bullets" },
  { id: "6", title: "Backend Engineer (Go)", company: "Cloudflare", location: "Austin, TX", type: "Full-time", remote: true, posted: "4d ago", salary: "$170k – $220k", tags: ["Go", "Distributed Systems"], match: 68, reason: "Highlight any Go or systems work" },
  { id: "7", title: "DevRel Engineer", company: "Supabase", location: "Remote · Global", type: "Full-time", remote: true, posted: "2d ago", salary: "$130k – $180k", tags: ["Content", "Postgres", "TypeScript"], match: 81, reason: "Writing + TS combo fits well" },
  { id: "8", title: "ML Engineer", company: "OpenAI", location: "San Francisco, CA", type: "Full-time", remote: false, posted: "6d ago", salary: "$250k – $400k", tags: ["PyTorch", "Distributed Training"], match: 65, reason: "Quantify ML impact for stronger match" },
  { id: "9", title: "Senior PM, Growth", company: "Figma", location: "Remote · US", type: "Full-time", remote: true, posted: "3d ago", salary: "$190k – $250k", tags: ["Growth", "Experimentation"], match: 70, reason: "Add growth metrics to bullets" },
  { id: "10", title: "iOS Engineer", company: "Spotify", location: "Stockholm, SE", type: "Full-time", remote: false, posted: "1d ago", salary: "SEK 900k+", tags: ["Swift", "SwiftUI"], match: 60, reason: "Add mobile projects if relevant" },
  { id: "11", title: "Security Engineer", company: "GitHub", location: "Remote · Global", type: "Full-time", remote: true, posted: "5d ago", salary: "$180k – $240k", tags: ["AppSec", "Cloud"], match: 74, reason: "Cloud security keywords matched" },
  { id: "12", title: "Marketing Lead", company: "Loom", location: "Remote · US", type: "Full-time", remote: true, posted: "2d ago", salary: "$140k – $190k", tags: ["B2B SaaS", "Content"], match: 58, reason: "Tailor copy toward B2B SaaS" },
];

const TOP_COMPANIES = ["Stripe", "Vercel", "Linear", "Notion", "Airbnb", "Cloudflare", "Supabase", "OpenAI", "Figma", "Spotify", "GitHub", "Loom"];

function linkedinUrl(query: string) {
  return `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}`;
}
function linkedinCompanyUrl(company: string) {
  return `https://www.linkedin.com/company/${encodeURIComponent(company.toLowerCase().replace(/\s+/g, "-"))}/jobs/`;
}

export default function JobsPanel() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [activeCompany, setActiveCompany] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return SEED_JOBS.filter((j) => {
      if (remoteOnly && !j.remote) return false;
      if (activeCompany && j.company !== activeCompany) return false;
      if (loc && !j.location.toLowerCase().includes(loc.toLowerCase())) return false;
      if (q) {
        const s = `${j.title} ${j.company} ${j.tags.join(" ")}`.toLowerCase();
        if (!s.includes(q.toLowerCase())) return false;
      }
      return true;
    }).sort((a, b) => b.match - a.match);
  }, [q, loc, remoteOnly, activeCompany]);

  const suggestions = useMemo(() => SEED_JOBS.filter((j) => j.match >= 85).slice(0, 3), []);

  function handleSignOut() {
    signOut();
    navigate("/auth", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header email={user?.email ?? ""} onSignOut={handleSignOut} />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
          <div>
            <h1 className="font-display text-4xl md:text-5xl leading-tight">
              Job <span className="text-gradient italic">panel</span>
            </h1>
            <p className="mt-1 text-muted-foreground">Search companies and roles. Every result opens the live LinkedIn posting.</p>
          </div>
          <a
            href={linkedinUrl(q || "software engineer")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-accent transition text-sm font-semibold"
          >
            <ExternalLink className="h-4 w-4" /> Open this search on LinkedIn
          </a>
        </div>

        {/* AI suggestions */}
        <section className="mb-8 rounded-2xl border border-border bg-gradient-card p-6 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-display text-xl">Suggested for your resume</h2>
            <span className="text-xs text-muted-foreground ml-1">· based on your latest analysis</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {suggestions.map((j) => (
              <a
                key={j.id}
                href={linkedinUrl(`${j.title} ${j.company}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-border bg-background p-4 hover:shadow-elegant transition"
              >
                <div className="flex items-center justify-between">
                  <MatchPill score={j.match} />
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="mt-3 font-display text-lg leading-tight">{j.title}</div>
                <div className="text-sm text-muted-foreground">{j.company} · {j.location}</div>
                <p className="mt-2 text-xs text-muted-foreground">{j.reason}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Search bar */}
        <div className="rounded-2xl border border-border bg-gradient-card p-4 md:p-5 shadow-soft">
          <div className="grid md:grid-cols-[1.4fr_1fr_auto_auto] gap-3 items-center">
            <label className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:ring-2 focus-within:ring-ring">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Job title, skill, or company"
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:ring-2 focus-within:ring-ring">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <input
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                placeholder="Location"
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </label>
            <label className="inline-flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl border border-input bg-background cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="accent-[color:var(--primary)]"
              />
              Remote only
            </label>
            <a
              href={linkedinUrl(`${q || "jobs"} ${loc}`.trim())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] transition"
            >
              Search on LinkedIn <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Company chips */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mr-1">
              <Filter className="h-3 w-3" /> Companies:
            </span>
            <button
              onClick={() => setActiveCompany(null)}
              className={`text-xs px-3 py-1 rounded-full border transition ${
                activeCompany === null ? "bg-gradient-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"
              }`}
            >
              All
            </button>
            {TOP_COMPANIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCompany(activeCompany === c ? null : c)}
                className={`text-xs px-3 py-1 rounded-full border transition ${
                  activeCompany === c ? "bg-gradient-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "role" : "roles"}</div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
                No matches. Try a different search — or
                <a
                  href={linkedinUrl(q || "jobs")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-primary hover:underline"
                >
                  search LinkedIn directly
                </a>.
              </div>
            ) : (
              filtered.map((j) => <JobCard key={j.id} job={j} />)
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-gradient-card p-5 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Building2 className="h-4 w-4 text-primary" /> Company quick search
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Jump to a company's live jobs feed on LinkedIn.</p>
              <ul className="mt-4 space-y-1.5">
                {TOP_COMPANIES.slice(0, 8).map((c) => (
                  <li key={c}>
                    <a
                      href={linkedinCompanyUrl(c)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm px-3 py-2 rounded-lg hover:bg-accent transition"
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-md bg-accent grid place-items-center text-xs font-display">{c[0]}</span>
                        {c}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-card p-5 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-primary" /> Application tips
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>· Tailor your resume to each role before applying.</li>
                <li>· Apply within 48 hours of posting for best response rates.</li>
                <li>· Reach out to a recruiter or hiring manager on LinkedIn.</li>
                <li>· Use the analyzer to score your fit before submitting.</li>
              </ul>
              <Link
                to="/dashboard"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Re-analyze my resume <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <div className="group rounded-2xl border border-border bg-gradient-card p-5 hover:shadow-elegant transition">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-accent grid place-items-center text-accent-foreground font-display text-xl">
          {job.company[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="font-display text-xl leading-tight">{job.title}</div>
              <div className="text-sm text-muted-foreground">
                {job.company} · {job.location} {job.remote && <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-accent text-accent-foreground">Remote</span>}
              </div>
            </div>
            <MatchPill score={job.match} />
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.type}</span>
            {job.salary && <span>· {job.salary}</span>}
            <span>· {job.posted}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <a
              href={linkedinUrl(`${job.title} ${job.company}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground hover:shadow-glow transition"
            >
              Apply on LinkedIn <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={linkedinCompanyUrl(job.company)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border border-border hover:bg-accent transition"
            >
              <Building2 className="h-3.5 w-3.5" /> {job.company} jobs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchPill({ score }: { score: number }) {
  const tone =
    score >= 85 ? "bg-primary/10 text-primary border-primary/30" :
    score >= 70 ? "bg-accent text-accent-foreground border-border" :
    "bg-muted text-muted-foreground border-border";
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tone}`}>
      {score}% match
    </span>
  );
}

function Header({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="relative inline-grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Radar className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} />
          </span>
          <span className="font-display text-2xl tracking-tight">Resume<span className="text-gradient italic">Radar</span></span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-border hover:bg-accent transition"
          >
            <Plus className="h-4 w-4" /> New analysis
          </Link>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg bg-gradient-primary text-primary-foreground hover:shadow-glow transition"
          >
            <Briefcase className="h-4 w-4" /> Jobs
          </Link>
          <div className="hidden md:block text-sm text-muted-foreground max-w-[180px] truncate">{email}</div>
          <button
            onClick={onSignOut}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-border hover:bg-accent transition"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
