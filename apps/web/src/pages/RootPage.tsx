import { Suspense } from "react";
import { Link } from "react-router";
import { Articles } from "../components/Articles";

const RootPage = () => {
	return (
		<div>
			<h1>루트페이지2</h1>
			<Link to={"/detail"}>상세페이지 이동s</Link>
			<Suspense
				fallback={
					<div
						style={{
							width: "100%",
							height: "100vh",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						loading...
					</div>
				}
			>
				<Articles />
			</Suspense>
		</div>
	);
};

export default RootPage;
