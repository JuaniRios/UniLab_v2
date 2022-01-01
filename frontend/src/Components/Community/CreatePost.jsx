import React from "react";
// STYLES
import "./CreatePost.css";
// IMAGES
import { NavLink } from "react-router-dom";
import { useAuthState } from "../../Context";

export default function CreatePost(props) {
	const { userData } = useAuthState();
	const setPostFormClasses = props.setPostFormClasses;
	const picStyle = {
		backgroundImage: `url(${userData.image})`,
	};
	return (
		<div className={`create-post flex-row a-i-c w40 shadow`}>
			<NavLink to="/profile" style={picStyle} className={`post-pfp`} />
			<h4 className={`action-btn shadow normal`} onClick={setPostFormClasses}>
				Create a post
			</h4>
		</div>
	);
}
