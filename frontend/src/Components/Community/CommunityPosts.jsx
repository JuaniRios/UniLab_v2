import { useAuthState } from "../../Context";
import { useEffect, useState } from "react";
import fetchContent from "../HelperFunctions/fetchContent";
import PostContainer from "./PostContainer";
import Loader from "../Loader";

export default function CommunityPosts(props) {
	const state = useAuthState();
	const posts = props.posts;
	const setPosts = props.setPosts;
	const [page, setPage] = useState(1);
	const [loaderState, setLoaderState] = useState("shown");

	useEffect(() => {
		fetchContent("posts", page, state.token).then((data) => {
			let appending = [];
			for (let i = 0; i < data.results.length; i++) {
				appending.push(<PostContainer {...data.results[i]} key={i} />);
			}
			setPosts((prev) => prev.concat(appending));
			setLoaderState("hidden");
		});
	}, [page]);

	if (posts) {
		return (
			<div className={`w40`} style={{ position: "relative", marginBottom: "3rem" }}>
				<Loader color="orange" size="4" state={loaderState} />
				{posts}
			</div>
		);
	} else {
		return <h4>Loading...</h4>;
	}
}
