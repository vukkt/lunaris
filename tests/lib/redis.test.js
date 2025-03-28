import redisClient from "../../src/app/lib/redis";

describe("Redis Client", () => {
	afterAll(async () => {
		// Disconnect the Redis client to close open handles.
		await redisClient.disconnect();
	});

	it("should set and get a value", async () => {
		// Set a key with a value.
		await redisClient.set("test-key", "hello");
		// Retrieve the value for the key.
		const value = await redisClient.get("test-key");
		expect(value).toBe("hello");
	});
});
