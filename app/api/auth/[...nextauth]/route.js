import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnection } from "@/app/lib/db/connection";
import { User } from "@/app/lib/db/model";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
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

          const comparePassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (comparePassword) {
            const updatedUser = await User.updateOne(
              { email: credentials.email },
              {
                lastSignedIn:
                  new Date().toLocaleDateString() +
                  " " +
                  new Date().toLocaleTimeString(),
              }
            );
            revalidatePath("/", "layout");
            return {
              name: user.name,
              email: user.email,
              role: "",
              id: user._id,
            };
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
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
          if (user.email === process.env.MY_EMAIL) {
            token.role = "admin";
          } else {
            token.role = "user";
          }
        }
        return token;
      } catch (error) {
        throw new Error(`An error occurred : ${error}`);
      }
    },
    async session({ session, token }) {
      try {
        if (session?.user) {
          session.user.id = token.id;
          session.user.role = token.role;
        }
        return session;
      } catch (error) {
        throw new Error(`An error occurred : ${error}`);
      }
    },
  },
};
const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
