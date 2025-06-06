import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../backend/models/user";
import { dbConnect } from "../backend/config/authConnect";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Hasło", type: "password" },
			},
			authorize: async (credentials) => {
				try {
					await dbConnect();

					const user = await User.findOne({ email: credentials?.email }).select("+password");

					if (!user) {
						return null;
					}

					const isPasswordCorrect = await bcrypt.compare(
						credentials?.password || "",
						user.password,
					);

					if (!isPasswordCorrect) {
						return null;
					}

					return {
						id: user._id.toString(),
						name: user.name,
						email: user.email,
						role: user.role,
					};
				} catch (error) {
					console.error("Błąd logowania:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.role = token.role;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	secret: "twoj_secret",
};
