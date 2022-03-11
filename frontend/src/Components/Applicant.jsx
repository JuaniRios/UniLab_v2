import React, { useEffect } from "react";

import "./Applicant.css";

import profileIcon from "../Assets/img/profile.png";
import {Link} from "react-router-dom";
import urlToPk from "./HelperFunctions/urlToPk";

export default function Applicant(props) {
	return (
		<div className="applicant shadow">
			<img className="applicant-pfp" src={props.icon || profileIcon} />
			<h3>{props.first_name} {props.last_name}</h3>
			<Link to={`/profile/${urlToPk(props.url)}`} className="uni-button w100">View profile</Link>
			<button className="uni-button w100">Download all files</button>
		</div>
	);
}
