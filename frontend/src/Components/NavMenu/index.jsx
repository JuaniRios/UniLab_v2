// NAVIGATION MENU FRAME
import React, { useEffect, useReducer, useState } from "react";
import TopNav from "./TopNav";
import GeneralSearch from "./GeneralSearch";
import SideLanguageMenu from "./SideLanguageMenu";
import SideProfileMenu from "./SideProfileMenu";
import Login from "./Login";
import { useAuthState } from "../../Context";

function NavMenu(props) {
    const state = useAuthState();
    const userData = state.userData;
    const [redirected, setRedirected] = useState(props.redirected);

    // OPEN AND CLOSE MOBILE MENU
    function changeMobileClasses(initState) {
        if (initState[0] === "linebar-inactive") {
            document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
            document.body.classList.add("noscroll");
            return ["linebar-toggled", "container-opened"];
        }
        else {
            document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
            document.body.classList.remove("noscroll");
            return ["linebar-inactive", "container-closed"];
        }
    }
    const initMobileClasses = ["linebar-inactive", "container-closed"];
    const [mobileClasses, setMobileClasses] = useReducer(changeMobileClasses, initMobileClasses);

    // OPEN AND CLOSE SIDE PROFILE MENU
    function changeProfileClasses(initState) {
        if (initState[0] === "profile-menu-closed") {
            document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
            document.body.classList.add("noscroll");
            return ["profile-menu-opened", "shown"];
        }
        else {
            if (mobileClasses[1] === "container-closed") {
                document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
                document.body.classList.remove("noscroll");
            }
            return ["profile-menu-closed", "hidden"];
        }
    }
    const initProfileClasses = ["profile-menu-closed", "hidden"];
    const [profileClasses, setProfileClasses] = useReducer(changeProfileClasses, initProfileClasses);

    // OPEN AND CLOSE SIDE LANGUAGE MENU
    function changeLanguageClasses(initState) {
        if (initState[0] === "language-menu-closed") {
            document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
            document.body.classList.add("noscroll");
            return ["language-menu-opened", "shown"];
        }
        else {
            if (mobileClasses[1] === "container-closed") {
                document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
                document.body.classList.remove("noscroll");
            }
            return ["language-menu-closed", "hidden"];
        }
    }
    const initLanguageClasses = ["language-menu-closed", "hidden"];
    const [languageClasses, setLanguageClasses] = useReducer(changeLanguageClasses, initLanguageClasses);

    // OPEN AND CLOSE GENERAL SEARCH MENU
    function changeSearchClasses(initState) {
        if (initState[0] === "search-menu-closed") {
            document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
            document.body.classList.add("noscroll");
            return ["search-menu-opened", "shown"];
        }
        else {
            if (mobileClasses[1] === "container-closed") {
                document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
                document.body.classList.remove("noscroll");
            }
            return ["search-menu-closed", "hidden"];
        }
    }
    const initSearchClasses = ["search-menu-closed", "hidden"];
    const [searchClasses, setSearchClasses] = useReducer(changeSearchClasses, initSearchClasses);

    // OPEN AND CLOSE LOGIN FORM
    function changeLoginClasses(initState) {
        if (initState[0] === "login-form-closed") {
            document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
            document.body.classList.add("noscroll");
            return ["login-form-opened", "shown"];
        }
        else {
            if (profileClasses[1] === "hidden" && mobileClasses[1] === "container-closed") {
                document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
                document.body.classList.remove("noscroll");
            }
            return ["login-form-closed", "hidden"];
        }
    }
    const initLoginClasses = ["login-form-closed", "hidden"];
    const [loginClasses, setLoginClasses] = useReducer(changeLoginClasses, initLoginClasses);

    useEffect(() => {
        if (redirected) {
            setLoginClasses();
            setRedirected(false);
        }
        document.addEventListener('keyup', keyFuncNavMenu);
        return () => {
            document.removeEventListener('keyup', keyFuncNavMenu);
        }
    }, [profileClasses, loginClasses, languageClasses, searchClasses])

    function keyFuncNavMenu(event) {
        if (event.key === "Escape") {
            if (loginClasses[0] === "login-form-opened") {
                setLoginClasses();
            }
            else if (loginClasses[0] === "login-form-closed" && profileClasses[0] === "profile-menu-opened") {
                setProfileClasses();
            }
            else if (languageClasses[0] === "language-menu-opened") {
                setLanguageClasses();
            }
            else if (searchClasses[0] === "search-menu-opened") {
                setSearchClasses();
            }
        }
    }

    return (
        <>
            <TopNav
                setProfileClasses={setProfileClasses}
                setLanguageClasses={setLanguageClasses}
                setSearchClasses={setSearchClasses}
                mobileClasses={mobileClasses}
                setMobileClasses={setMobileClasses}
            />
            <GeneralSearch
                searchClasses={searchClasses}
                setSearchClasses={setSearchClasses}
            />
            <SideProfileMenu
                profileClasses={profileClasses}
                setProfileClasses={setProfileClasses}

                setLoginClasses={setLoginClasses}
            />
            <SideLanguageMenu
                languageClasses={languageClasses}
                setLanguageClasses={setLanguageClasses}
            />
            <Login
                loginClasses={loginClasses}
                setLoginClasses={setLoginClasses}
                setProfileClasses={setProfileClasses}
            />
        </>
    );
}

export default NavMenu;