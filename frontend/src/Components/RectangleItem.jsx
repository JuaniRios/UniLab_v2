import React from "react";

import "./RectangleItem.css";

export default function RectangleItem(props) {
	return (
		<div className="rect-item-container shadow">
			<div className="rect-item-content">{props.content}</div>
			<div className="rect-item-btn-holder">
				{props.btns.map((item, i) => (
					<div key={i} className="uni-button rect-item-btn" onClick={props.onClick[i]}>
						{props.btns[i]}
					</div>
				))}
			</div>
		</div>
	);
}
