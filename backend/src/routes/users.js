import express from "express";
import User from "../models/User.js";
import { authRequired } from "../middleware/authRequired.js";

const router = express.Router();

router.get("/me", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      id: user._id,
      name: user.name,
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
