import React from "react";
// STYLES
import "./HomePrimary.css";
// OTHER
import HomeBlock from "./HomeBlock";
import BoxGrid from "./BoxGrid";

export default function HomePrimary(props) {
	var companyName = "LONGCOMPANYNAMEWITHOUTSPACING";
	if (companyName.length > 20) {
		companyName = companyName.slice(0, 19) + "...";
	}
	return (
		<div className={`home-primary`}>
			<HomeBlock headerValue="Explore UniLab" btnValue="Create Account">
				<div className={`home-block-content-1`}>
					<p>
						Join our platform with companies around the world. Search for a suitable job
						in your field, location and language.
					</p>
					<p>
						Explore companies, positions and community posts to learn more about your
						future workplace.
					</p>
				</div>
			</HomeBlock>

			<HomeBlock headerValue="Top Companies" btnValue="More Companies">
				<BoxGrid contentType={"companies"} />
			</HomeBlock>
		</div>
	);
}
