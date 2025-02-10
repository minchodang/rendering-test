import type { FastifyRequest } from "fastify";

export default function createFetchRequest(req: FastifyRequest) {
	const origin = `${req.protocol}://${req.hostname}`;
	const url = new URL(req.originalUrl || req.url, origin);

	const controller = new AbortController();
	req.raw.on("close", () => controller.abort());

	const headers = new Headers();

	for (const [key, value] of Object.entries(req.headers)) {
		if (value) {
			if (Array.isArray(value)) {
				for (const v of value) {
					headers.append(key, v);
				}
			} else {
				headers.set(key, value as string);
			}
		}
	}

	const init: RequestInit = {
		method: req.raw.method,
		headers,
		signal: controller.signal,
	};

	if (req.raw.method !== "GET" && req.raw.method !== "HEAD") {
		init.body = req.body as BodyInit;
	}

	return new Request(url.href, init);
}
