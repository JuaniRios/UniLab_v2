import React, { useState, useEffect } from "react";
// STYLES
import "./SideProfileMenu.css";
// IMAGES
import profile_icon from "../../Assets/img/top-nav/profile.png";
import { useAuthState } from "../../Context";
import { NavLink } from "react-router-dom";
import {CSSTransition} from "react-transition-group";

export default function SideProfileMenu(props) {
	const state = useAuthState();
	const userData = state.userData;

	const profileButton = (
		<NavLink to="/profile" className={`settings-button`}>
			<div className={`prof-picture`} />
			<p className={`w80 bold`}>My Profile</p>
		</NavLink>
	);

	const myCompaniesButton = (
		<NavLink to="my-companies" className={`settings-button`}>
			<div className={`prof-picture`} />
			<p className={`w80 bold`}>My Companies</p>
		</NavLink>
	);

	let signedInButtons = (
		<>
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

	let userHTML;
	if (userData.user_type_verbose === "Student") {
		userHTML = (
			<>
				{profileButton}
				{signedInButtons}
			</>
		);
	} else if (userData.user_type_verbose === "Employer") {
		userHTML = (
			<>
				{myCompaniesButton}
				{signedInButtons}
			</>
		);
	}
	const notSignedInButtons = (
		<>
			<button onClick={() => {props.setDisplayLogin(true)}} className={`settings-button`}>
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

			<div className={`verbose`}>{userData.user_type_verbose}</div>
		</div>
	);
	const notSignedInMessage = (
		<div className={`w100 flex-col j-c-c a-i-c`}>
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
	);

	return (
		<>
			<CSSTransition
				in={props.display}
				unmountOnExit
				timeout={500}
				classNames={"menu-primary"}>
				<div className={`profile-menu shadow`}>
					<button
						className={`profile-close-button close-button`}
						onClick={() => {props.setDisplay(false)}}
					/>

					{userData && signedInUserData}
					{!userData && notSignedInMessage}

					{/* MENU BUTTONS */}
					<div className={`profile-menu-btn-holder w100`}>
						{userData && userHTML}
						{!userData && notSignedInButtons}
					</div>
				</div>
			</CSSTransition>
		</>
	);
}
