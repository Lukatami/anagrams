import express from "express";
import Word from "../models/Word.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const words = await Word.find({});
    res.status(200).json(words);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:word", async (req, res) => {
  try {
    const param = req.params;
    const word = await Word.findOne({ word: param });
    res.status(200).json(word);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { word, lang } = req.body;

    const newWord = new Word({
      word,
      lang,
    });

    const savedWord = await newWord.save();

    res.status(201).json(savedWord);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Invalid data or not unique word", error: err.message });
  }
});

export default router;
