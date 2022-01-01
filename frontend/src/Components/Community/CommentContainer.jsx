import React from "react";
import { NavLink } from "react-router-dom";
// STYLES
import "./CommentContainer.css";
// OTHER
import timeSince from "../HelperFunctions/timeSince";

export default function CommentContainer(props) {
	let owner;
	if (props.company) {
		owner = props.company;
	} else {
		owner = props.owner;
		owner["name"] = owner.first_name + " " + owner.last_name;
	}
	return (
		<div className={`comment-container w90`}>
			<img
				className={`comment-container-img`}
				src={owner.image}
				alt={`Your profile picture`}
				title={`Post Owner`}
			/>
			<div className={`comment-content`}>
				<NavLink
					to={"/profile?url=" + props.url}
					className={"comment-owner black-link bold"}
				>
					{owner.name}
				</NavLink>
				<span className="comment-date">{timeSince(props.publish_date)}</span>
				<div className={`comment-body`}>{props.content}</div>
			</div>
		</div>
	);
}
