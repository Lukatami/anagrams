import express from "express";
import Word from "../models/Word.js";
import { wordChecker } from "../utils/wordChecker.js";

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

// Core check logic route
router.get("/check/:word", async (req, res) => {
  try {
    const { word } = req.params;
    const { lang } = req.query;

    // Lang query param required
    if (!lang) {
      return res.status(400).json({
        message: "Language parameter is required. Use: ?lang=LANG_CODE",
      });
    }

    // Convert word to lowerCase and delete spaces
    const wordLower = word.toLowerCase().trim();

    // 1st check: DB, increment reqCount, updated doc
    const wordInDB = await Word.findOneAndUpdate(
      { word: wordLower, lang: lang },
      { $inc: { reqCount: 1 } },
      { new: true }
    );

    // If word exists in DB return true, source and current reqCount
    if (wordInDB) {
      return res.status(200).json({
        exists: true,
        source: "database",
        reqCount: wordInDB.reqCount,
      });
    }

    // 2nd check: API
    const wordInAPI = await wordChecker(wordLower, lang);

    // If word exists in API create new document in DB
    if (wordInAPI) {
      const newWord = await Word.create({
        word: wordLower,
        lang: lang,
        reqCount: 1,
      });
      return res.status(200).json({
        exists: true,
        source: "api",
        reqCount: newWord.reqCount,
      });
    }

    // In all other cases return false
    return res.status(200).json({
      exists: false,
      reqCount: 0,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
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
