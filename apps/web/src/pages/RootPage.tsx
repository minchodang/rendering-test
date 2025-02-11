import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router";
import { listQueryOptions } from "../api/listQueryOptions";

const RootPage = () => {
	const [searchParams] = useSearchParams();
	const delayMs = searchParams.get("delayMs")
		? Number.parseInt(searchParams.get("delayMs") as string)
		: undefined;

	const list = useQuery(listQueryOptions(delayMs));
	return (
		<div>
			<h1>루트페이지2</h1>
			<Link to={"/detail"}>상세페이지 이동s</Link>
			{list.data?.map((item) => (
				<article key={item.id}>
					<h1>{item.title}</h1>
					<p>{item.body}</p>
				</article>
			))}
		</div>
	);
};

export default RootPage;
