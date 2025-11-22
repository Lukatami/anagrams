import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50,
      validate: {
        validator: (name) => {
          return name.trim().length > 0;
        },
        message: "Name cannot be empty",
      },
    },
    avatarUrl: { type: String },
    googleId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

UserSchema.index({ googleId: 1 }, { unique: true });

export default mongoose.model("User", UserSchema);
