import fastifyCors from "@fastify/cors";
import fp from "fastify-plugin";
import s from '../../../web/src/__relay__'
export default fp(
	async (app) => {
		await app.register(fastifyCors, {
			preflightContinue: true,
		});
	},
	{
		name: "app.cors",
	},
);
