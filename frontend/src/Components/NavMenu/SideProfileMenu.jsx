import React, { useState, useEffect } from "react";
// STYLES
import "./SideProfileMenu.css";
// IMAGES
import profile_icon from "../../Assets/img/top-nav/profile.png";
import { useAuthState } from "../../Context";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import apiCall from "../HelperFunctions/apiCall";

export default function SideProfileMenu(props) {
	const { userData, token } = useAuthState();
	// const [extraData, setExtraData] = useState()
	// useEffect(() => {
	// 	const params = {
	// 		"method": "GET",
	// 		"queries": {"user": userData.url}
	// 	}
	// 	apiCall("user-data", token, params).
	// 	then(data => {
	// 		setExtraData(data.results[0])
	// 		console.log(data)
	// 	}).
	// 	catch(alert)
	// },[userData])

	const profileButton = (
		<>
			<NavLink to="/profile" className={`settings-button`}>
				<div className={`prof-picture`} />
				<p className={`w80 bold`}>My Profile</p>
			</NavLink>
		</>
	);

	const myCompaniesButton = (
		<>
			<NavLink to="/my-companies" className={`settings-button`}>
				<div className={`companies-picture`} />
				<p className={`w80 bold`}>My Companies</p>
			</NavLink>
		</>
	);

	const myUniversitiesButton = (
		<>
			<NavLink to="/my-universities" className={`settings-button`}>
				<p className={`w80 bold`}>My Universities</p>
			</NavLink>
		</>
	);

	const managementButton = (
		<>
			<NavLink to="/management" className={`settings-button`}>
				<p className={`w80 bold`}>Management</p>
			</NavLink>
		</>
	);

	const signedInButtons = (
		<>
			{profileButton}
			{userData && userData.company_admins.length > 0 && myCompaniesButton}
			{userData && userData.university_admins.length > 0 && myUniversitiesButton}
			{userData && userData.is_superuser && managementButton}
			<NavLink to="/settings" className={`settings-button`}>
				<div className={`settings-picture`} />
				<p className={`w80 bold`}>Settings</p>
			</NavLink>

			<NavLink to="/logout" className={`settings-button`}>
				<div className={`logout-picture`} />
				<p className={`w80 bold`}>Sign Out</p>
			</NavLink>
		</>
	);

	const notSignedInButtons = (
		<>
			<button
				onClick={() => {
					props.setDisplayLogin(true);
				}}
				className={`settings-button`}
			>
				<div className={`login-picture`} />
				{/* {# Translators: End of side profile menu #} */}
				<p className={`w80 bold`}>Sign In</p>
			</button>
			<NavLink to="/sign-up" className={`settings-button`}>
				<div className={`signup-picture`} />
				{/* {# Translators: End of side profile menu #} */}
				<p className={`w80 bold`}>Sign Up</p>
			</NavLink>
		</>
	);

	const signedInUserData = (
		<>
			<div className={`profile-user-data w100 flex-col j-c-c a-i-c`}>
				<NavLink to="/profile">
					<img
						className={`profile-picture`}
						src={userData ? userData["image"] : profile_icon}
						alt="Profile Picture"
					/>
				</NavLink>

				<div className={`profile-names`}>
					{userData.first_name} {userData.last_name}
				</div>

				<div className={`verbose`}>{userData.occupation}</div>
			</div>
		</>
	);

	const notSignedInMessage = (
		<>
			<div className={`profile-user-data w100 flex-col j-c-c a-i-c`}>
				<NavLink to="/profile">
					<img
						className={`profile-picture`}
						src={userData ? userData["image"] : profile_icon}
						alt="Profile Picture"
					/>
				</NavLink>

				<div className={`profile-names`}>Guest User</div>

				<div className={`verbose w70`}>
					Sign in to access your profile or create a new account.
				</div>
			</div>
		</>
	);

	return (
		<>
			<CSSTransition
				in={props.display}
				unmountOnExit
				timeout={500}
				classNames={"menu-primary"}
			>
				<div className={`profile-menu shadow`}>
					<button
						className={`profile-close-button close-button`}
						onClick={() => {
							props.setDisplay(false);
						}}
					/>

					{userData && signedInUserData}
					{!userData && notSignedInMessage}

					{/* MENU BUTTONS */}
					<div className={`profile-menu-btn-holder w100`}>
						{userData && signedInButtons}
						{!userData && notSignedInButtons}
					</div>
				</div>
			</CSSTransition>
		</>
	);
}
