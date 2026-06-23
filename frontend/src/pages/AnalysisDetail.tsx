import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Radar, ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Loader2,
  Trash2, Plus, LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api, type AnalysisDetail } from "@/lib/api";

export default function AnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [row, setRow] = useState<AnalysisDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.analyses
      .get(id)
      .then(({ analysis }) => {
        setRow(analysis);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Analysis not found");
        navigate("/dashboard");
      });
  }, [id, navigate]);

  async function handleDelete() {
    if (!id || !confirm("Delete this analysis?")) return;
    try {
      await api.analyses.remove(id);
      toast.success("Deleted");
      navigate("/dashboard");
    } catch {
      toast.error("Could not delete");
    }
  }

  function handleSignOut() {
    signOut();
    navigate("/auth", { replace: true });
  }

  if (loading || !row) {
    return (
      <div className="min-h-screen bg-background grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const breakdown = [
    { label: "Keyword Match", v: row.keywordScore },
    { label: "Skills Coverage", v: row.skillsScore },
    { label: "Impact & Action Verbs", v: row.impactScore },
    { label: "Formatting & Parseability", v: row.formattingScore },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center shadow-soft">
              <Radar className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} />
            </div>
            <span className="font-display text-2xl">ResumeRadar</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-gradient-primary text-primary-foreground hover:shadow-glow transition"
            >
              <Plus className="h-3.5 w-3.5" /> New
            </Link>
            <div className="hidden sm:block text-sm text-muted-foreground max-w-[180px] truncate">{user?.email}</div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-border hover:bg-accent transition"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 sm:px-6 py-10">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <div>
            <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
            </Link>
            <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
              {row.jobTitle || "ATS Analysis"}
            </h1>
            <div className="mt-1 text-sm text-muted-foreground">
              {row.resumeFilename} · {new Date(row.createdAt).toLocaleString()}
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-border hover:bg-destructive/10 hover:text-destructive transition"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <section className="rounded-2xl border border-border bg-gradient-card shadow-elegant p-8 text-center flex flex-col items-center justify-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">ATS Score</div>
            <ScoreRing score={row.overallScore} />
            <div className={`mt-2 text-sm font-semibold ${row.overallScore >= 80 ? "text-primary" : row.overallScore >= 60 ? "text-foreground" : "text-muted-foreground"}`}>
              {row.overallScore >= 80 ? "Strong match" : row.overallScore >= 60 ? "Decent match" : "Needs work"}
            </div>
          </section>

          <section className="lg:col-span-2 rounded-2xl border border-border bg-gradient-card shadow-soft p-6 space-y-3">
            <h2 className="font-display text-2xl">Breakdown</h2>
            {breakdown.map((b) => (
              <div key={b.label} className="p-4 rounded-xl border border-border bg-background/60">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">{b.label}</span>
                  <span className="text-muted-foreground">{b.v}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: `${b.v}%` }} />
                </div>
              </div>
            ))}
          </section>

          {row.summary && (
            <section className="lg:col-span-3 rounded-2xl border border-border bg-accent/30 shadow-soft p-6">
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">Summary</div>
              <p className="mt-2 font-display text-2xl leading-snug">{row.summary}</p>
            </section>
          )}

          <section className="rounded-2xl border border-border bg-gradient-card shadow-soft p-6">
            <h2 className="font-display text-2xl flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> Matched keywords
            </h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {row.matchedKeywords.length === 0 && <span className="text-sm text-muted-foreground">None detected.</span>}
              {row.matchedKeywords.map((k) => (
                <span key={k} className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent text-accent-foreground border border-border">
                  {k}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-gradient-card shadow-soft p-6">
            <h2 className="font-display text-2xl flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" /> Missing keywords
            </h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {row.missingKeywords.length === 0 && <span className="text-sm text-muted-foreground">Nothing missing — nice!</span>}
              {row.missingKeywords.map((k) => (
                <span key={k} className="text-xs font-medium px-2.5 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/30">
                  {k}
                </span>
              ))}
            </div>
          </section>

          <section className="lg:col-span-3 rounded-2xl border border-border bg-gradient-card shadow-soft p-6">
            <h2 className="font-display text-2xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" /> AI suggestions
            </h2>
            {row.suggestions.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No suggestions — looking solid.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {row.suggestions.map((s, i) => (
                  <li key={i} className="p-4 rounded-xl border border-border bg-background/60">
                    <div className="flex items-center gap-2">
                      <SeverityChip s={s.severity} />
                      <div className="font-semibold">{s.title}</div>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score));
  const dash = (pct / 100) * 326.7;
  return (
    <div className="relative my-3">
      <svg viewBox="0 0 120 120" className="h-44 w-44 -rotate-90">
        <circle cx="60" cy="60" r="52" fill="none" stroke="oklch(0.93 0.015 25)" strokeWidth="10" />
        <circle cx="60" cy="60" r="52" fill="none" stroke="url(#ringg)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${dash} 326.7`} />
        <defs>
          <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.58 0.22 27)" />
            <stop offset="100%" stopColor="oklch(0.72 0.22 18)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div>
          <div className="font-display text-6xl text-gradient leading-none">{pct}</div>
          <div className="text-xs text-muted-foreground mt-1">/ 100</div>
        </div>
      </div>
    </div>
  );
}

function SeverityChip({ s }: { s: "high" | "medium" | "low" }) {
  const map = {
    high: "bg-destructive/10 text-destructive border-destructive/30",
    medium: "bg-accent text-accent-foreground border-border",
    low: "bg-muted text-muted-foreground border-border",
  } as const;
  return <span className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border ${map[s]}`}>{s}</span>;
}
