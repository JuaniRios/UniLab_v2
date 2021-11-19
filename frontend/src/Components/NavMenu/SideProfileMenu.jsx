import React, { useState, useEffect } from "react";
// STYLES
import "./SideProfileMenu.css";
// IMAGES
import profile_icon from "../../Assets/img/top-nav/profile.png";

function SideProfileMenu(props) {

    const user = props.user;
    const [profileClass, overlayClass] = props.profileClasses;
    const setProfileClasses = props.setProfileClasses;

    return (
        <>
            <div className={`overlay ${overlayClass}`} onClick={setProfileClasses}></div>

            <aside className={`profile-menu ${profileClass} shadow`}>

                <button className="profile-close-button close-button" onClick={setProfileClasses}></button>
                <a href="{% url 'profile' %}"><img className="profile-picture" src={user ? user['image'] : profile_icon} alt="Profile Picture" /></a>
                <div className="profile-names">user.first_name user.last_name</div>

                <div>user.user_type_verbose</div>

                {/* MENU BUTTONS */}
                <div className="profile-menu-btn-holder w100">

                    <a href="{% url 'profile' %}" className="settings-button">
                        <div className="prof-picture"></div>
                        <p className="w80">My Profile</p>
                    </a>

                    {/* <a href="{% url 'my-companies' %}" className="settings-button">
                        <div className="prof-picture"></div>
                        <p className="w80">My Companies</p>
                    </a> */}

                    <a href="{% url 'settings' %}" className="settings-button">
                        <div className="settings-picture"></div>
                        <p className="w80">Account Settings</p>
                    </a>

                    <a href="{% url 'signout' %}" className="settings-button">
                        <div className="logout-picture"></div>
                        <p className="w80">Sign Out</p>
                    </a>

                </div>

            </aside>
        </>
    )
}

export default SideProfileMenu;