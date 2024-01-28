import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    const dbUrl = process.env.MONGODB_URL;
    await mongoose.connect(dbUrl);
  } catch (error) {
    throw new Error("MongoDB connection failed");
  }
};
