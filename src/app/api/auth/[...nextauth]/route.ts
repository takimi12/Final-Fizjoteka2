import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import bcrypt from "bcryptjs";
import User from "../../../../../backend/models/user";
import { dbConnect } from "../../../../../backend/config/dbConnect";

interface Credentials {
  email: string;
  password: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com", 
        },
        password: {
          label: "Password",
          type: "password", 
        },
      },
      async authorize(credentials: Record<string, string> | undefined, req) {
        await dbConnect();

        if (!credentials) {
          throw new Error("Credentials are required");
        }

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email }).select("password");

        if (!user) {
          console.log("No user found");
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: any; user?: NextAuthUser }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: any }) => {
      if (token.user) {
        session.user = token.user;
      }
      // delete session.user?.password;
      return session;
    },
  },
  pages: {
    error: "/auth/error",
  },
  secret: "twoj_secret",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
