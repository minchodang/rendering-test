import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
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

const App: React.FC = () => {
	return (
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<HydrationBoundary state={dehydratedState}>
					<ReactQueryDevtools />
					<RouterProvider router={browserRouter} />
				</HydrationBoundary>
			</QueryClientProvider>
		</React.StrictMode>
	);
};

export default App;
