import mongoose from "mongoose";
const { Schema } = mongoose;

const FoundWordSchema = new Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const GameSessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    baseWord: {
      type: Schema.Types.ObjectId,
      ref: "BaseWord",
      required: true,
    },
    foundWords: [FoundWordSchema],
    totalScore: {
      type: Number,
      default: 0,
      min: 0,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    language: {
      type: String,
      enum: ["en", "ru", "es"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GameSession", GameSessionSchema);
