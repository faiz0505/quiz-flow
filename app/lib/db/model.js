import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  user: String,
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
});

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
