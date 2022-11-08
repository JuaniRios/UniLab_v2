import React from "react";
// STYLES
import "./HomeBlock.css";
import {Link} from "react-router-dom";

export default function HomeBlock(props) {
	const headerValue = props.headerValue;
	const btnValue = props.btnValue;
	let href;
	if (btnValue === "More Companies") {
		href = "/companies"
	} else if (btnValue === "Create Account") {
		href = "/sign-up"
	} else {
		href = "/"
	}

	return (
		<div className={`home-block shadow`}>
			<h1 className={`home-block-header`}>{headerValue}</h1>
			{props.children}
			<Link to={href} className={`home-block-btn uni-button`}>
				{btnValue}
			</Link>
		</div>
	);
}
