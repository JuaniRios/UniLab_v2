import React from "react";
// STYLES
import "./CollapsibleMenu.css";

export default function CollapsibleMenu(props) {

	return (
		<>
			<div className={`collapsible-menu-btn`}>
				<span>{props.text}</span>
			</div>
			<div className={`collapsible-menu-content`}>{props.skills}</div>
		</>
	);
}
