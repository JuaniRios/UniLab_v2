import React from "react";
// STYLES
import "./Announcements.css";
// IMAGES

export default function Announcements(props) {
	return (
		<div className={`announcements gui-element shadow`}>
			<button className={`close-button hidden`}></button>

			<h1>Announcements</h1>

			<div className={`announcement`}>
				Title of Announcement 1: Something happened in some field.
			</div>
			<hr />
			<div className={`announcement`}>
				Title of Announcement 2: Something happened in some field.
			</div>
			<hr />
			<div className={`announcement`}>
				Title of Announcement 3: Something happened in some field.
			</div>
			<hr />
			<div className={`announcement`}>
				Title of Announcement 4: Something happened in some field.
			</div>
			<hr />
			<div className={`announcement`}>
				Title of Announcement 5: Something happened in some field.
			</div>

			<div className={`announcements-btn uni-button`}>More Announcements</div>
		</div>
	);
}
