import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { listQueryOptions } from "../api/listQueryOptions";

export const Articles = () => {
	const [searchParams] = useSearchParams();
	const delayMs = searchParams.get("delayMs")
		? Number.parseInt(searchParams.get("delayMs") as string)
		: undefined;

	const list = useSuspenseQuery(listQueryOptions(delayMs));
	return list.data.map((item) => (
		<article key={item.id}>
			<h1>{item.title}</h1>
			<p>{item.body}</p>
		</article>
	));
};
