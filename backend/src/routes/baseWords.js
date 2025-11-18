import express from "express";
import BaseWord from "../models/BaseWord.js";

const router = express.Router();

// Get ALL baseWords
router.get("/", async (req, res) => {
  try {
    const baseWords = await BaseWord.find({});
    res.status(200).json(baseWords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get random baseWord for selected lang
router.get("/random/:lang", async (req, res) => {
  try {
    const { lang } = req.params;

    const randomWord = await BaseWord.aggregate([
      { $match: { lang } },
      { $sample: { size: 1 } },
    ]);

    res.status(200).json(randomWord[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
