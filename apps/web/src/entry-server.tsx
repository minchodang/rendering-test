import { PassThrough, Readable } from "node:stream";
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

async function* streamHTML(
	head: string,
	body: Readable,
	footer: string,
	queryClient: QueryClient,
) {
	let initialFooter = footer;
	yield head;
	console.log("[Streaming SSR] head rendered");
	let i = 0;
	for await (const chunk of body) {
		yield chunk;
		i++;
		console.log(`[Streaming SSR] chunk ${i} rendered`);
	}
	const dehydratedState = dehydrate(queryClient);

	initialFooter = footer.replace(
		"{{INITIAL_STATE}}",
		JSON.stringify(dehydratedState),
	);
	yield initialFooter;
	console.log("[Streaming SSR] footer rendered");
}

function elementToReadable(element: React.ReactElement): Promise<Readable> {
	const duplex = new PassThrough();

	return new Promise((resolve, reject) => {
		const { pipe, abort } = ReactDOMServer.renderToPipeableStream(element, {
			onShellReady() {
				console.log("[Streaming SSR] onShellReady");
				resolve(pipe(duplex));
			},
			onShellError(error: unknown) {
				abort();
				reject(error);
			},
			onError: (error: unknown) => {
				duplex.emit("error", error);
			},
		});
	});
}

export async function render({ template, req }: RenderingProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});

	const fetchRequest = createFetchRequest(req);
	const context = (await handler.query(fetchRequest)) as StaticHandlerContext;
	const router = createStaticRouter(handler.dataRoutes, context);
	const delayMs = req.query.delayMs
		? Number.parseInt(req.query.delayMs as string)
		: undefined;

	const url = req.url.split("?")[0];
	if (url === "/") {
		console.log("prefetch");
		await queryClient.prefetchQuery(listQueryOptions(delayMs));
	}

	const vnode = (
		<QueryClientProvider client={queryClient}>
			<StaticRouterProvider router={router} context={context} />,
		</QueryClientProvider>
	);
	const [head, footer] = template.split("{{SSR_CONTENT}}");

	try {
		const ssrStream = Readable.from(
			streamHTML(head, await elementToReadable(vnode), footer, queryClient),
		);

		ssrStream.on("data", (chunk) => {
			console.log("Received:", chunk.toString());
		});
		ssrStream.on("error", (error) => {
			console.log("error!", error.message);
		});
		ssrStream.on("close", () => {
			queryClient.clear();
			console.log("queryClient clear!");
		});

		return ssrStream;
	} catch (e) {
		console.log("error", e);
	}
}
