import type { FastifyReply, FastifyRequest } from "fastify";
// apps/server/src/entry-server.tsx
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../../web/src/App";

interface RenderingProps {
	template: string;
	req: FastifyRequest<{
		Querystring: {
			delayMs?: string;
		};
	}>;
	reply: FastifyReply;
}

export async function render({ template, req }: RenderingProps) {
	// React App을 HTML 문자열로 렌더링합니다.
	const appHtml = renderToString(<App />);

	// index.html 파일의 자리표시자 '{{SSR_CONTENT}}'를 SSR 결과로 대체합니다.
	const html = template.replace("{{SSR_CONTENT}}", appHtml);

	return html;
}
