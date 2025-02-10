import { Link } from "react-router";

const RootPage = () => {
	return (
		<div>
			<h1>루트페이지2</h1>
			<Link to={"/detail"}>상세페이지 이동s</Link>
		</div>
	);
};

export default RootPage;
