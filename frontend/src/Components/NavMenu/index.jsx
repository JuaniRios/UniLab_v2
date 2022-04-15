import React, { useEffect, useReducer, useState } from "react";
// OTHER
import { useAuthState } from "../../Context";
import TopNav from "./TopNav";
import GeneralSearch from "./GeneralSearch";
import SideLanguageMenu from "./SideLanguageMenu";
import SideProfileMenu from "./SideProfileMenu";
import Login from "./Login";
import { initialState } from "../../Context/reducer";
import { useMessage } from "../../Context/context";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import FeedbackButton from "./FeedbackButton";
import FeedbackForm from "./FeedbackForm";

export default function NavMenu(props) {
	let location = useLocation();
	const state = location.state;
	const { userData } = useAuthState();
	const [displayLogin, setDisplayLogin] = useState(false);
	const [displayLanguage, setDisplayLanguage] = useState(false);
	const [displayProfile, setDisplayProfile] = useState(false);
	const [displaySearch, setDisplaySearch] = useState(false);
	const [displayMobile, setDisplayMobile] = useState(false);
	const [displayFeedback, setDisplayFeedback] = useState(false);

	// if you were redirected because you had no auth, open login menu
	useEffect(() => {
		console.log(state);
		if (state === "showLogin") setDisplayLogin(true);
		// alert(state)
	}, [state]);

	// disable scroll when a menu is on screen
	useEffect(() => {
		if (displayLogin || displayProfile || displaySearch || displayLanguage) {
			document.body.classList.add("no-scroll");
			document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
		} else {
			document.body.classList.remove("no-scroll");
			document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
		}
	}, [displayLogin, displayLanguage, displayProfile, displaySearch]);

	// make it possible to close menus with escape key
	useEffect(() => {
		document.addEventListener("keyup", keyFuncNavMenu);
		return () => {
			document.removeEventListener("keyup", keyFuncNavMenu);
		};
	}, [displayLogin, displayProfile, displayLanguage, displaySearch]);
	function keyFuncNavMenu(event) {
		if (event.key === "Escape") {
			setDisplayLogin(false);
			setDisplayProfile(false);
			setDisplayLanguage(false);
			setDisplaySearch(false);
			setDisplayMobile(false);
		}
	}

	function setAll(bool) {
		const safeBool = !!bool;
		setDisplayLogin(safeBool);
		setDisplayMobile(safeBool);
		setDisplayLanguage(safeBool);
		setDisplaySearch(safeBool);
		setDisplayProfile(safeBool);
	}

	function anyMenu() {
		return (
			displayLanguage || displaySearch || displayProfile || displayLogin || displayFeedback
		);
	}

	useEffect(() => {
		console.log("userdata is:");
		console.log(userData);
	}, [userData]);

	return (
		<>
			{anyMenu() && <div className={`overlay shown`} onClick={() => setAll(false)} />}
			{/* <FeedbackForm setDisplay={setDisplayFeedback} display={displayFeedback} />
			{userData && (
				<FeedbackButton
					onClick={() => {
						setDisplayFeedback(true);
					}}
				/>
			)} */}

			<TopNav
				setDisplayProfile={setDisplayProfile}
				setDisplayLanguage={setDisplayLanguage}
				setDisplaySearch={setDisplaySearch}
				setDisplayMobile={setDisplayMobile}
				displayMobile={displayMobile}
			/>

			{displaySearch ? (
				<GeneralSearch setDisplay={setDisplaySearch} display={displaySearch} />
			) : null}

			<SideProfileMenu
				setDisplay={setDisplayProfile}
				display={displayProfile}
				setDisplayLogin={setDisplayLogin}
			/>

			<SideLanguageMenu setDisplay={setDisplayLanguage} display={displayLanguage} />

			<Login
				setDisplayProfile={setDisplayProfile}
				setDisplay={setDisplayLogin}
				display={displayLogin}
			/>
		</>
	);
}
