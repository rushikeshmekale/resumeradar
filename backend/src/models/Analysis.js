import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    detail: { type: String, required: true },
    severity: { type: String, enum: ["high", "medium", "low"], required: true },
  },
  { _id: false },
);

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeFilename: { type: String, required: true },
    resumeText: { type: String, required: true },
    jobTitle: { type: String },
    jobDescription: { type: String, required: true },
    overallScore: { type: Number, default: 0 },
    keywordScore: { type: Number, default: 0 },
    formattingScore: { type: Number, default: 0 },
    skillsScore: { type: Number, default: 0 },
    impactScore: { type: Number, default: 0 },
    matchedKeywords: { type: [String], default: [] },
    missingKeywords: { type: [String], default: [] },
    suggestions: { type: [suggestionSchema], default: [] },
    summary: { type: String },
    cacheHash: { type: String, index: true },
  },
  { timestamps: true },
);

analysisSchema.index({ userId: 1, createdAt: -1 });

export const Analysis = mongoose.model("Analysis", analysisSchema);
