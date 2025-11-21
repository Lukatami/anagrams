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

router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await GameSession.aggregate([
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$totalScore" },
          totalGames: { $sum: 1 },
          averageScore: { $avg: "$totalScore" },
          bestScore: { $max: "$totalScore" },
          lastPlayed: { $max: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          _id: 1,
          userName: "$userInfo.name",
          userAvatar: "$userInfo.avatarUrl",
          totalScore: 1,
          totalGames: 1,
          averageScore: { $round: ["$averageScore", 2] },
          bestScore: 1,
          lastPlayed: 1,
        },
      },
      {
        $sort: {
          totalScore: -1,
        },
      },
    ]);

    res.json({
      
      leaderboard,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;
