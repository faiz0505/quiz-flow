import { dbConnection } from "@/app/lib/db/connection";
import { NextResponse } from "next/server";
import { User } from "@/app/lib/db/model";
export async function POST(request) {
  try {
    const userData = await request.json();
    await dbConnection();

    // check if user already exist
    const userExist = await User.exists({ email: userData.email });
    console.log(userExist);
    if (userExist) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 409 }
      );
    } else {
      await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      return NextResponse.json(userData);
    }
  } catch (error) {
    return NextResponse.error(error);
  }
}
