import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/db/connection";
import { Quiz } from "@/app/lib/db/model";
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
    return NextResponse.json("Data inserted successfully");
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET() {
  try {
    await dbConnection();
    const data = await Quiz.find();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error(error);
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    await dbConnection();
    await Quiz.deleteOne({ _id: body });
    return NextResponse.json("deleted");
  } catch (error) {
    return NextResponse.error(error);
  }
}
