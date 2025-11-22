import mongoose from "mongoose";
const { Schema } = mongoose;

const WordSchema = new Schema(
  {
    word: { type: String, required: true, trim: true, lowercase: true },
    lang: {
      type: String,
      required: true,
      enum: ["en", "ru", "es"],
    },
    reqCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

WordSchema.index({ word: 1, lang: 1 }, { unique: true, background: true });
WordSchema.index({ lang: 1 }, { background: true });
WordSchema.index({ lang: 1, reqCount: -1 }, { background: true });

export default mongoose.model("Word", WordSchema);
