import React, { useState, useEffect } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

// SCRIPTS
import "../../Assets/scripts/main.jsx";
// STYLES
import "./SideProfileMenu.css";
// IMAGES
import profile_icon from "../../Assets/img/top-nav/profile.png";

function SideProfileMenu(props) {
    const user = props.user
    return (
        <aside className="profile-menu shadow">

            <button className="profile-close-button close-button" onclick="open_profile()"></button>
            <a href="{% url 'profile' %}"><img id="profile-picture" src={user ? user['image'] : profile_icon} alt="Profile Picture" /></a>
            <div className="profile-names">user.first_name user.last_name</div>

            <div>user.user_type_verbose</div>

            {/* {% if user.user_type_verbose == 'Student' %} */}
            <a href="{% url 'profile' %}" className="uni-button settings-button">
                <div className="prof-picture"></div>
                {/* {# Translators: Start of side profile menu #} */}
                <h3>My Profile</h3>
            </a>
            {/* {% else %} */}
            <a href="{% url 'my-companies' %}" className="uni-button settings-button">
                <div className="prof-picture"></div>
                {/* {# Translators: Start of side profile menu #} */}
                <h3>My Companies</h3>
            </a>
            {/* {% endif %} */}


            <a href="{% url 'settings' %}" className="uni-button settings-button">
                <div className="settings-picture"></div>
                <h3>Account Settings</h3>
            </a>

            <a href="{% url 'signout' %}" className="uni-button settings-button">
                <div className="logout-picture"></div>
                {/* {# Translators: End of side profile menu #} */}
                <h3 className="w80">Sign Out</h3>
            </a>

        </aside>
    )
}

export default SideProfileMenu;