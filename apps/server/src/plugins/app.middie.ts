import fastifyMidi from "@fastify/middie";
import fp from "fastify-plugin";
import { createServer } from "vite";

export default fp(
	async (app) => {
		await app.register(fastifyMidi);
		const vite = await createServer({
			server: {
				middlewareMode: true,
			},
			appType: "custom",
		});
		app.use(vite.middlewares);
	},
	{
		name: "app.middie",
	},
);
