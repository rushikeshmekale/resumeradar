const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const TOKEN_KEY = "resumeradar_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data as T;
}

export type User = {
  _id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
};

export type AnalysisSummary = {
  _id: string;
  resumeFilename: string;
  jobTitle: string | null;
  overallScore: number;
  createdAt: string;
};

export type AnalysisDetail = AnalysisSummary & {
  resumeText: string;
  jobDescription: string;
  keywordScore: number;
  formattingScore: number;
  skillsScore: number;
  impactScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: { title: string; detail: string; severity: "high" | "medium" | "low" }[];
  summary: string | null;
};

export const api = {
  auth: {
    signup: (data: { email: string; password: string; fullName?: string }) =>
      request<{ token: string; user: User }>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    login: (data: { email: string; password: string }) =>
      request<{ token: string; user: User }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    me: () => request<{ user: User }>("/api/auth/me"),
  },
  analyses: {
    create: (data: {
      resumeText: string;
      jobDescription: string;
      jobTitle?: string;
      resumeFilename: string;
    }) =>
      request<{ id: string }>("/api/analyses", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    list: () => request<{ analyses: AnalysisSummary[] }>("/api/analyses"),
    get: (id: string) => request<{ analysis: AnalysisDetail }>(`/api/analyses/${id}`),
    remove: (id: string) =>
      request<{ ok: true }>(`/api/analyses/${id}`, { method: "DELETE" }),
  },
};
