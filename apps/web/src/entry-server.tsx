import {
	QueryClient,
	QueryClientProvider,
	dehydrate,
} from "@tanstack/react-query";
import type { FastifyReply, FastifyRequest } from "fastify";
import ReactDOMServer from "react-dom/server";
import {
	type StaticHandlerContext,
	StaticRouterProvider,
	createStaticHandler,
	createStaticRouter,
} from "react-router";
import createFetchRequest from "../../server/src/request";
import { listQueryOptions } from "./api/listQueryOptions";
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

const handler = createStaticHandler(router);

export async function render({ template, req }: RenderingProps) {
	const queryClient = new QueryClient();

	const fetchRequest = createFetchRequest(req);
	const context = (await handler.query(fetchRequest)) as StaticHandlerContext;
	const router = createStaticRouter(handler.dataRoutes, context);
	const delayMs = req.query.delayMs
		? Number.parseInt(req.query.delayMs as string)
		: undefined;

	const url = req.url.split("?")[0];
	console.log(url, "url 체크!");
	if (url === "/") {
		console.log("prefetch");
		await queryClient.prefetchQuery(listQueryOptions(delayMs));
	}
	const dehydratedState = dehydrate(queryClient);

	const html = ReactDOMServer.renderToString(
		<QueryClientProvider client={queryClient}>
			<StaticRouterProvider router={router} context={context} />,
		</QueryClientProvider>,
	);
	// index.html 파일의 자리표시자 '{{SSR_CONTENT}}'를 SSR 결과로 대체합니다.
	template = template
		.replace("{{SSR_CONTENT}}", html)
		.replace("{{INITIAL_STATE}}", JSON.stringify(dehydratedState));

	return template;
}
