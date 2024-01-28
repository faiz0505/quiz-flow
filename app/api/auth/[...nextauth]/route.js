import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnection } from "@/app/lib/db/connection";
import { User } from "@/app/lib/db/model";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credential",
      credentials: {},
      async authorize(credentials) {
        //    check user exist ot not
        await dbConnection();
        const user = await User.findOne({ email: credentials.email });
        if (user) {
          // then check password
          const isPasswordMatch = user.password === credentials.password;
          if (isPasswordMatch) {
            return user;
          } else {
            return Promise.reject(new Error("Invalid password"));
          }
        } else {
          return Promise.reject(
            new Error("user not found! please register yourself")
          );
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};
const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };