import React, { useReducer } from "react";
import TopNav from "../../Components/NavMenu/TopNav";
import GeneralSearch from "../../Components/NavMenu/GeneralSearch";
import SideLanguageMenu from "../../Components/NavMenu/SideLanguageMenu";
import SideProfileMenu from "../../Components/NavMenu/SideProfileMenu";
import {useAuthState} from "../../Context";

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

            <h1>TEST1</h1>
            <h1>TEST2</h1>
            <h1>TEST3</h1>
            <h1>TEST4</h1>
            <h1>TEST5</h1>
            <h1>TEST6</h1>
            <h1>TEST7</h1>
            <h1>TEST8</h1>
            <h1>TEST9</h1>
            <h1>TEST10</h1>
            <h1>TEST11</h1>

        </>
    );
}

export default NavMenu;