import mongoose from "mongoose";
const { Schema } = mongoose;

const BaseWordSchema = new Schema(
  {
    baseWord: { type: String, required: true, trim: true, lowercase: true },
    lang: {
      type: String,
      required: true,
      enum: ["en", "ru", "es"],
    },
    reqCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

BaseWordSchema.index({ lang: 1 });

export default mongoose.model("BaseWord", BaseWordSchema);
