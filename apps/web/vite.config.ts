import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import relay from "vite-plugin-relay-lite";

export default defineConfig({
	plugins: [react(), relay()],
});
