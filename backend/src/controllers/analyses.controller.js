import { Analysis } from "../models/Analysis.js";
import { analyzeResumeWithAI } from "../services/ai.service.js";

export async function createAnalysis(req, res) {
  try {
    const { resumeText, jobDescription, jobTitle, resumeFilename } = req.body ?? {};

    if (!resumeText || resumeText.length < 20 || resumeText.length > 60000) {
      return res.status(400).json({ error: "resumeText must be between 20 and 60000 characters" });
    }
    if (!jobDescription || jobDescription.length < 20 || jobDescription.length > 20000) {
      return res.status(400).json({ error: "jobDescription must be between 20 and 20000 characters" });
    }
    if (!resumeFilename) {
      return res.status(400).json({ error: "resumeFilename is required" });
    }

    const result = await analyzeResumeWithAI({ resumeText, jobDescription, jobTitle, userId: req.userId });

    const analysis = await Analysis.create({
      userId: req.userId,
      resumeFilename,
      resumeText,
      jobTitle: jobTitle || null,
      jobDescription,
       cacheHash: result.cacheHash,
      ...result,
    });

    return res.status(201).json({ id: analysis._id });
  } catch (err) {
    console.error("createAnalysis error:", err);
    return res.status(500).json({ error: err.message || "Could not analyze resume" });
  }
}

export async function listAnalyses(req, res) {
  const analyses = await Analysis.find({ userId: req.userId })
    .select("resumeFilename jobTitle overallScore createdAt")
    .sort({ createdAt: -1 })
    .lean();
  return res.json({ analyses });
}

export async function getAnalysis(req, res) {
  const analysis = await Analysis.findOne({ _id: req.params.id, userId: req.userId }).lean();
  if (!analysis) return res.status(404).json({ error: "Analysis not found" });
  return res.json({ analysis });
}

export async function deleteAnalysis(req, res) {
  const result = await Analysis.deleteOne({ _id: req.params.id, userId: req.userId });
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Analysis not found" });
  }
  return res.json({ ok: true });
}
