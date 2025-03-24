import dotenv from "dotenv";
dotenv.config();

import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import "@testing-library/jest-dom";
