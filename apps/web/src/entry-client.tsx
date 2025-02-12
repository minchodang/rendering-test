import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import router from "./router";

const browserRouter = createBrowserRouter(router);

const dehydratedState = window.__REACT_QUERY_STATE__;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

// 서버에서 SSR한 후 하이드레이션을 진행합니다.
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById("root")!;

ReactDOM.hydrateRoot(
	rootElement,
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydratedState}>
				<RouterProvider router={browserRouter} />
			</HydrationBoundary>
		</QueryClientProvider>
	</React.StrictMode>,
);
