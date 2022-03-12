import React from "react";

import "./RectangleItem.css";

export default function RectangleItem(props) {
	return (
		<>
			{props["url"] ? (
				<div className="rect-item-container shadow" style={props.style}>
					{props.img && (
						<img className="rect-item-img" src={props.img} alt="Company Image" />
					)}
					<div className="rect-item-content">{props.content}</div>
					<div className="rect-item-btn-holder">
						{props.btns &&
							props.btns.map((item, i) => (
								<div
									key={i}
									className="uni-button rect-item-btn"
									onClick={props.onClick[i]}
								>
									{props.btns[i]}
								</div>
							))}
					</div>
				</div>
			) : (
				<a className="rect-item-container shadow" href={props.url} style={props.style}>
					{props.img && (
						<img className="rect-item-img" src={props.img} alt="Company Image" />
					)}
					<div className="rect-item-content">{props.content}</div>
					<div className="rect-item-btn-holder">
						{props.btns &&
							props.btns.map((item, i) => (
								<div
									key={i}
									className="uni-button rect-item-btn"
									onClick={props.onClick[i]}
								>
									{props.btns[i]}
								</div>
							))}
					</div>
				</a>
			)}
		</>
	);
}
