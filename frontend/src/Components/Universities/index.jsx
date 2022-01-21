import React from "react";
// ICONS
import mainBackground from "../../Assets/img/vienna.jpg";
// OTHER
import NavMenu from "../NavMenu";
import Search from "../Search";
import Slider from "../Slider";

export default function Universities(props) {
	document.title = "Universities - UniLab";
	document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
	document.body.classList.remove("noscroll");
	var mainFrameStyle = {
		background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${mainBackground})`,
		backgroundPosition: "center center",
		backgroundSize: "cover",
	};
	return (
		<>
			<NavMenu/>
			<div className={`main-content-fixed`} style={mainFrameStyle}>
				<Search searchType="universities" width="w60" />
			</div>
		</>
	);
}
