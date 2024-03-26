"use server";

import { revalidatePath } from "next/cache";
import { dbConnection } from "../lib/db/connection";
import { Quiz } from "../lib/db/model";
import { ErrorHandler } from "../utils";

export const fetchQuizzessByUser = async (user) => {
  try {
    await dbConnection();
    const posts = await Quiz.find({ user: user });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    ErrorHandler(error);
  }
};
export const fetchALlQuiz = async () => {
  try {
    await dbConnection();
    const posts = await Quiz.find();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    ErrorHandler(error);
  }
};

export const deleteQuiz = async (id) => {
  try {
    await dbConnection();
    const deleteQuiz = await Quiz.deleteOne({ _id: id });
    revalidatePath("/profile");
    return JSON.parse(JSON.stringify(deleteQuiz));
  } catch (error) {
    ErrorHandler(error);
  }
};
