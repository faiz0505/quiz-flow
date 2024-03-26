import { ErrorHandler } from "@/app/utils";
import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    const dbUrl = process.env.MONGODB_URL;
    await mongoose.connect(dbUrl);
  } catch (error) {
    ErrorHandler(error);
  }
};
