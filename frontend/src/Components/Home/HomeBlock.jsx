import React from "react";
// STYLES
import "./HomeBlock.css";

export default function HomeBlock(props) {
	const headerValue = props.headerValue;
	const btnValue = props.btnValue;
	return (
		<div className={`home-block shadow`}>
			<h1 className={`home-block-header`}>{headerValue}</h1>
			{props.children}
			<a href="{% url 'signup' %}" className={`home-block-btn uni-button`}>
				{btnValue}
			</a>
		</div>
	);
}
