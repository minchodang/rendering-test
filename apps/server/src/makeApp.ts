import fs from "node:fs/promises";
import path from "node:path";
import { fastifyAutoload } from "@fastify/autoload";
import fastify from "fastify";
import { createServer } from "vite";

export async function makeApp() {
	const app = fastify({
		logger: true,
	});
	app.register(fastifyAutoload, {
		dir: path.resolve("./dist/plugins"),
	});

	const vite = await createServer({
		server: {
			middlewareMode: true,
		},
		appType: "custom",
	});

	const rawTemplate = await fs.readFile(
		path.resolve("../../apps/web/index.html"),
		"utf-8",
	);

	app.get("/healthz", async () => {
		return {
			ok: true,
		};
	});
	app.get("*", async (req, reply) => {
		const template = await vite.transformIndexHtml(req.url, rawTemplate);
		const ssrModule = await vite.ssrLoadModule("./src/entry-server.tsx");
		const response = await ssrModule.render({
			template,
			req,
			reply,
		});
		reply.status(200);
		reply.header("Content-Type", "text/html");
		return await reply.send(response);
	});

	return app;
}
