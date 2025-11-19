import express from "express";
import GameSession from "../models/GameSession.js";
import { authRequired } from "../middleware/authRequired.js";

const router = express.Router();

// POST route to save gameSession, required auth
router.post("/save", authRequired, async (req, res) => {
  const game = await GameSession.create({ userId: req.userId, ...req.body });
  res.json(game);
});

// GET route to get sessions data, required auth
router.get("/history", authRequired, async (req, res) => {
  const sessions = await GameSession.find({ userId: req.userId }).sort({
    createdAt: -1,
  });
  res.json(sessions);
});

export default router;
