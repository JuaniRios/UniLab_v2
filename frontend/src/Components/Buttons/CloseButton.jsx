// Renders an X button.
// Props: 
// clickEvent(function),
// position(string) - absolute, relative, etc.,
// borderRadius(string).
import React from "react";
// STYLES
import "./CloseButton.css";

export default function CloseButton(props) {
	var btnStyle = {
		position: props.position,
		borderRadius: props.borderRadius ? props.borderRadius : "0 10px 0 10px",
	};
	return (
		<button
			className={`close-btn`}
			onClick={props.clickEvent}
			style={btnStyle}
			type="button"
		/>
	);
}