import React, { useEffect } from "react";

import "./ApplicantsSlider.css";
import CloseButton from "./Buttons/CloseButton";

export default function ApplicantsSlider(props) {
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
			<div className="overlay" onClick={props.closeEvent}></div>
			<div className="applicants-container shadow">
				<h1 className="normal" style={{ textAlign: "center" }}>
					Applicants for
					<br />
					{props.jobName}
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
