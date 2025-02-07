import "dotenv/config";
import Fastify from "fastify";

const fastify = Fastify({ logger: true });

/**
 * 서버 시작
 */

const PORT = Number(process.env.SERVER_PORT ?? "5000");
const start = async () => {
	try {
		await fastify.listen({ port: PORT });
		fastify.log.info("서버 실행 중 → http://localhost:3000");
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
