import React, { useState, useEffect } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import "../scripts/main.js";
import "../scripts/top_nav.js";
import "../scripts/chatbox.js";
import "../scripts/ajax.js";



function Navbar(props) {
    const user = props.user
    return (
        // TOP NAVIGATION BAR
        <nav className="top-nav flex-row a-i-c shadow">

            {/*LOGO*/}
            <NavLink to='/' id="logo-link" className="top-nav-item flex-row a-i-c">
                <img id="logo-img" className="top-nav-image" src="../img/unilab_logo.png" alt="UniLab Logo"
                     title="Home"/>
            </NavLink>

            {/*MOBILE*/}
            <div className="menu-mobile" onClick={open_linebar}/>

            {/*MENU*/}
            <div className="top-nav-container">

                {/*HOME BUTTON*/}
                <NavLink to="/" className="top-nav-item flex-row a-i-c" onMouseOver={ () => fill_items(0) }
                   onMouseOut={ () => cancel_items(0) }>
                    <div className="top-nav-item-filler flex-row a-i-c"/>
                    <img className="top-nav-image" src="../img/top-nav/address2.png" alt="Home Icon" />
                    {/*{# Translators: Start of Navigation bar #}*/}
                    <div id="home-button" className="top-nav-item-text">
                        {/*{% translate "Home" context "this is the navbar"%}*/}
                        Home
                    </div>
                </NavLink>

                {/*COMMUNITY BUTTON*/}
                <NavLink to="/community" className="top-nav-item flex-row a-i-c" onMouseOver={() => fill_items(1) }
                   onMouseOut={ () => cancel_items(1) }>
                    <div className="top-nav-item-filler flex-row a-i-c"/>
                    <img className="top-nav-image" src="../img/top-nav/community.png" alt="Community Icon" />
                    <div id="community-button" className="top-nav-item-text">
                        {/*{% translate "Community"%}*/}
                        Community
                    </div>
                </NavLink>

                {/*COMPANIES BUTTON*/}
                <NavLink to="/companies" className="top-nav-item flex-row a-i-c" onMouseOver={ () => fill_items(2) }
                   onMouseOut={ () => cancel_items(2) }>
                    <div className="top-nav-item-filler flex-row a-i-c"/>
                    <img className="top-nav-image" src="../img/top-nav/employers.png" alt="Companies Icon" />
                    <div id="employers-button" className="top-nav-item-text">
                        {/*{% translate "Companies"%}*/}
                        Companies
                    </div>
                </NavLink>

                {/*JOBS BUTTON*/}
                <NavLink to="/jobs" className="top-nav-item flex-row a-i-c" onMouseOver={ () => fill_items(3)}
                   onMouseOut={ () => cancel_items(3) }>
                    <div className="top-nav-item-filler flex-row a-i-c"/>
                    <img className="top-nav-image" src="../img/top-nav/jobs.svg" alt="Jobs Icon" />
                    <div id="jobs-button" className="top-nav-item-text">
                        {/*{% translate "Jobs"%}*/}
                        Jobs
                    </div>

                </NavLink>

                {/*ABOUT BUTTON*/}
                <NavLink to="/about" className="top-nav-item flex-row a-i-c" onMouseOver={ () => fill_items(4) }
                   onMouseOut={ () => cancel_items(4) }>
                    <div className="top-nav-item-filler flex-row a-i-c"/>
                    <img className="top-nav-image" src="../img/top-nav/about.png" alt="About Icon" />
                    <div id="about-button" className="top-nav-item-text">
                        {/*{% translate "About"%}*/}
                        About
                    </div>
                </NavLink>

                {/*PROFILE BUTTON*/}
                <a className="top-nav-item top-nav-profile flex-row a-i-c" onClick={ open_profile }>
                    <img id="profile-img" className="top-nav-image" src={user ? user['image'] : '../../static/img/top-nav/profile.png'}
                         alt="Profile Picture" title="Profile" />

                    <div id="profile-text" className="top-nav-item-text">
                        {/*{% translate "Profile"%}*/}
                        Profile
                    </div>
                </a>

                {/*SEARCH BUTTON*/}
                <a className="top-nav-item top-nav-search flex-row a-i-c" onClick={ show_search }>
                    <img id="search-img" className="top-nav-image" src="../img/top-nav/search.png"
                         alt="Magnifying Glass" title="Search" />
                    <div id="search-text" className="top-nav-item-text">
                        {/*{% translate "Search"%}*/}
                        Search
                    </div>
                </a>

                {/*LANGUAGE BUTTON*/}
                <a className="top-nav-item flex-row a-i-c" onClick={ open_lang() }>
                    <img id="lang-img" className="top-nav-image" alt="Locale Country Flag" title="Language" />
                    {/*{# Translators: End of navigation bar #}*/}
                    <div id="search-text" className="top-nav-item-text">
                        {/*{% translate "Language"%}*/}
                        Language
                    </div>
                </a>
            </div>
        </nav>
    )
}

export default Navbar;