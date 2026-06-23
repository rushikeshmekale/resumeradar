import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Radar, ArrowRight, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        await signUp(email, password, name || email.split("@")[0]);
        toast.success("Account created — you're in!");
      } else {
        await signIn(email, password);
        toast.success("Welcome back!");
      }
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-md px-6 py-10">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center shadow-soft">
            <Radar className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} />
          </div>
          <span className="font-display text-2xl">ResumeRadar</span>
        </Link>

        <div className="rounded-2xl border border-border bg-gradient-card shadow-elegant p-8">
          <h1 className="font-display text-3xl">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Sign in to analyze and improve your resume."
              : "Start beating the bots in under a minute."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            {mode === "signup" && (
              <Field icon={<UserIcon className="h-4 w-4" />}>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm py-2.5"
                />
              </Field>
            )}
            <Field icon={<Mail className="h-4 w-4" />}>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm py-2.5"
              />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />}>
              <input
                type="password"
                required
                minLength={6}
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm py-2.5"
              />
            </Field>
            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New to ResumeRadar?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-semibold text-primary hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-3 rounded-xl border border-input bg-background focus-within:ring-2 focus-within:ring-ring transition">
      <span className="text-muted-foreground">{icon}</span>
      {children}
    </div>
  );
}
