import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    name: String,
    password: String
  },
  {
    timestamps: true
  }
);
export default mongoose.model("User", userSchema);
