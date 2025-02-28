import { Suspense } from "react";
import { loadQuery } from "react-relay";
import { Link } from "react-router";
import { Environment, graphql } from "relay-runtime";
import { Articles } from "../components/Articles";
import { relayEnvironment } from "../relay/createRelayEnvironment";

const query = graphql`
	 query RootPageQuery {
   		 ping
	}
`;

const queryRef = loadQuery(relayEnvironment, query, {});
await queryRef.source?.toPromise();
console.log(relayEnvironment.getStore().getSource().toJSON());

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
