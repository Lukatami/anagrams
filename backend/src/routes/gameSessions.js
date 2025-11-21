import express from "express";
import GameSession from "../models/GameSession.js";
import { authRequired } from "../middleware/authRequired.js";

const router = express.Router();

// POST route to save gameSession, required auth
router.post("/save", authRequired, async (req, res) => {
  try {
    const game = await GameSession.create({
      userId: req.userId,
      baseWord: req.body.baseWord,
      foundWords: req.body.foundWords,
      totalScore: req.body.totalScore,
      difficulty: req.body.difficulty,
      language: req.body.language,
    });
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to get sessions data, required auth
router.get("/history", authRequired, async (req, res) => {
  const sessions = await GameSession.find({ userId: req.userId }).sort({
    createdAt: -1,
  });
  res.json(sessions);
});

export default router;
