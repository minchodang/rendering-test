import { createBrowserRouter, createMemoryRouter } from "react-router";
import DetailPage from "./pages/DetailPage";
import RootPage from "./pages/RootPage";

const router = [
	{
		children: [
			{ index: true, element: <RootPage /> },
			{ path: "/detail", element: <DetailPage /> },
		],
	},
];

export default router;
