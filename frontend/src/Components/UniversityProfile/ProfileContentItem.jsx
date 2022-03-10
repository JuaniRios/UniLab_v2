import React from "react";
import "./ProfileContentItem.css";

export default function ProfileContentItem(props) {
	const mainStyle = {
		width: props.width,
	};

	if ("degree" in props) {
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

	if ("company" in props) {
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

}
