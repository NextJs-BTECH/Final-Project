import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import sql from "./app/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
	session: { strategy: "jwt" },

	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials) {
				const email = credentials?.email as string;
				const password = credentials?.password as string;

				if (!email || !password) return null;

				const users = await sql`
					SELECT id, email, password, name
					FROM users
					WHERE email = ${email}
				`;

				const user = users[0];
				if (!user) return null;

				const valid = await bcrypt.compare(password, user.password);
				if (!valid) return null;

				return {
					id: String(user.id),
					email: user.email,
					name: user.name || user.email.split("@")[0], // ✅ fallback fix
				};
			},
		}),
	],

	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name; // ✅ guaranteed now
			}
			return token;
		},

		session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.name = (token.name as string) || null; // safe
			}
			return session;
		},
	},
});
