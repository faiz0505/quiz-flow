import { dbConnection } from "@/app/lib/db/connection";
import { NextResponse } from "next/server";
import { User } from "@/app/lib/db/model";
import bcrypt from "bcrypt";
import { getOSinfo } from "@/app/actions/OSinfo.action";
import { revalidatePath } from "next/cache";
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
      // get os information
      const osInfo = await getOSinfo();

      // get user location
      const requestLocation = await fetch(
        "https://ipinfo.io/json?token=c07a9b818e7420"
      );
      const location = await requestLocation.json();
      // check if user already exist
      const userExist = await User.exists({ email: userData.email });

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
          osInfo: `${osInfo.ostype}, ${osInfo.osHostname}, ${osInfo.userInfo}`,
          location: `${location.city}, ${location.region}, ${location.country}, tiem zone : ${location.timezone}`,
          createdAt:
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString(),
          lastSingnedIn: "",
          role: "",
        });
        revalidatePath("/", "layout");
        return NextResponse.json({ message: "Success" }, { status: 201 });
      }
    }
  } catch (error) {
    return NextResponse.error(error);
  }
}
