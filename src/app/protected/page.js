import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";

export default async function ProtectedPage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		// Redirect to the custom sign in page
		redirect("/auth/signin");
	}
	return (
		<div>
			<h1>Protected Page</h1>
			<p>Welcome, {session.user.email}</p>
		</div>
	);
}
