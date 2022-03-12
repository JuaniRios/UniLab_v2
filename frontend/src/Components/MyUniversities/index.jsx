import React, { useEffect, useState } from "react";
import RectangleItem from "../RectangleItem";

import "./index.css";

import profile from "../../Assets/img/profile.png";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import { useAuthState } from "../../Context";
import apiCall from "../HelperFunctions/apiCall";
import UniItem from "./UniItem";
import { useMessage } from "../../Context/context";
import urlToPk from "../HelperFunctions/urlToPk";

export default function MyUniversities(props) {
	const [message, setMessage] = useMessage();
	const { token, userData } = useAuthState();
	const [universities, setUniversities] = useState([]);

	useEffect(async () => {
		if (userData) {
			try {
				const newUniversities = [];

				// get full data of each uni admin relation
				for (const url of userData.university_admins) {
					const admin_data = await apiCall(url, token, { method: "GET", fullUrl: true });

					// get data of each uni

					newUniversities.push(
						await apiCall(admin_data.university, token, {
							method: "GET",
							fullUrl: true,
						})
					);
				}

				// get full data pf each uni
				// build widget
				for (const [i, data] of newUniversities.entries()) {
					setUniversities((prevState) =>
						prevState.concat(
							<UniItem key={i} {...data} url={`/universities/${urlToPk(data.url)}`} />
						)
					);
				}
			} catch (e) {
				setMessage(`error getting unis: ${e}`);
			}
		}
	}, [userData]);

	return (
		<>
			<NavMenu />
			<div className="w60" style={{ margin: "auto" }}>
				<h1 className="normal">My Universities</h1>
				{universities}
			</div>
		</>
	);
}
