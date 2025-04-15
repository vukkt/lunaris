import prisma from "@/app/lib/prisma";

export async function POST(request) {
	try {
		const { email, password, name } = await request.json();

		// IMPORTANT: In production, hash the password before storing!
		const user = await prisma.user.create({
			data: {
				email,
				password, // Hash this in production!
				name,
			},
		});

		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error) {
		console.error("Error creating user:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
