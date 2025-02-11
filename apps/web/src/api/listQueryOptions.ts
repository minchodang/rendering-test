import { queryOptions } from "@tanstack/react-query";
import { delay } from "../utils/delay";
import { fetchRequest } from "./fetchRequest";

type ListResponse = {
	userId: number;
	id: number;
	title: string;
	body: string;
}[];

const getPosts = async (delayMs?: number) => {
	if (delayMs) {
		await delay(delayMs);
	}
	const response: ListResponse = await fetchRequest.get("posts").json();

	return response;
};

export const listQueryOptions = (delay?: number) =>
	queryOptions({
		queryKey: ["list"],
		queryFn: () => getPosts(delay),
	});
