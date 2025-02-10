import fs from "node:fs/promises";
import path from "node:path";
import fastifyMidi from "@fastify/middie";
import fp from "fastify-plugin";
import { createServer } from "vite";

export default fp(
	async (app) => {
		console.log(app.log.info("여기 찍혀!"), "앱은?");
		await app.register(fastifyMidi);
		const vite = await createServer({
			root: path.resolve("../../apps/web"),
			configFile: path.resolve("../../apps/web/vite.config.ts"),
			server: {
				middlewareMode: true,
			},
			appType: "custom",
		});

		app.use(vite.middlewares);

		const rawTemplate = await fs.readFile(
			path.resolve("../../apps/web/index.html"),
			"utf-8",
		);

		app.get("*", async (req, reply) => {
			const template = await vite.transformIndexHtml(req.url, rawTemplate);
			const ssrModule = await vite.ssrLoadModule("/src/entry-server.tsx");
			const response = await ssrModule.render({
				template,
				req,
				reply,
			});
			reply.status(200);
			reply.header("Content-Type", "text/html");
			return await reply.send(response);
		});
	},
	{
		name: "app.middie",
	},
);
