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

BaseWordSchema.pre("save", async function (next) {
  if (this.isNew) {
    const existingBaseWord = await mongoose.model("BaseWord").findOne({
      baseWord: this.baseWord,
      lang: this.lang,
    });
    if (existingBaseWord) {
      const error = new Error(
        `Word: "${this.baseWord}" for "${this.lang}" language already exists in DB`
      );
      error.existingBaseWord = existingBaseWord;
      return next(error);
    }
  }
  next();
});

export default mongoose.model("BaseWord", BaseWordSchema);
