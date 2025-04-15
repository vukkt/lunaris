import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth";

const nextAuthHandler =
	typeof NextAuth === "function" ? NextAuth : NextAuth.default;

const handler = nextAuthHandler(authOptions);

export { handler as GET, handler as POST };
