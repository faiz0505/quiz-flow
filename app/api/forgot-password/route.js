import { NextResponse } from "next/server";
import { transporter } from "@/app/lib/nodemailer/transporter";
import { dbConnection } from "@/app/lib/db/connection";
import { User } from "@/app/lib/db/model";
// import Verifier from "email-verifier";
export async function POST(request) {
  const email = await request.json();

  const otp = Math.floor(Math.random() * 9000) + 1000;

  const mailOptions = {
    service: "gmail",
    to: process.env.MY_EMAIL,
    from: email,
    subject: "Password recovery",
    html: `<html><body> <div class="container">
    <h2>Password Recovery</h2>
    <p>Dear User,</p>
    <p>We received a request for password recovery. Please use the following verification code:</p>
    <h3>${otp}</h3>
    <p>If you didn't request this, you can safely ignore this email.</p>
    <p>Thank you!</p>
  </div></body></html>`,
  };

  try {
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
        { error: "Invalid Email Address!" },
        { status: 500 }
      );
    } else {
      await dbConnection();
      const isUserExist = await User.exists({ email: email });
      if (!isUserExist) {
        return NextResponse.json(
          { error: "User not found! please register" },
          { status: 500 }
        );
      } else {
        const sendMail = await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: otp }, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
