import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import usersRouter from "./src/routes/users.js";
import wordsRouter from "./src/routes/words.js";
import baseWordsRouter from "./src/routes/baseWords.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/users", usersRouter);
app.use("/api/words", wordsRouter);
app.use("/api/basewords", baseWordsRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, async () => {
      console.log(`Listening on port: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
