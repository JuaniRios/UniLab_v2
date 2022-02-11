import React, {useEffect, useReducer, useState} from "react";
import {NavLink} from "react-router-dom";
import NavMenu from "../NavMenu";
import "./index.css";
// ICONS
import profile_icon from "../../Assets/img/profile.png";
import pencil_icon from "../../Assets/img/profile/pencil.png";
import redirect_icon from "../../Assets/img/profile/redirect.svg";
// OTHER COMPONENTS
import ProfileContentFrame from "./ProfileContentFrame";
import ProfileContentItem from "./ProfileContentItem";
import default_education_icon from "../../Assets/img/defaults/university.jpg";
import CollapsibleMenu from "../CollapsibleMenu";
import PopupForm from "../Forms/PopupForm";
import BasicInput from "../Forms/BasicInput";
import TextArea from "../Forms/TextArea";
import PostCommentContainer from "./PostCommentContainer";
import {useAuthState} from "../../Context";
import apiCall from "../HelperFunctions/apiCall";

function Profile(props) {

    document.title = "Profile - UniLab";
    const {userData, token} = useAuthState()
    const [userInformation, setUserInformation] = useState({})
    const [educationItems, setEducationItems] = useState([])
    const [experienceItems, setExperienceItems] = useState([])
    const [skillItems, setSkillItems] = useState([])
    const [postItems, setPostItems] = useState([])
    const [commentItems, setCommentItems] = useState([])

    const [menuClassesArray, setMenuClassesArray] = useState(["active-menu-item", "", "", "", "", ""]);
    const [contentClassesArray, setContentClassesArray] = useState(["", "hidden", "hidden", "hidden", "hidden", "hidden"]);

    // FORM STATES

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
        } else {
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

    if (popupClasses[1] === "hidden" && popupClasses2[1] === "hidden" && popupClasses3[1] === "hidden" && popupClasses4[1] === "hidden") {
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

    function readAndChangeSkills(skillList){
        let skills = {}
        for (const [i, skill] of skillList.entries()) {
            const cat = skill["category"]
            skills[cat]= skills[cat] || []
            const skill_item = <div key={i}>{skill["skill"]}</div>
            skills[cat].push(skill_item)
        }
        // do the same as with education and experience
        let newSkillItems = []
        let i = 0
        for (const cat in skills) {
            newSkillItems.push(<CollapsibleMenu text={cat} skills={skills[cat]} key={i}/>)
            i++;
        }
        setSkillItems(newSkillItems)
    }
    useEffect( () => {
        apiCall(`user-data?user=${userData.url}&`, token, {method: "GET"}).then(data => {
                let info = data.results[0]
                setUserInformation(info)
                setEditInfoHeadline(info["occupation"])
                setEditInfoLocation(info["location"])
                setEditInfoWebsite(info["website"])
                setEditInfoSummary(info["biography"])

                // create jsx tag for each entry in the education data list
                let newEducationItems = info["education_data"].map((entry, index) => {
                    return <ProfileContentItem {...entry} key={index}/>
                })
                // update state containing all education tags
                setEducationItems(newEducationItems)

                // do the same with experience
                let newExperienceItems = info["experience_data"].map( (entry, index) => {
                    return <ProfileContentItem {...entry} key={index}/>
                })
                setExperienceItems(newExperienceItems)

                // sort skills by category
                readAndChangeSkills(info["skill_data"])

        })

        let postCommentIdx = 0
         apiCall(`posts?user=${userData.url}&`, token, {method: "GET"}).then(data => {
             const posts = data.results
             let newPostItems = []
             for (const post of posts) {
                 newPostItems.push(<PostCommentContainer content={post.content} key={postCommentIdx}/>)
                 postCommentIdx++;
             }
             setPostItems(newPostItems)

         })

        apiCall(`comments?user=${userData.url}&`, token, {method: "GET"}).then(data => {
             const comments = data.results
             let newCommentItems = []
             for (const comment of comments) {
                 newCommentItems.push(<PostCommentContainer content={comment.content} key={postCommentIdx}/>)
                 postCommentIdx++;
             }
             setCommentItems(newCommentItems)

         })
    }, [])

    // useEffect( () => {console.log(editInfoSummary)}, [editInfoSummary])

    function updateBasicInfo(e){
        e.preventDefault()
        let payload = {
            "biography": editInfoSummary,
            "location": editInfoLocation,
            "website": editInfoWebsite,
            "occupation": editInfoHeadline
        }
        const params = {
            payload: payload,
            method: "PATCH",
            fullUrl: true
        }

        apiCall(userInformation.url, token, params).then(data => {
            setUserInformation(data)
        }).catch(error => {console.log(error)})
        setPopupClasses()
    }

    function createNewEducation(e){
        e.preventDefault()
        let payload = {
            "institution": eduInstitution,
            "degree": eduDegree,
            "start_date": eduSDate,
            "end_date": eduEDate,
            "description": eduDesc
        }
        const params = {
            payload: payload,
            method: "POST",
        }
        apiCall("education-data", token, params).catch(error => {
            alert(error)
        }).then(data => {
            setUserInformation(prevState => {
                prevState["education_data"] = data
                return prevState
            })
            let newItem = <ProfileContentItem {...data} key={educationItems.length}/>
            let newEducationItems = educationItems.concat(newItem)
            // update state containing all education tags
            setEducationItems(newEducationItems)
        })
        setPopupClasses2()
    }

    function createNewExperience(e){
    e.preventDefault()
    let payload = {
        "company": expCompany,
        "title": expJTitle,
        "start_date": expSDate,
        "end_date": expEDate,
        "description": expDesc
    }
    const params = {
        payload: payload,
        method: "POST",
    }
    apiCall("experience-data", token, params).catch(error => {
        alert(error)
    }).then(data => {
        setUserInformation(prevState => {
            prevState["education_data"] = data
            return prevState
        })
        let newItem = <ProfileContentItem {...data} key={experienceItems.length}/>
        let newExperienceItems = experienceItems.concat(newItem)
        // update state containing all education tags
        setExperienceItems(newExperienceItems)
    })
    setPopupClasses3()
    }

   function createNewSkill(e){
    e.preventDefault()

    let payload = {
        "category": skillCategory[0].toUpperCase()+skillCategory.slice(1), // capitalize first letter
        "skill": skillSkill[0].toUpperCase()+skillSkill.slice(1)
    }
    setSkillCategory("")
    setSkillSkill("")
    const params = {
        payload: payload,
        method: "POST",
    }
    apiCall("skill-data", token, params).catch(error => {
        alert(error)
    }).then(data => {
        const newSkillList = userInformation["skill_data"].concat(data)
        setUserInformation(prevState => {
            prevState["skill_data"] = newSkillList
            return prevState
        })
        readAndChangeSkills(newSkillList)
    })
    setPopupClasses4()
    }


    return (
        <>
            <NavMenu/>
            <div className={`main-content`}>
                <div className={`profile`}>

                    <PopupForm title="Edit your information" popupClasses={popupClasses} setPopupClasses={setPopupClasses}
                        handleSubmit={updateBasicInfo}>

                        <BasicInput name="edit-info-headline" type="text" width="100%" label="Headline"
                            value={editInfoHeadline} setter={setEditInfoHeadline} required="no"/>

                        <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
                            <BasicInput name="edit-info-location" type="text" width="47%" label="Location"
                                value={editInfoLocation} setter={setEditInfoLocation} required="no"/>
                            <BasicInput name="edit-info-website" type="text" width="47%" label="Website"
                                value={editInfoWebsite} setter={setEditInfoWebsite} required="no"/>
                        </div>

                        <TextArea width="100%" label="Summary" value={editInfoSummary} setter={setEditInfoSummary}
                            rows="5" menuTop="20%" required="no"/>

                    </PopupForm>

                    <PopupForm title="Add Education" popupClasses={popupClasses2} setPopupClasses={setPopupClasses2}
                        handleSubmit={createNewEducation}>

                        <BasicInput name="add-education-institution" type="text" width="100%" label="Institution"
                            value={eduInstitution} setter={setEduInstitution} required="yes"/>
                        <BasicInput name="add-education-degree" type="text" width="100%" label="Degree"
                            value={eduDegree} setter={setEduDegree} required="yes"/>

                        <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
                            <BasicInput name="add-education-start-date" type="date" width="47%" label="Start Date"
                                value={eduSDate} setter={setEduSDate} required="special"/>
                            <BasicInput name="add-education-end-date" type="date" width="47%" label="End Date"
                                value={eduEDate} setter={setEduEDate} required="special"/>
                        </div>

                        <TextArea width="100%" label="Desciption" value={eduDesc} setter={setEduDesc}
                            rows="5" menuTop="20%" required="yes"/>

                    </PopupForm>

                    <PopupForm title="Add Experience" popupClasses={popupClasses3} setPopupClasses={setPopupClasses3}
                        handleSubmit={createNewExperience}>

                        <BasicInput name="add-experience-company" type="text" width="100%" label="Company"
                            value={expCompany} setter={setExpCompany} required="yes"/>
                        <BasicInput name="add-experience-job-title" type="text" width="100%" label="Job Title"
                            value={expJTitle} setter={setExpJTitle} required="yes"/>

                        <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
                            <BasicInput name="add-experience-start-date" type="date" width="47%" label="Start Date"
                                value={expSDate} setter={setExpSDate} required="special"/>
                            <BasicInput name="add-experience-end-date" type="date" width="47%" label="End Date"
                                value={expEDate} setter={setExpEDate} required="special"/>
                        </div>

                        <TextArea width="100%" label="Desciption" value={expDesc} setter={setExpDesc}
                            rows="5" menuTop="20%" required="yes"/>

                    </PopupForm>

                    <PopupForm title="Add Skill" popupClasses={popupClasses4} setPopupClasses={setPopupClasses4}
                        handleSubmit={createNewSkill}>

                        <BasicInput name="add-skill-category" type="text" width="100%" label="Category"
                            value={skillCategory} setter={setSkillCategory} required="yes"/>
                        <BasicInput name="add-skill-skill" type="text" width="100%" label="Skill"
                            value={skillSkill} setter={setSkillSkill} required="yes"/>

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
                                <img className={`profile-banner-pfp`} src={userData.image} alt="Profile icon"/>
                            </div>
                            <div className={`profile-basic-info`}>
                                <img className={`basic-info-toggler`} src={pencil_icon} alt="Pen icon" onClick={setPopupClasses}/>
                                <h3>
                                    {userData.first_name} {userData.last_name}
                                </h3>
                                <p>{userInformation.occupation}</p>
                                <p>
                                    <span className={`gray-text`}>{userInformation.location}</span>
                                    <span className={`gray-text`}> · </span>
                                    <NavLink to={userInformation.website || "#" } className={`website-link`}>Website<img src={redirect_icon} alt="Redirect icon"/>
                                    </NavLink>
                                </p>
                                <h3>
                                    Summary
                                </h3>
                                <p>{userInformation.biography || "You haven't added a summary yet..."}</p>
                            </div>
                        </ProfileContentFrame>

                        <ProfileContentFrame id="education" className={`${contentClassesArray[1]}`} margin={true} title="Education"
                            plusBtn={true} onClick={setPopupClasses2}>
                            {educationItems}
                            {educationItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                                You haven't added any education yet...
                                                            </h4>
                            }

                        </ProfileContentFrame>

                        <ProfileContentFrame id="experience" className={`${contentClassesArray[2]}`} margin={true} title="Experience"
                            plusBtn={true} onClick={setPopupClasses3}>
                            {experienceItems}
                            {experienceItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                                You haven't added any experience yet...
                                                            </h4>
                            }

                        </ProfileContentFrame>

                        <ProfileContentFrame id="skills" className={`${contentClassesArray[3]}`} margin={true} title="Skills"
                            plusBtn={true} onClick={setPopupClasses4}>

                            {skillItems}
                            {skillItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                            You haven't added any skills yet...
                                                        </h4>}

                        </ProfileContentFrame>

                        <ProfileContentFrame id="posts" className={`${contentClassesArray[4]}`} margin={true} title="Posts">

                            {postItems}

                            {postItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                            You haven't posted anything yet...
                                                       </h4>}

                        </ProfileContentFrame>

                        <ProfileContentFrame id="comments" className={`${contentClassesArray[5]}`} margin={true} title="Comments">
                            {commentItems}

                            {commentItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                              You haven't commented on anything yet...
                                                          </h4>}

                        </ProfileContentFrame>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Profile; 