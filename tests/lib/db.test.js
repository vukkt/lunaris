import { query } from "../../src/app/lib/db";

describe("Database Connection", () => {
	it("should return correct result for a simple query", async () => {
		const result = await query("SELECT 1 + 1 AS result");
		expect(result.rows[0].result).toBe(2);
	});
});
