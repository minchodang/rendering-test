import type { FastifyReply, FastifyRequest } from "fastify";
import ReactDOMServer from "react-dom/server";
import {
	type StaticHandlerContext,
	StaticRouterProvider,
	createStaticHandler,
	createStaticRouter,
} from "react-router";
import createFetchRequest from "../../server/src/request";
import router from "./router";

interface RenderingProps {
	template: string;
	req: FastifyRequest<{
		Querystring: {
			delayMs?: string;
		};
	}>;
	reply: FastifyReply;
}

const handler = createStaticHandler(router.routes);

export async function render({ template, req }: RenderingProps) {
	const fetchRequest = createFetchRequest(req);
	const context = (await handler.query(fetchRequest)) as StaticHandlerContext;
	const router = createStaticRouter(handler.dataRoutes, context);

	const html = ReactDOMServer.renderToString(
		<StaticRouterProvider router={router} context={context} />,
	);
	// index.html 파일의 자리표시자 '{{SSR_CONTENT}}'를 SSR 결과로 대체합니다.
	template = template.replace("{{SSR_CONTENT}}", html);

	return template;
}
