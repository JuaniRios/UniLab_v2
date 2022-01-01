// Renders an arrow.
// Props: direction(string) - up, down, left or right.
import React from "react";
// STYLES
import "./Arrow.css";

export default function Arrow(props) {
	return <div className={`${props.direction}-arrow arrow`}></div>;
}
