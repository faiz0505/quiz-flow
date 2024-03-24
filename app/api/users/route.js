import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/db/connection";
import { User } from "@/app/lib/db/model";
export async function GET() {
  try {
    await dbConnection();
    const users = await User.find();
    console.log(users);
    return NextResponse.json({ users: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
