import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/db/connection";
import { Quiz } from "@/app/lib/db/model";
import { revalidatePath } from "next/cache";
export async function POST(request) {
  try {
    const data = await request.json();
    //  connect to database
    await dbConnection();
    const newQuiz = new Quiz({
      user: data.user,
      category: data.category,
      difficulty: data.difficulty,
      points: data.points,
      quiz: data.quiz,
    });
    await newQuiz.save();
    revalidatePath("/profile");
    return NextResponse.json("Data inserted successfully");
  } catch (error) {
    return NextResponse.json(error);
  }
}
