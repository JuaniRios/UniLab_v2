// NAVIGATION MENU FRAME
import React, { useReducer } from "react";
import TopNav from "./TopNav";
import GeneralSearch from "./GeneralSearch";
import SideLanguageMenu from "./SideLanguageMenu";
import SideProfileMenu from "./SideProfileMenu";
import { useAuthState } from "../../Context";

function NavMenu(props) {
    const state = useAuthState()
    const userData = state.userData

    // OPEN AND CLOSE SIDE PROFILE MENU
    function changeProfileClasses(initState) {
        if (initState[0] === "profile-menu-closed") {
            document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
            document.body.classList.add("noscroll");
            return ["profile-menu-opened", "shown"];
        }
        else {
            document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
            document.body.classList.remove("noscroll");
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
            document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
            document.body.classList.remove("noscroll");
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
            document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
            document.body.classList.remove("noscroll");
            return ["search-menu-closed", "hidden"];
        }
    }
    const initSearchClasses = ["search-menu-closed", "hidden"];
    const [searchClasses, setSearchClasses] = useReducer(changeSearchClasses, initSearchClasses);

    return (
        <>
            <TopNav
                setProfileClasses={setProfileClasses}
                setLanguageClasses={setLanguageClasses}
                setSearchClasses={setSearchClasses}
            />
            <GeneralSearch
                searchClasses={searchClasses}
                setSearchClasses={setSearchClasses}
            />
            <SideProfileMenu
                profileClasses={profileClasses}
                setProfileClasses={setProfileClasses}
            />
            <SideLanguageMenu
                languageClasses={languageClasses}
                setLanguageClasses={setLanguageClasses}
            />
        </>
    );
}

export default NavMenu;