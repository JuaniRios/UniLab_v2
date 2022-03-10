import React, { useEffect } from "react";

import "./Applicant.css";

import profileIcon from "../Assets/img/profile.png";

export default function Applicant(props) {
	return (
		<div className="applicant shadow">
			<img className="applicant-pfp" src={props.icon || profileIcon} />
			<h3>{props.name}</h3>
			<button className="uni-button w100">View profile</button>
			<button className="uni-button w100">Download all files</button>
		</div>
	);
}
