import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Radar, Upload, FileText, Loader2, LogOut, ArrowRight,
  Trash2, TrendingUp, Plus, History, Briefcase,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api, type AnalysisSummary } from "@/lib/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [history, setHistory] = useState<AnalysisSummary[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [parsing, setParsing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    setLoadingHistory(true);
    try {
      const { analyses } = await api.analyses.list();
      setHistory(analyses);
    } catch {
      toast.error("Failed to load history");
    } finally {
      setLoadingHistory(false);
    }
  }

  async function onFileChange(f: File | null) {
    if (!f) return;
    if (f.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error("File too large (max 10MB)");
      return;
    }
    setFile(f);
    setParsing(true);
    try {
      const { extractPdfText } = await import("@/lib/pdf-extract");
      const text = await extractPdfText(f);
      if (text.length < 50) throw new Error("Couldn't extract enough text from this PDF");
      setResumeText(text);
      toast.success(`Extracted ${text.length.toLocaleString()} characters`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "PDF parsing failed");
      setFile(null);
      setResumeText("");
    } finally {
      setParsing(false);
    }
  }

  async function handleAnalyze() {
    if (!file || !resumeText) return toast.error("Upload a resume first");
    if (jobDescription.trim().length < 20) return toast.error("Add a job description (20+ chars)");

    setAnalyzing(true);
    try {
      const result = await api.analyses.create({
        resumeText,
        jobDescription,
        jobTitle: jobTitle || undefined,
        resumeFilename: file.name,
      });
      toast.success("Analysis complete!");
      navigate(`/analysis/${result.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  }

  function handleSignOut() {
    signOut();
    navigate("/auth", { replace: true });
  }

  async function handleDelete(id: string) {
    try {
      await api.analyses.remove(id);
      setHistory((h) => h.filter((a) => a._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Could not delete");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header email={user?.email ?? ""} onSignOut={handleSignOut} />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="font-display text-4xl md:text-5xl leading-tight">
              New <span className="text-gradient italic">analysis</span>
            </h1>
            <p className="mt-1 text-muted-foreground">Upload a resume and paste a job description to get an instant ATS score.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <Label step={1} title="Upload your resume" subtitle="PDF only · max 10MB" />
              <label className={`mt-4 block rounded-xl border-2 border-dashed transition cursor-pointer p-8 text-center ${file ? "border-primary/60 bg-accent/40" : "border-border hover:border-primary/40 bg-muted/30"}`}>
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                />
                {parsing ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Parsing PDF…
                  </div>
                ) : file ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB · {resumeText.length.toLocaleString()} chars extracted</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                    <div className="mt-2 text-sm font-medium">Drop PDF or click to upload</div>
                    <div className="text-xs text-muted-foreground">We extract every line, even from complex layouts</div>
                  </>
                )}
              </label>
            </Card>

            <Card>
              <Label step={2} title="Job details" subtitle="Paste the role you're targeting" />
              <input
                type="text"
                placeholder="Job title (optional) — e.g. Senior Frontend Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="mt-4 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                rows={10}
                placeholder="Paste the full job description here…"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-3 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <div className="mt-1 text-xs text-muted-foreground text-right">{jobDescription.length.toLocaleString()} chars</div>
            </Card>

            <button
              onClick={handleAnalyze}
              disabled={analyzing || parsing || !file || !resumeText || !jobDescription}
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.005] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {analyzing ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing with AI…</>
              ) : (
                <>Run ATS analysis <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </div>

          <aside className="space-y-5">
            <Card>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <History className="h-4 w-4 text-primary" /> Recent analyses
              </div>
              {loadingHistory ? (
                <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading…
                </div>
              ) : history.length === 0 ? (
                <div className="mt-4 text-sm text-muted-foreground">
                  No analyses yet. Run your first one to see it here.
                </div>
              ) : (
                <ul className="mt-4 space-y-2">
                  {history.map((a) => (
                    <li key={a._id} className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/40 transition">
                      <ScoreBadge score={a.overallScore} />
                      <Link to={`/analysis/${a._id}`} className="flex-1 min-w-0">
                        <div className="truncate text-sm font-medium">{a.jobTitle || a.resumeFilename}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {new Date(a.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })} · {a.resumeFilename}
                        </div>
                      </Link>
                      <button
                        onClick={() => handleDelete(a._id)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <TrendingUp className="h-4 w-4 text-primary" /> Tips
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>· Tailor for each role — keywords matter.</li>
                <li>· Lead bullets with strong verbs and metrics.</li>
                <li>· Avoid tables, columns, and images — ATS hates them.</li>
                <li>· Re-run after edits to see your score climb.</li>
              </ul>
            </Card>
          </aside>
        </div>
      </main>
    </div>
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
        <div className="flex items-center gap-3">
          <Link
            to="/jobs"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-border hover:bg-accent transition"
          >
            <Briefcase className="h-4 w-4" /> Jobs
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg bg-gradient-primary text-primary-foreground hover:shadow-glow transition"
          >
            <Plus className="h-4 w-4" /> New analysis
          </Link>
          <div className="hidden sm:block text-sm text-muted-foreground max-w-[180px] truncate">{email}</div>
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

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-gradient-card shadow-soft p-6">{children}</div>;
}

function Label({ step, title, subtitle }: { step: number; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-primary text-primary-foreground font-display text-sm grid place-items-center shadow-soft">{step}</div>
      <div>
        <div className="font-display text-xl leading-tight">{title}</div>
        {subtitle && <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>}
      </div>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const tone = score >= 80 ? "text-primary" : score >= 60 ? "text-foreground" : "text-muted-foreground";
  return (
    <div className={`h-11 w-11 shrink-0 rounded-xl border border-border bg-background grid place-items-center font-display text-lg ${tone}`}>
      {score}
    </div>
  );
}
