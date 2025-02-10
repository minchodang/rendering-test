import "dotenv-safe/config.js";
import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";
import { makeApp } from "./makeApp";

const HOST = process.env.HOST ?? "0.0.0.0";
const PORT = Number(process.env.PORT ?? "9000");

const app = await makeApp();

await app.listen({
	host: HOST,
	port: PORT,
});

app.log.info({}, `Server listening at http://localhost:${PORT}`);
