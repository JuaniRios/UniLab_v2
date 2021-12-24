import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import NavMenu from "../NavMenu";
import "./index.css";
import ProfileContentFrame from "./ProfileContentFrame";

function Profile(props) {

    document.title = "Profile - UniLab";
    document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
    document.body.classList.remove("noscroll");

    const profileMenuRef = useRef(null);

    function changeActiveItem(n) {
        let c = profileMenuRef.current.children;
        for (let i = 0; i < c.length; i++) {
            c[i].classList.remove("active-menu-item");
        }
        c[n].classList.add("active-menu-item");
    }

    return (
        <>
            <NavMenu />
            <div className={`main-content`}>
                <div className={`profile`}>

                    <div className={`main-profile-menu`} ref={profileMenuRef}>

                        <NavLink to="#basic-info" className={`profile-menu-item active-menu-item`} onClick={e => changeActiveItem(0)}>
                            <div className={`item-text`}>Basic Information</div>
                        </NavLink>

                        <NavLink to="#education" className={`profile-menu-item`} onClick={e => changeActiveItem(1)}>
                            <div className={`item-text`}>Education</div>
                        </NavLink>

                        <NavLink to="#experience" className={`profile-menu-item`} onClick={e => changeActiveItem(2)}>
                            <div className={`item-text`}>Experience</div>
                        </NavLink>

                        <NavLink to="#skills" className={`profile-menu-item`} onClick={e => changeActiveItem(3)}>
                            <div className={`item-text`}>Skills</div>
                        </NavLink>

                        <NavLink to="#posts" className={`profile-menu-item`} onClick={e => changeActiveItem(4)}>
                            <div className={`item-text`}>Posts</div>
                        </NavLink>

                        <NavLink to="#comments" className={`profile-menu-item`} onClick={e => changeActiveItem(5)}>
                            <div className={`item-text`}>Comments</div>
                        </NavLink>

                    </div>

                    <div className={`profile-content-container`}>

                        <ProfileContentFrame id="education" margin={true} title="Education" plusBtn={true}>
                            <h4 className={`normal`} style={{ margin: "3rem 0 0 0" }}>
                                You haven't added education yet...
                            </h4>
                        </ProfileContentFrame>

                        <ProfileContentFrame id="experience" margin={true} title="Experience" plusBtn={true}>
                            <h4 className={`normal`} style={{ margin: "3rem 0 0 0" }}>
                                You haven't added experience yet...
                            </h4>
                        </ProfileContentFrame>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Profile; 