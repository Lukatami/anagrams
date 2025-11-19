import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {type: String},
    avatarUrl: {type: String},
    googleId: {type: String, required: true, unique: true}
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);