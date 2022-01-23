import React, { useEffect, useReducer, useState } from "react";
// OTHER
import { useAuthState } from "../../Context";
import TopNav from "./TopNav";
import GeneralSearch from "./GeneralSearch";
import SideLanguageMenu from "./SideLanguageMenu";
import SideProfileMenu from "./SideProfileMenu";
import Login from "./Login";
import {initialState} from "../../Context/reducer";
import {useMessage} from "../../Context/context";

export default function NavMenu(props) {
	const [displayLogin, setDisplayLogin] = useState(false)
	const [displayLanguage, setDisplayLanguage] = useState(false)
	const [displayProfile, setDisplayProfile] = useState(false)
	const [displaySearch, setDisplaySearch] = useState(false)
	const [displayMobile, setDisplayMobile] = useState(false)

	// if you were redirected because you had no auth, open login menu
	if (props.redirected) setDisplayLogin(props.redirected)

	// disable scroll when a menu is on screen
	useEffect( () => {
		if (displayLogin || displayProfile || displaySearch || displayLanguage) {
			document.body.classList.add("no-scroll")
			document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
		} else {
			document.body.classList.remove("no-scroll")
			document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
		}
	}, [displayLogin,displayLanguage,displayProfile,displaySearch])

	// make it possible to close menus with escape key
	useEffect(() => {
		document.addEventListener("keyup", keyFuncNavMenu);
		return () => {
			document.removeEventListener("keyup", keyFuncNavMenu);
		};
	}, [displayLogin, displayProfile, displayLanguage, displaySearch]);
	function keyFuncNavMenu(event) {
		if (event.key === "Escape") {

			setDisplayLogin(false)
			setDisplayProfile(false)
			setDisplayLanguage(false)
			setDisplaySearch(false)
			setDisplayMobile(false)
		}
	}


return (
		<>
			<TopNav
				setDisplayProfile={setDisplayProfile}
				setDisplayLanguage={setDisplayLanguage}
				setDisplaySearch={setDisplaySearch}
				setDisplayMobile={setDisplayMobile}
				displayMobile={displayMobile}
			/>

			{displaySearch &&
				<GeneralSearch
					setDisplay={setDisplaySearch}
				/>}

			{displayProfile &&
				<SideProfileMenu
					setDisplay={setDisplayProfile}
					setDisplayLogin={setDisplayLogin}
				/>}

			{displayLanguage &&
				<SideLanguageMenu
					setDisplay={setDisplayLanguage}
				/>}

			{displayLogin && <Login
				setDisplayProfile={setDisplayProfile}
				setDisplay={setDisplayLogin}
			/>}

		</>
	);
}
