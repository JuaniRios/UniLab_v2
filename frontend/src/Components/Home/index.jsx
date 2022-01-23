import React from "react";
import { useLocation } from "react-router-dom";
// STYLES
import "./index.css";
// OTHER
import NavMenu from "../NavMenu";
import Announcements from "./Announcements";
import Slider from "../Slider";
import Footer from "../Footer";
import HomePrimary from "./HomePrimary";
import HomeCover from "./HomeCover";

export default function Home(props) {
	document.title = "UniLab - Home";
	document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
	document.body.classList.remove("noscroll");
	return (
		<>
			<NavMenu/>
			<HomeCover />
			<div className={`home-content`}>
				<HomePrimary />
				<Announcements />
			</div>
			<Slider contentType={"jobs"} />
			<Footer />
		</>
	);
}
