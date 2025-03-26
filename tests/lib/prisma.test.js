/**
 * @jest-environment node
 */

import prisma from "../../src/app/lib/prisma";

describe("Prisma Client", () => {
	afterAll(async () => {
		await prisma.$disconnect();
	});

	it("should connect to the database and execute a simple query", async () => {
		const result = await prisma.$queryRaw`SELECT 1 as result;`;
		expect(result[0].result).toBe(1);
	});
});
