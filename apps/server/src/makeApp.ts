import fs from "node:fs/promises";
import path from "node:path";
import { fastifyAutoload } from "@fastify/autoload";
import FastifyMidi from "@fastify/middie";
import fastify from "fastify";
import { createServer } from "vite";

export async function makeApp() {
	const app = fastify({
		logger: true,
	});

	await app.register(fastifyAutoload, {
		dir: path.resolve("./dist/plugins"),
	});

	app.get("/healthz", async () => {
		return {
			ok: true,
		};
	});

	return app;
}
