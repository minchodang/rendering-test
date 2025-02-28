import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";
import relay from "vite-plugin-relay-lite";

export default defineConfig({
	plugins: [
		react(),
		relay(),
		cjsInterop({
			dependencies: ["relay-runtime", "react-relay"],
		}),
	],
});
