// Renders an + button.
// Props: clickEvent(function) and position(string) - absolute, relative, etc.
import React from "react";
// STYLES
import "./PlusButton.css";

export default function PlusButton(props) {
	const clickEvent = props.clickEvent;
	const position = props.position;
	var btnStyle = {
		position: position,
	};
	return (
		<button className={`plus-btn`} onClick={clickEvent} style={btnStyle} type="button"></button>
	);
}
