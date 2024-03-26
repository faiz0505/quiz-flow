import { ErrorHandler } from "../utils";
import emailjs from "@emailjs/browser";
export const sendMail = async (templateId, templateParams) => {
  try {
    const res = await emailjs.send(
      "service_fcv0vr4",
      templateId,
      templateParams,
      "ZpJF5gVnKZyxJy4Qz"
    );

    return res.status;
  } catch (error) {
    console.log(error);
    ErrorHandler(error);
  }
};
