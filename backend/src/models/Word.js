import mongoose from "mongoose";
const { Schema } = mongoose;

const wordSchema = new Schema(
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

wordSchema.pre("save", async function (next) {
  if (this.isNew) {
    const existingWord = await mongoose.model("Word").findOne({
      word: this.word,
      lang: this.lang,
    });
    if (existingWord) {
      const error = new Error(
        `Word: "${this.word}" for "${this.lang}" language already exists in DB`
      );
      error.existingWord = existingWord;
      return next(error);
    }
  }
  next();
});

export default mongoose.model("Word", wordSchema);
