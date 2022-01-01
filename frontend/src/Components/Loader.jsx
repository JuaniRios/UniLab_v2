import React from "react";
// STYLES
import "./Loader.css";

export default function Loader(props) {
	const state = props.state;
	const color = props.color;
	const size = props.size;
	return (
		<div className={`loader-box ${state}`}>
			<div className={`loader size-${size}`}>
				<svg className={`circular-loader`} viewBox="25 25 50 50">
					<circle
						className={`loader-path loader-${color}`}
						cx="50"
						cy="50"
						r="20"
						fill="none"
						strokeWidth="2"
					/>
				</svg>
			</div>
		</div>
	);
}
