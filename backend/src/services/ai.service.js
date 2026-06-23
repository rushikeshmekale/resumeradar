import crypto from "crypto";

const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) resume analyzer used by recruiters at Fortune 500 companies.
You score resumes against job descriptions the way modern ATS systems (Workday, Greenhouse, Lever, Taleo) do.

Return ONLY valid JSON — no markdown, no code fences, no commentary:
{
  "overallScore": number 0-100,
  "keywordScore": number 0-100,
  "formattingScore": number 0-100,
  "skillsScore": number 0-100,
  "impactScore": number 0-100,
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "suggestions": [{ "title": string, "detail": string, "severity": "high"|"medium"|"low" }],
  "summary": string
}

Scoring:
- overallScore: weighted blend (keyword 35%, skills 25%, impact 20%, formatting 20%)
- keywordScore: keyword match between resume and JD
- skillsScore: depth of skills vs JD requirements
- impactScore: quantified achievements and action verbs
- formattingScore: ATS-readability, clean sections, no tables/graphics
Be specific and honest. No generic advice.`;

function clamp(n) {
  return Math.max(0, Math.min(100, Math.round(Number(n) || 0)));
}

function cacheHash(resumeText, jobDescription) {
  return crypto
    .createHash("sha256")
    .update(resumeText.slice(0, 3000) + "||" + jobDescription.slice(0, 2000))
    .digest("hex");
}

export async function analyzeResumeWithAI({ resumeText, jobDescription, jobTitle }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("AI is not configured (missing GROQ_API_KEY)");

  const userPrompt = `JOB TITLE: ${jobTitle || "(not provided)"}

JOB DESCRIPTION:
"""
${jobDescription}
"""

CANDIDATE RESUME (extracted text):
"""
${resumeText}
"""

Analyze and return ONLY the JSON object now.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2048,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[groq] error", res.status, text);
    if (res.status === 429) throw new Error("Rate limit reached. Try again in a moment.");
    throw new Error(`AI analysis failed (${res.status})`);
  }

  const json = await res.json();
  const content = json.choices?.[0]?.message?.content ?? "";

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("AI returned an unparseable response");
    parsed = JSON.parse(match[0]);
  }

  const hash = cacheHash(resumeText, jobDescription);

  return {
    overallScore: clamp(parsed.overallScore),
    keywordScore: clamp(parsed.keywordScore),
    formattingScore: clamp(parsed.formattingScore),
    skillsScore: clamp(parsed.skillsScore),
    impactScore: clamp(parsed.impactScore),
    matchedKeywords: Array.isArray(parsed.matchedKeywords) ? parsed.matchedKeywords.slice(0, 30) : [],
    missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords.slice(0, 30) : [],
    suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.slice(0, 12) : [],
    summary: typeof parsed.summary === "string" ? parsed.summary.slice(0, 2000) : null,
    cacheHash: hash,
  };
}