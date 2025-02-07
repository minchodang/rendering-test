import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import FastifyMiddie from "@fastify/middie";
import Fastify from "fastify";
import { createServer as createViteServer } from "vite";
import { message } from "./message";

const HOST = "0.0.0.0";
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 9999;

const fastify = Fastify({
	ignoreTrailingSlash: true,
});

await fastify.register(FastifyMiddie);

const vite = await createViteServer({
	server: {
		middlewareMode: true,
	},
	appType: "custom",
});

fastify.use(vite.middlewares);

const rawTemplate = await fs.readFile(
	path.resolve("../web/index.html"),
	"utf-8",
);

console.log(message, "ssss");
// fastify.get("*", async (req, reply) => {
// 	const template = await vite.transformIndexHtml(req.url, rawTemplate);
// 	const
// });

// fastify.listen(
// 	{
// 		host: HOST,
// 		port: PORT,
// 	},
// 	(error) => {
// 		if (error) {
// 			console.log(error);
// 		} else {
// 			console.log(`⚡️ SSR Server is running on http://localhost:${PORT}`);
// 		}
// 	},
// );
