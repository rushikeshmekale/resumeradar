import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  createAnalysis,
  listAnalyses,
  getAnalysis,
  deleteAnalysis,
} from "../controllers/analyses.controller.js";

const router = Router();

router.use(requireAuth);
router.post("/", createAnalysis);
router.get("/", listAnalyses);
router.get("/:id", getAnalysis);
router.delete("/:id", deleteAnalysis);

export default router;
