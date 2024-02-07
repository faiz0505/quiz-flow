import { dbConnection } from "@/app/lib/db/connection";
import { NextResponse } from "next/server";
import { User } from "@/app/lib/db/model";
import bcrypt from "bcrypt";
export async function POST(request) {
  try {
    const userData = await request.json();
    const { email } = userData;
    const apiKey = process.env.ABSTRACT_API_KEY;
    const res = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`,
      {
        method: "GET",
      }
    );
    const result = await res.json();
    if (result.deliverability === "UNDELIVERABLE") {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 500 }
      );
    } else {
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
        const encryptedPassword = await bcrypt.hash(userData.password, 5);
        await User.create({
          name: userData.name,
          email: userData.email,
          password: encryptedPassword,
        });
        return NextResponse.json({ message: "Success" }, { status: 201 });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
