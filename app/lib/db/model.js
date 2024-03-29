import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  category: String,
  difficulty: String,
  points: Number,
  quiz: Object,
});

export const Quiz =
  mongoose.models.quizzes || mongoose.model("quizzes", quizSchema);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  osInfo: String,
  location: String,
  lastSignedIn: String,
  createdAt: String,
});

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
