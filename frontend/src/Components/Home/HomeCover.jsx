import React from "react";
import { NavLink } from "react-router-dom";
// STYLES
import "./HomeCover.css";

import useWindowSize from "../../CustomHooks/useWindowSize";

export default function HomeCover(props) {
	const windowSize = useWindowSize();
	if (windowSize[0] < 1030) {
		return (
			<div className={`home-cover`}>
				<div className={`home-cover-message`}>
					<h2 className={`welcome-msg w100`}>Welcome to UniLab!</h2>
					<h3 className={`w100`}>An easier way to connect with employers in Europe</h3>
					<NavLink to="/sign-up" className={`uni-button get-started`}>
						Get Started
					</NavLink>
				</div>
			</div>
		);
	} else {
		return (
			<div className={`home-cover`}>
				<div className={`home-cover-polygon`}></div>
				<div className={`home-cover-message`}>
					<h1 className={`welcome-msg`}>Welcome to UniLab!</h1>
					<h2>An easier way to connect with employers in Europe</h2>
					<NavLink to="/sign-up" className={`uni-button-3`}>
						Get Started
					</NavLink>
				</div>
			</div>
		);
	}
}
