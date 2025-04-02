import redisClient from "../../src/app/lib/redis";

describe("Redis Client", () => {
	afterAll(async () => {
		await redisClient.disconnect();
	});

	it("should set and get a value", async () => {
		await redisClient.set("test-key", "hello");
		const value = await redisClient.get("test-key");
		expect(value).toBe("hello");
	});
});
