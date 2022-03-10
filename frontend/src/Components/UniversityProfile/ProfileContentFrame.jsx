import React from "react";
// STYLES
import "./ProfileContentFrame.css";
// OTHER
import PlusButton from "../Buttons/PlusButton";

export default function ProfileContentFrame(props) {
	let contentStyle = {
		width: props.width,
		padding: props.margin ? "1rem 2rem" : "0",
	};
	let plusBtn;
	if (props.plusBtn) {
		plusBtn = <PlusButton clickEvent={props.onClick} />;
	}
	let title;
	if (props.title) {
		title = (
			<h1 className={`normal`} style={{ margin: "0" }}>
				{props.title}
			</h1>
		);
	}
	let wrapper;
	if (props.title || props.plusBtn) {
		wrapper = (
			<div className={`profile-content-upper`}>
				{title}
				{plusBtn}
			</div>
		);
	}
	return (
		<div
			id={props.id}
			className={`profile-content shadow ${props.className}`}
			style={contentStyle}
		>
			{wrapper}
			{props.children}
		</div>
	);
}
