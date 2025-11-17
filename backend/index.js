import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import usersRouter from "./src/routes/users.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/users", usersRouter);

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
