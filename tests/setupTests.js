import dotenv from "dotenv";
dotenv.config();

import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (typeof setImmediate === "undefined") {
	global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}

import "@testing-library/jest-dom";
