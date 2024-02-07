import { createTransport } from "nodemailer";
export const transporter = createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});
