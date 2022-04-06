import React from "react";
// STYLES
import "./SortingMenu.css";

export default function SortingMenu(props) {
	return (
		<div className={`sorting-menu flex-row a-i-c shadow`}>
			<div className={`sorting-item noselect shadow`}>New</div>
			<div className={`sorting-item noselect shadow`}>Old</div>
			<div className={`sorting-item noselect shadow`}>Hot</div>
			<div className={`sorting-item noselect shadow`}>Top</div>
			<div className={`hidden sorting-item noselect shadow`}>Today</div>
		</div>
	);
}
