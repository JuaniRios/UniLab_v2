import React, { useState, useEffect } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import "../../scripts/main.jsx";
// IMAGES
import search_icon from "../../img/top-nav/search.png";

function Navbar(props) {
    const user = props.user
    return (
        <form className="search-wrapper shadow flex-row a-i-c j-c-c hidden">

            <img id="search-icon" src={search_icon} alt="Magnifying Glass" title="Search" />

            {/* <!-- Search Field --> */}
            <input className="search-field noshadow" name="main-search" type="search" placeholder="Search UniLab..." />
            <div className="search-cancel close-button" onclick="hide_search()"></div>

        </form>
    )
}

export default Navbar;