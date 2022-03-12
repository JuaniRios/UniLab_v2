import React, { useEffect } from "react";

import "./ApplicationsSlider.css";
import CloseButton from "../Buttons/CloseButton";

export default function ApplicationsSlider(props) {
	useEffect(() => {
		document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
		document.body.classList.add("noscroll");

		return () => {
			document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
			document.body.classList.remove("noscroll");
		};
	}, []);

	return (
		<>
			<div className="overlay" onClick={props.closeEvent}/>
			<div className="applicants-container shadow">
				<h1 className="normal" style={{ textAlign: "center" }}>
					Applications for
					<br />
					{props.first_name} {props.last_name}
				</h1>
				<div className="applicants-list custom-scroll">{props.children}</div>
				<CloseButton
					position="absolute"
					clickEvent={props.closeEvent}
					borderRadius="0 0 0 10px"
				/>
			</div>
		</>
	);
}
