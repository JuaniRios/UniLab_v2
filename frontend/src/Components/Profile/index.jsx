import React, { useEffect, useReducer, useState } from "react";
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
import PopupForm from "../Forms/PopupForm";
import BasicInput from "../Forms/BasicInput";
import TextArea from "../Forms/TextArea";

function Profile(props) {

    document.title = "Profile - UniLab";

    const [menuClassesArray, setMenuClassesArray] = useState(["active-menu-item", "", "", "", "", ""]);
    const [contentClassesArray, setContentClassesArray] = useState(["", "hidden", "hidden", "hidden", "hidden", "hidden"]);

    // FORM STATES

    const [editInfoFname, setEditInfoFname] = useState('');
    const [editInfoLname, setEditInfoLname] = useState('');
    const [editInfoHeadline, setEditInfoHeadline] = useState('');
    const [editInfoLocation, setEditInfoLocation] = useState('');
    const [editInfoWebsite, setEditInfoWebsite] = useState('');
    const [editInfoSummary, setEditInfoSummary] = useState('');

    const [eduInstitution, setEduInstitution] = useState('');
    const [eduDegree, setEduDegree] = useState('');
    const [eduSDate, setEduSDate] = useState('');
    const [eduEDate, setEduEDate] = useState('');
    const [eduDesc, setEduDesc] = useState('');

    const [expCompany, setExpCompany] = useState('');
    const [expJTitle, setExpJTitle] = useState('');
    const [expSDate, setExpSDate] = useState('');
    const [expEDate, setExpEDate] = useState('');
    const [expDesc, setExpDesc] = useState('');

    const [skillCategory, setSkillCategory] = useState('');
    const [skillSkill, setSkillSkill] = useState('');

    function changePopupClasses(initState) {
        if (initState[1] === "hidden") {
            document.getElementsByTagName("HTML")[0].classList.add("y-scroll");
            document.body.classList.add("noscroll");
            return ["popup-opened", ""];
        } 
        else {
            document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
            document.body.classList.remove("noscroll");
            return ["popup-closed", "hidden"];
        }
    }
    const [popupClasses, setPopupClasses] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);
    const [popupClasses2, setPopupClasses2] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);
    const [popupClasses3, setPopupClasses3] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);
    const [popupClasses4, setPopupClasses4] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);
    
    function changeActiveItem(n) {
        let pseudoArray = ["", "", "", "", "", ""];
        let pseudoArray2 = ["hidden", "hidden", "hidden", "hidden", "hidden", "hidden"];
        pseudoArray[n] = "active-menu-item";
        pseudoArray2[n] = "";
        setMenuClassesArray(pseudoArray);
        setContentClassesArray(pseudoArray2);
    }

    if (popupClasses[1] === "hidden" && popupClasses2[1] === "hidden" && popupClasses3[1] === "hidden" && popupClasses4[1] === "hidden")
    {
        document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
        document.body.classList.remove("noscroll");
    }

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

    return (
        <>
            <NavMenu />
            <div className={`main-content`}>
                <div className={`profile`}>

                    <PopupForm title="Edit your information" popupClasses={popupClasses} setPopupClasses={setPopupClasses}>
                        
                        <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
                            <BasicInput name="edit-info-fname" type="text" width="47%" label="First Name" 
                                value={editInfoFname} setter={setEditInfoFname} />
                            <BasicInput name="edit-info-lname" type="text" width="47%" label="Last Name" 
                                value={editInfoLname} setter={setEditInfoLname} />
                        </div>

                        <BasicInput name="edit-info-headline" type="text" width="100%" label="Headline" 
                            value={editInfoHeadline} setter={setEditInfoHeadline} required="no" />
                        
                        <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
                            <BasicInput name="edit-info-location" type="text" width="47%" label="Location" 
                                value={editInfoLocation} setter={setEditInfoLocation} required="no" />
                            <BasicInput name="edit-info-website" type="text" width="47%" label="Website" 
                                value={editInfoWebsite} setter={setEditInfoWebsite} required="no" />
                        </div>

                        <TextArea width="100%" label="Summary" message={editInfoSummary} setMessage={setEditInfoSummary} 
                            rows="5" menuTop="20%" required="no" />
                        
                    </PopupForm>

                    <PopupForm title="Add Education" popupClasses={popupClasses2} setPopupClasses={setPopupClasses2}>
                        
                        <BasicInput name="add-education-institution" type="text" width="100%" label="Institution" 
                            value={eduInstitution} setter={setEduInstitution} required="yes" />
                        <BasicInput name="add-education-degree" type="text" width="100%" label="Degree" 
                            value={eduDegree} setter={setEduDegree} required="yes" />

                        <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
                            <BasicInput name="add-education-start-date" type="date" width="47%" label="Start Date" 
                                value={eduSDate} setter={setEduSDate} required="special" />
                            <BasicInput name="add-education-end-date" type="date" width="47%" label="End Date" 
                                value={eduEDate} setter={setEduEDate} required="special" />
                        </div>

                        <TextArea width="100%" label="Desciption" message={eduDesc} setMessage={setEduDesc} 
                            rows="5" menuTop="20%" required="yes" />
                        
                    </PopupForm>

                    <PopupForm title="Add Experience" popupClasses={popupClasses3} setPopupClasses={setPopupClasses3}>
                        
                        <BasicInput name="add-experience-company" type="text" width="100%" label="Company" 
                            value={expCompany} setter={setExpCompany} required="yes" />
                        <BasicInput name="add-experience-job-title" type="text" width="100%" label="Job Title" 
                            value={expJTitle} setter={setExpJTitle} required="yes" />

                        <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
                            <BasicInput name="add-experience-start-date" type="date" width="47%" label="Start Date" 
                                value={expSDate} setter={setExpSDate} required="special" />
                            <BasicInput name="add-experience-end-date" type="date" width="47%" label="End Date" 
                                value={expEDate} setter={setExpEDate} required="special" />
                        </div>

                        <TextArea width="100%" label="Desciption" message={expDesc} setMessage={setExpDesc} 
                            rows="5" menuTop="20%" required="yes" />
                        
                    </PopupForm>

                    <PopupForm title="Add Skill" popupClasses={popupClasses4} setPopupClasses={setPopupClasses4}>
                        
                        <BasicInput name="add-skill-category" type="text" width="100%" label="Category" 
                            value={skillCategory} setter={setSkillCategory} required="yes" />
                        <BasicInput name="add-skill-skill" type="text" width="100%" label="Skill" 
                            value={skillSkill} setter={setSkillSkill} required="yes" />
                        
                    </PopupForm>

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
                                <img className={`basic-info-toggler`} src={pencil_icon} alt="Pen icon" onClick={setPopupClasses} />
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

                        <ProfileContentFrame id="education" className={`${contentClassesArray[1]}`} margin={true} title="Education" 
                            plusBtn={true} onClick={setPopupClasses2}>
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <h4 className={`normal`} style={{ margin: "1rem 0" }}>
                                You haven't added any education yet...
                            </h4>
                        </ProfileContentFrame>

                        <ProfileContentFrame id="experience" className={`${contentClassesArray[2]}`} margin={true} title="Experience" 
                            plusBtn={true} onClick={setPopupClasses3}>
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <ProfileContentItem imgSrc={default_education_icon} />
                            <h4 className={`normal`} style={{ margin: "1rem 0" }}>
                                You haven't added any experience yet...
                            </h4>
                        </ProfileContentFrame>

                        <ProfileContentFrame id="skills" className={`${contentClassesArray[3]}`} margin={true} title="Skills" 
                            plusBtn={true}  onClick={setPopupClasses4}>
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