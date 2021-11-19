import React, { useState, useEffect } from "react";
// STYLES
import "./SideProfileMenu.css";
// IMAGES
import profile_icon from "../../Assets/img/top-nav/profile.png";
import {useAuthState} from "../../Context";
import {NavLink} from "react-router-dom";

function SideProfileMenu(props) {
    const state = useAuthState()
    const userData = state.userData;
    const [profileClass, overlayClass] = props.profileClasses;
    const setProfileClasses = props.setProfileClasses;

    const studentHTML = <>
        <NavLink to="/profile" className="uni-button settings-button">
            <div className="prof-picture"/>
            {/* {# Translators: Start of side profile menu #} */}
            <h3>My Profile</h3>
        </NavLink>
    </>

    const employerHTML = <>
        <NavLink to="/my-companies" className="uni-button settings-button">
            <div className="prof-picture"/>
            {/* {# Translators: Start of side profile menu #} */}
            <h3>My Companies</h3>
        </NavLink>
    </>

    let signedInHTML = <>
        <NavLink to="/settings" className="uni-button settings-button">
                    <div className="settings-picture"/>
                    <h3>Account Settings</h3>
                </NavLink>

        <NavLink to="/signout" className="uni-button settings-button">
            <div className="logout-picture"/>
            {/* {# Translators: End of side profile menu #} */}
            <h3 className="w80">Sign Out</h3>
        </NavLink>
    </>;

    let userHTML;
    if (userData.user_type_verbose === "Student"){
        userHTML = <>
            {studentHTML}
            {signedInHTML}
        </>
    } else if (userData.user_type_verbose === "Employer"){
        userHTML = <>
            {employerHTML}
            {signedInHTML}
        </>
    }

    const notSignedInHTML = <>
         <NavLink to="/login" className="uni-button settings-button">
            <div className="logout-picture"/>
            {/* {# Translators: End of side profile menu #} */}
            <h3 className="w80">Sign In</h3>
        </NavLink>
    </>




    return (
        <>
            <div className={`overlay ${overlayClass}`} onClick={setProfileClasses}/>

            <aside className={`profile-menu ${profileClass} shadow`}>

                <button className="profile-close-button close-button" onClick={setProfileClasses}/>
                <NavLink to="/profile"><img className="profile-picture" src={userData ? userData['image'] : profile_icon} alt="Profile Picture" /></NavLink>
                <div className="profile-names">{userData.first_name} {userData.last_name}</div>

                <div>{userData.user_type_verbose}</div>

                {/*conditional rendering using feature that bool && component returns component if true*/}
                {userData && userHTML}
                {!userData && notSignedInHTML}



            </aside>
        </>
    )
}

export default SideProfileMenu;