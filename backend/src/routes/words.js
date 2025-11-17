import express from "express";
import Word from "../models/Word.js";

const router = express.Router();

// Get ALL words
router.get("/", async (req, res) => {
  try {
    const words = await Word.find({});
    res.status(200).json(words);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get One word for specific language
router.get("/:lang/:word", async (req, res) => {
  try {
    const { lang, word } = req.params;
    const foundWord = await Word.findOne({ word: word, lang: lang });
    res.status(200).json(foundWord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get ALL words for specific language
router.get("/:lang", async (req, res) => {
  try {
    const { lang } = req.params;
    const foundWord = await Word.find({ lang: lang });
    res.status(200).json(foundWord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Post One word
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
