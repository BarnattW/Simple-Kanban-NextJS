import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db/mongoDB";
import User from "@/lib/model/user";
import { verifyPassword } from "@/lib/auth";

export default NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		jwt: true,
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				const user = await User.findOne({ username: credentials.username });

				if (!user) {
					throw new Error("No user found");
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					throw new Error("Invalid password");
				}

				return { username: user.username, id: user._id };
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
	},
});
