import React from "react";
import "./ProfileContentItem.css";
import {Link} from "react-router-dom";

export default function ProfileContentItem(props) {
	const mainStyle = {
		width: props.width,
	};

	if (props.type === "education") {
		return (
			<div className={`profile-content-item`} style={mainStyle}>
				<img
					className={`profile-content-item-img shadow`}
					src={props.image}
					alt="Institution icon"
				/>
				<div className={`profile-content-item-text`}>
					<h3 className={`profile-content-item-subtext`}>{props.institution}</h3>
					<h4 className={`profile-content-item-subtext normal`}>{props.degree}</h4>
					<p className={`profile-content-item-subtext`} style={{ fontStyle: "italic" }}>
						<span>{new Date(props.start_date).toLocaleDateString("en-GB")}</span>
						<span> - </span>
						<span>{new Date(props.end_date).toLocaleDateString("en-GB")}</span>
					</p>
					<p className={`profile-content-item-subtext`}>{props.description}</p>
				</div>
			</div>
		);
	}

	if (props.type === "experience") {
		return (
			<div className={`profile-content-item`} style={mainStyle}>
				<img
					className={`profile-content-item-img shadow`}
					src={props.image}
					alt="Institution icon"
				/>
				<div className={`profile-content-item-text`}>
					<h3 className={`profile-content-item-subtext`}>{props.company}</h3>
					<h4 className={`profile-content-item-subtext normal`}>{props.title}</h4>
					<p className={`profile-content-item-subtext`} style={{ fontStyle: "italic" }}>
						<span>{new Date(props.start_date).toLocaleDateString("en-GB")}</span>
						<span> - </span>
						<span>{new Date(props.end_date).toLocaleDateString("en-GB")}</span>
					</p>
					<p className={`profile-content-item-subtext`}>{props.description}</p>
				</div>
			</div>
		)
	}

	if (props.type === "external profile") {
		return (
			<div className={`profile-content-item`} style={mainStyle}>
				<div className={`profile-content-item-text`}>
					<a href={"//" + props.url} className={`profile-content-item-subtext normal`}>
						<h3 className={`profile-content-item-subtext`}>{props.title}</h3>
					</a>
				</div>
			</div>
		)
	}

	return (
		<div className={`profile-content-item`} style={mainStyle}>
			<div className={`profile-content-item-text`}>
				<h3 className={`profile-content-item-subtext`}>{props.title}</h3>
				<h4 className={`profile-content-item-subtext normal`}>{props.subTitle}</h4>
			</div>
		</div>
	)

}
