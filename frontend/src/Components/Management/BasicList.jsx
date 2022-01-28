import React from "react";
// STYLES
import "./BasicList.css";

export default function BasicList(props) {
	return (
		<>
			<div className={`basic-list custom-scroll`}>
				<h4 className={`basic-list-title c-t`}>Approved users for creating {props.type}</h4>
				{props.children}
			</div>
		</>
	);
}
