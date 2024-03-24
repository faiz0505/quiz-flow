"use server";

import { revalidatePath } from "next/cache";
import { dbConnection } from "../lib/db/connection";
import { Quiz, User } from "../lib/db/model";
import { ErrorHandler } from "../utils";

export const getAllUser = async () => {
  try {
    await dbConnection();
    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    ErrorHandler(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await dbConnection();
    const deletedUser = await User.deleteOne({ _id: id });
    const deletedQuizzes = await Quiz.deleteMany({ user: id });
    revalidatePath("/admin-dashboard");
    return {
      deletedUser: JSON.parse(JSON.stringify(deletedUser)),
      deletedQuizzes: JSON.parse(JSON.stringify(deletedQuizzes)),
    };
  } catch (error) {
    ErrorHandler(error);
  }
};

export const fetchUserById = async (id) => {
  try {
    await dbConnection();
    const user = await User.findById(id);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    ErrorHandler(error);
  }
};
