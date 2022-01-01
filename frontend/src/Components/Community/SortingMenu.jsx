import React from "react";
// STYLES
import "./SortingMenu.css";

export default function SortingMenu(props) {
	return (
		<div className={`sorting-menu flex-row a-i-c shadow w40`}>
			<div className={`sorting-item shadow`}>New</div>
			<div className={`sorting-item shadow`}>Old</div>
			<div className={`sorting-item shadow`}>Hot</div>
			<div className={`sorting-item shadow`}>Top</div>
			<div className={`hidden sorting-item shadow`}>Today</div>
		</div>
	);
}
