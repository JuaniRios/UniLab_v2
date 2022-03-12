import React, { useEffect } from "react";

import "./Application.css";

import {Link} from "react-router-dom";
import urlToPk from "../HelperFunctions/urlToPk";

export default function Application(props) {
	return (
		<div className="applicant shadow">
			<img className="applicant-pfp" src={props.job.company.image} />
			<h3>Job Title: {props.job.title}</h3>
			<h3>Company: {props.job.company.name}</h3>
			<Link to={`/companies/${urlToPk(props.job.company.url)}`} className="uni-button w100">View Company</Link>
			<Link to={`/jobs/${urlToPk(props.job.url)}`} className="uni-button w100">View Job</Link>
			<a className="uni-button w100" href={props.cv} target="_blank">See CV</a>
			<a className="uni-button w100" href={props.motivation_letter} target="_blank">See Motivation Letter</a>
		</div>
	);
}
