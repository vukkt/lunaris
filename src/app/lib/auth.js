import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prisma";

export const authOptions = {
	providers: [],
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.id = user.id;
			return token;
		},
		async session({ session, token }) {
			if (token) session.user.id = token.id;
			return session;
		},
	},
};
