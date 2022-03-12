import React, { useEffect, useState } from "react";
import RectangleItem from "../RectangleItem";

import "./index.css";

import profile from "../../Assets/img/profile.png";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import { useAuthState } from "../../Context";
import apiCall from "../HelperFunctions/apiCall";
import { useMessage } from "../../Context/context";
import urlToPk from "../HelperFunctions/urlToPk";
import CompanyItem from "./CompanyItem";

export default function MyUniversities(props) {
	const [message, setMessage] = useMessage();
	const { token, userData } = useAuthState();
	const [companies, setCompanies] = useState([]);

	useEffect(async () => {
		if (userData) {
			try {
				const newCompanies = [];

				// get full data of each company admin relation
				for (const url of userData.company_admins) {
					const admin_data = await apiCall(url, token, { method: "GET", fullUrl: true });

					// get data of each company
					newCompanies.push(
						await apiCall(admin_data.company, token, { method: "GET", fullUrl: true })
					);
				}

				// get full data of each company
				// build widget
				for (const [i, data] of newCompanies.entries()) {
					setCompanies((prevState) =>
						prevState.concat(
							<CompanyItem
								key={i}
								{...data}
								url={`/companies/${urlToPk(data.url)}`}
							/>
						)
					);
				}
			} catch (e) {
				setMessage(`error getting companies: ${e}`);
			}
		}
	}, [userData]);

	return (
		<>
			<NavMenu />
			<div className="w60" style={{ margin: "auto" }}>
				<h1 className="normal">My Companies</h1>
				{companies}
			</div>
		</>
	);
}
