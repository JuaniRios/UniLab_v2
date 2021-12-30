import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import NavMenu from "../NavMenu";
import "./index.css";
import ProfileContentFrame from "./ProfileContentFrame";
import ProfileContentItem from "./ProfileContentItem";

import profile_icon from "../../Assets/img/profile.png";
import pencil_icon from "../../Assets/img/profile/pencil.png";
import redirect_icon from "../../Assets/img/profile/redirect.svg";

import scrollTo from "../HelperFunctions/scrollTo";
import isScrolledToElement from "../HelperFunctions/isScrolledToElement";

import default_education_icon from "../../Assets/img/defaults/university.jpg";
import CollapsibleMenu from "../CollapsibleMenu";

function Profile(props) {

    document.title = "Profile - UniLab";
    document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
    document.body.classList.remove("noscroll");

    const [menuClassesArray, setMenuClassesArray] = useState(["active-menu-item", "", "", "", "", ""]);
    const [contentClassesArray, setContentClassesArray] = useState(["", "hidden", "hidden", "hidden", "hidden", "hidden"]);

    useEffect(() => {
        switch (window.location.href.substring((window.location.href.indexOf("#") + 1))) {
            case "basic-info":
                changeActiveItem(0);
                break;
            case "education":
                changeActiveItem(1);
                break;
            case "experience":
                changeActiveItem(2);
                break;
            case "skills":
                changeActiveItem(3);
                break;
            case "posts":
                changeActiveItem(4);
                break;
            case "comments":
                changeActiveItem(5);
                break;
            default:
                changeActiveItem(0);
                break;
        }
    }, [])

    function changeActiveItem(n) {
        let pseudoArray = ["", "", "", "", "", ""];
        let pseudoArray2 = ["hidden", "hidden", "hidden", "hidden", "hidden", "hidden"];
        pseudoArray[n] = "active-menu-item";
        pseudoArray2[n] = "";
        setMenuClassesArray(pseudoArray);
        setContentClassesArray(pseudoArray2);
    }

    return (
        <>
            <NavMenu />
            <div className={`main-content`}>
                <div className={`profile`}>

                    <div className={`main-profile-menu`}>
                        <div className={`fixed-menu`}>

                            <NavLink to="#basic-info" className={`profile-menu-item ${menuClassesArray[0]}`}
                                onClick={e => changeActiveItem(0)}>
                                <div className={`item-text`}>Basic Information</div>
                            </NavLink>

                            <NavLink to="#education" className={`profile-menu-item ${menuClassesArray[1]}`}
                                onClick={e => changeActiveItem(1)}>
                                <div className={`item-text`}>Education</div>
                            </NavLink>

                            <NavLink to="#experience" className={`profile-menu-item ${menuClassesArray[2]}`}
                                onClick={e => changeActiveItem(2)}>
                                <div className={`item-text`}>Experience</div>
                            </NavLink>

                            <NavLink to="#skills" className={`profile-menu-item ${menuClassesArray[3]}`}
                                onClick={e => changeActiveItem(3)}>
                                <div className={`item-text`}>Skills</div>
                            </NavLink>

                            <NavLink to="#posts" className={`profile-menu-item ${menuClassesArray[4]}`}
                                onClick={e => changeActiveItem(4)}>
                                <div className={`item-text`}>Posts</div>
                            </NavLink>

                            <NavLink to="#comments" className={`profile-menu-item ${menuClassesArray[5]}`}
                                onClick={e => changeActiveItem(5)}>
                                <div className={`item-text`}>Comments</div>
                            </NavLink>

                        </div>
                    </div>

                    <div className={`profile-content-container`}>

                        <ProfileContentFrame id="basic-info" className={`${contentClassesArray[0]}`}>
                            <div className={`profile-banner`}>
                                <img className={`profile-banner-pfp`} src={profile_icon} alt="Profile icon" />
                            </div>
                            <div className={`profile-basic-info`}>
                                <img className={`basic-info-toggler`} src={pencil_icon} alt="Pen icon" />
                                <h3>
                                    Firstname Lastname
                                </h3>
                                <p>Occupation</p>
                                <p>
                                    <span className={`gray-text`}>Location</span>
                                    <span className={`gray-text`}> · </span>
                                    <NavLink to="#" className={`website-link`}>Website<img src={redirect_icon} alt="Redirect icon" />
                                    </NavLink>
                                </p>
                                <h3>
                                    Summary
                                </h3>
                                <p>You haven't added a summary yet...</p>
                            </div>
                        </ProfileContentFrame>

                        <ProfileContentFrame id="education" className={`${contentClassesArray[1]}`} margin={true} title="Education" plusBtn={true}>
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <h4 className={`normal`} style={{ margin: "1rem 0" }}>
                                You haven't added any education yet...
                            </h4>
                        </ProfileContentFrame>

                        <ProfileContentFrame id="experience" className={`${contentClassesArray[2]}`} margin={true} title="Experience" plusBtn={true}>
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <h4 className={`normal`} style={{ margin: "1rem 0" }}>
                                You haven't added any experience yet...
                            </h4>
                        </ProfileContentFrame>

                        <ProfileContentFrame id="skills" className={`${contentClassesArray[3]}`} margin={true} title="Skills" plusBtn={true}>
                            <CollapsibleMenu text="Category_1">
                                <div>Short Skill</div>
                                <div>Very very very very very long skill</div>
                                <div>Medium length skill</div>
                                <div>Medium length skill</div>
                                <div>Very very very very very long skill</div>
                            </CollapsibleMenu>
                            <CollapsibleMenu text="Category_2">
                                <div>Skill 1</div>
                                <div>Skill 2</div>
                                <div>Skill 3</div>
                            </CollapsibleMenu>
                            <CollapsibleMenu text="Category_3">
                                <div>Skill 1</div>
                                <div>Skill 2</div>
                                <div>Skill 3</div>
                            </CollapsibleMenu>
                            <h4 className={`normal`} style={{ margin: "1rem 0" }}>
                                You haven't added any skills yet...
                            </h4>
                        </ProfileContentFrame>

                        <ProfileContentFrame id="posts" className={`${contentClassesArray[4]}`} margin={true} title="Posts">

                            <div className="post-comment-container shadow">
                                <div className="post-comment-content">
                                    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM...
                                </div>
                                <div className="post-comment-btn-holder">
                                    <div className="uni-button post-comment-btn">View</div>
                                    <div className="uni-button post-comment-btn">Delete</div>
                                </div>
                            </div>

                            <div className="post-comment-container shadow">
                                <img className="post-comment-img" src={profile_icon} alt="Post image" />
                                <div className="post-comment-content">
                                    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM...
                                </div>
                                <div className="post-comment-btn-holder">
                                    <div className="uni-button post-comment-btn">View</div>
                                    <div className="uni-button post-comment-btn">Delete</div>
                                </div>
                            </div>

                            <div className="post-comment-container shadow">
                                <div className="post-comment-content">
                                    Short post
                                </div>
                                <div className="post-comment-btn-holder">
                                    <div className="uni-button post-comment-btn">View</div>
                                    <div className="uni-button post-comment-btn">Delete</div>
                                </div>
                            </div>

                            <div className="post-comment-container shadow">
                                <img className="post-comment-img" src={profile_icon} alt="Post image" />
                                <div className="post-comment-content">
                                    Short image post
                                </div>
                                <div className="post-comment-btn-holder">
                                    <div className="uni-button post-comment-btn">View</div>
                                    <div className="uni-button post-comment-btn">Delete</div>
                                </div>
                            </div>

                            <h4 className={`normal`} style={{ margin: "1rem 0" }}>
                                You haven't posted anything yet...
                            </h4>
                        </ProfileContentFrame>

                        <ProfileContentFrame id="comments" className={`${contentClassesArray[5]}`} margin={true} title="Comments">
                            <div className="post-comment-container shadow">
                                <div className="post-comment-content">
                                    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM...
                                </div>
                                <div className="post-comment-btn-holder">
                                    <div className="uni-button post-comment-btn">View</div>
                                    <div className="uni-button post-comment-btn">Delete</div>
                                </div>
                            </div>

                            <div className="post-comment-container shadow">
                                <div className="post-comment-content">
                                    Short comment
                                </div>
                                <div className="post-comment-btn-holder">
                                    <div className="uni-button post-comment-btn">View</div>
                                    <div className="uni-button post-comment-btn">Delete</div>
                                </div>
                            </div>

                            <h4 className={`normal`} style={{ margin: "1rem 0" }}>
                                You haven't commented on anything yet...
                            </h4>
                        </ProfileContentFrame>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile; 