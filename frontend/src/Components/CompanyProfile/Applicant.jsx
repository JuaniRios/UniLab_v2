import React, { useEffect } from "react";

import "./Applicant.css";

import {Link} from "react-router-dom";
import urlToPk from "../HelperFunctions/urlToPk";

export default function Applicant(props) {
	return (
		<div className="applicant shadow">
			<img className="applicant-pfp" src={props.icon} />
			<h3>{props.first_name} {props.last_name}</h3>
			<Link to={`/profile/${urlToPk(props.url)}`} className="uni-button w100">View profile</Link>
			<a className="uni-button w100" href={props.cv} target="_blank">See CV</a>
			<a className="uni-button w100" href={props.motivation_letter} target="_blank">See Motivation Letter</a>
		</div>
	);
}
