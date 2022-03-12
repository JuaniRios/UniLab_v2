import React, { useState} from "react";
// STYLES
import "./GeneralSearch.css";
// IMAGES
import search_icon from "../../Assets/img/top-nav/search.png";
import CloseButton from "../Buttons/CloseButton";
import { CSSTransition } from "react-transition-group";
import RectangleItem from "../RectangleItem";
import apiCall from "../HelperFunctions/apiCall";
import {useAuthState} from "../../Context";
import urlToPk from "../HelperFunctions/urlToPk";
import {useMessage} from "../../Context/context";

export default function GeneralSearch(props) {
	const {token} = useAuthState()
	const [message, setMessage] = useMessage()
	const [companyResults, setCompanyResults] = useState([])
	const [jobResults, setJobResults] = useState([])
	const [uniResults, setUniResults] = useState([])
	const [userResults, setUserResults] = useState([])
	// const [searchString, setSearchString] = useState("")

	async function getResults(e) {
		e.preventDefault()
		setCompanyResults([])
		setJobResults([])
		setUniResults([])
		setUserResults([])
		const searchString = e.target.value
		console.log(searchString)
		if (searchString.length <= 0) {
			return
		}
		const params = {
			"method": "GET",
			"search": searchString
		};

		// update company results
		try {
			const company_data = await apiCall("companies", token, params);
			for (const result of company_data.results) {
				setCompanyResults(prev=>prev.concat(<RectangleItem
					img={result.image}
					url={`/companies/${urlToPk(result.url)}`}
					content={result.name}
					style={{
						zIndex: "10500",
						width: "60%",
						margin: "0 auto",
						background: "white",
						borderRadius: "0",
						boxShadow: "none",
					}}
				/>))
			}
		} catch (e) {
			setMessage(`error getting companies: ${e}`)
		}

		// update job results
		try {
			const job_data = await apiCall("jobs", token, params);
			for (const result of job_data.results) {
				setJobResults(prev=>prev.concat(<RectangleItem
					img={result.company.image}
					url={`/jobs/${urlToPk(result.url)}`}
					content={result.title}
					style={{
						zIndex: "10500",
						width: "60%",
						margin: "0 auto",
						background: "white",
						borderRadius: "0",
						boxShadow: "none",
					}}
				/>))
			}
		} catch (e) {
			setMessage(`error getting jobs: ${e}`)
		}

		// update uni results
		try {
			const uni_data = await apiCall("universities", token, params);
			for (const result of uni_data.results) {
				setUniResults(prev=>prev.concat(<RectangleItem
					img={result.image}
					url={`/universities/${urlToPk(result.url)}`}
					content={result.name}
					style={{
						zIndex: "10500",
						width: "60%",
						margin: "0 auto",
						background: "white",
						borderRadius: "0",
						boxShadow: "none",
					}}
				/>))
			}
		} catch (e) {
			setMessage(`error getting universities: ${e}`)
		}

		// update user results
		try {
			const user_data = await apiCall("users", token, params);
			for (const result of user_data.results) {
				setUserResults(prev=>prev.concat(<RectangleItem
					img={result.image}
					url={`/profile/${urlToPk(result.url)}`}
					content={result.first_name + " " + result.last_name}
					style={{
						zIndex: "10500",
						width: "60%",
						margin: "0 auto",
						background: "white",
						borderRadius: "0",
						boxShadow: "none",
					}}
				/>))
			}
		} catch (e) {
			setMessage(`error getting users: ${e}`)
		}

	}

	const catStyle = {zIndex: "10500", width: "60%", margin: "0 auto", padding: "1rem", background: "white",
						borderRadius: "0", boxShadow: "none"}

		return (
			//
				<CSSTransition
					in={props.display}
					unmountOnExit
					timeout={500}
					classNames={"menu-search"}
				>
					<div className="search-menu-opened">
						<form className={`search-wrapper  shadow flex-row a-i-c j-c-c`}>
							<img id="search-icon" src={search_icon} alt="Magnifying Glass" title="Search"/>

							<input
								className={`search-field noshadow`}
								name="main-search"
								type="search"
								placeholder="Search UniLab..."
								onChange={getResults}
							/>

							<CloseButton
								clickEvent={() => {
									props.setDisplay(false);
								}}
								position="relative"
								borderRadius="50%"
							/>
						</form>

						{companyResults.length>0 && <>
							<h3 style={catStyle}>Companies</h3>
							{companyResults}
						</>

						}

						{jobResults.length>0 && <>
							<h3 style={catStyle}>Jobs</h3>
							{jobResults}

						</>}

						{uniResults.length>0 && <>
								<h3 style={catStyle}>Universities</h3>
							{uniResults}
							}
						</>}

						{userResults.length>0 && <>
								<h3 style={catStyle}>Users</h3>
							{userResults}
							}
						</>}
					</div>
				</CSSTransition>

			// </div>
		);
}
