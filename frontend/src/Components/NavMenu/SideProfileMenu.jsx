import React, { useState, useEffect } from "react";
// STYLES
import "./SideProfileMenu.css";
// IMAGES
import profile_icon from "../../Assets/img/top-nav/profile.png";
import { useAuthState } from "../../Context";
import { NavLink } from "react-router-dom";

function SideProfileMenu(props) {
    const state = useAuthState();
    const userData = state.userData;
    const [profileClass, overlayClass] = props.profileClasses;
    const setProfileClasses = props.setProfileClasses;

    const profileButton =
        <NavLink to="/profile" className="settings-button">
            <div className="prof-picture"/>
            <p className="w80">My Profile</p>
        </NavLink>;

    const myCompaniesButton =
        <NavLink to="my-companies" className="settings-button">
            <div className="prof-picture"/>
            <p className="w80">My Companies</p>
        </NavLink>;

    let signedInButtons =
        <>
            <NavLink to="/settings" className="settings-button">
                <div className="settings-picture"/>
                <p className="w80">Account Settings</p>
            </NavLink>

            <NavLink to="/logout" className="settings-button">
                <div className="logout-picture"/>
                <p className="w80">Log Out</p>
            </NavLink>
        </>;

    let userHTML;
    if (userData.user_type_verbose === "Student") {
        userHTML = <>
            {profileButton}
            {signedInButtons}
        </>
    } else if (userData.user_type_verbose === "Employer") {
        userHTML = <>
            {myCompaniesButton}
            {signedInButtons}
        </>
    }

    const notSignedInButtons =
        <>
            <NavLink to="/login" className="settings-button">
                <div className="logout-picture" />
                {/* {# Translators: End of side profile menu #} */}
                <h3 className="w80">Sign In</h3>
            </NavLink>
        </>;

    const signedInUserData =
        <>
            <NavLink to="/profile">
                <img className="profile-picture" src={userData ? userData['image'] : profile_icon} alt="Profile Picture" />
            </NavLink>

            <div className="profile-names">{userData.first_name} {userData.last_name}</div>

            <div>{userData.user_type_verbose}</div>
        </>;

    const notSignedInMessage =
        <>
            <NavLink to="/profile">
                <img className="profile-picture" src={userData ? userData['image'] : profile_icon} alt="Profile Picture" />
            </NavLink>

            <div className="profile-names">Guest User</div>

            <div>You are currently not signed in.</div>
        </>;

    return (
        <>
            <div className={`overlay ${overlayClass}`} onClick={setProfileClasses}/>

            <aside className={`profile-menu ${profileClass} shadow`}>

                <button className="profile-close-button close-button" onClick={setProfileClasses} />

                {userData && signedInUserData}
                {!userData && notSignedInMessage}

                {/* MENU BUTTONS */}
                <div className="profile-menu-btn-holder w100">
                    {userData && userHTML}
                    {!userData && notSignedInButtons}
                </div>

            </aside>
        </>
    )
}

export default SideProfileMenu;