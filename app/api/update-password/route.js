import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/db/connection";
import { User } from "@/app/lib/db/model";
import bcrypt from "bcrypt";

export async function PATCH(req) {
  const body = await req.json();
  try {
    const { email, password } = body;
    await dbConnection();
    const encryptedPassword = await bcrypt.hash(password, 5);
    await User.updateOne(
      { email: email },
      {
        $set: {
          password: encryptedPassword,
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
