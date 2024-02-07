import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/db/connection";
import { User } from "@/app/lib/db/model";
export async function PATCH(req) {
  const body = await req.json();
  try {
    const { email, password } = body;
    await dbConnection();

    await User.updateOne(
      { email: email },
      {
        $set: {
          password: password,
        },
      }
    );
    return NextResponse.json(
      { message: "your password updated" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
