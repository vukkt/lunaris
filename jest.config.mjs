export default {
	transform: {
		"^.+\\.js$": "babel-jest",
	},
	testEnvironment: "jest-environment-jsdom",
	setupFilesAfterEnv: ["./tests/setupTests.js"],
};
