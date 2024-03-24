"use server";

import { revalidatePath } from "next/cache";
import { dbConnection } from "../lib/db/connection";
import { User } from "../lib/db/model";

export const getAllUser = async () => {
  try {
    await dbConnection();
    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    throw new Error(`Could not get all users : ${error}`);
  }
};

export const deleteUser = async (id) => {
  try {
    await dbConnection();
    const deletedUser = await User.deleteOne({ _id: id });
    revalidatePath("/admin-dashboard");
    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    throw new Error(`Could'nt delete the user : ${error}`);
  }
};
