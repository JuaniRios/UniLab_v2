import React from "react";
import RectangleItem from "../RectangleItem";

import "./index.css";

import profile from "../../Assets/img/profile.png";

export default function MyUniversities(props) {
	return (
		<>
			<RectangleItem img={profile} content="Uni Name" />
		</>
	);
}
