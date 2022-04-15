import React, {useEffect, useReducer, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
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
import urlToPk from "../HelperFunctions/urlToPk";
import {useMessage} from "../../Context/context";
import AttachImage from "../Forms/AttachImage";

function Profile(props) {
    let urlParams = useParams()
    const [message, setMessage] = useMessage();
    document.title = "Profile - UniLab";
    const {userData, token} = useAuthState()
    const [editable, setEditable] = useState(false)
    const [targetUser, setTargetUserData] = useState("")
    const [userInformation, setUserInformation] = useState({})

    // React components as content of each menu
    const [externalProfileItems, setExternalProfileItems] = useState([])
    const [educationItems, setEducationItems] = useState([])
    const [universityCourseItems, setUniversityCourseItems] = useState([])
    const [certificationItems, setCertificationItems] = useState([])
    const [experienceItems, setExperienceItems] = useState([])
    const [skillItems, setSkillItems] = useState([])
    const [postItems, setPostItems] = useState([])
    const [commentItems, setCommentItems] = useState([])

    // css classes for displaying components
    const [menuClassesArray, setMenuClassesArray] = useState(["active-menu-item", "", "", "", "", ""]);
    const [contentClassesArray, setContentClassesArray] = useState(["", "hidden", "hidden", "hidden", "hidden", "hidden"]);

    // FORM STATES

    // basic information
    const [editInfoHeadline, setEditInfoHeadline] = useState('');
    const [editInfoLocation, setEditInfoLocation] = useState('');
    const [editInfoWebsite, setEditInfoWebsite] = useState('');
    const [editInfoSummary, setEditInfoSummary] = useState('');

    // external profiles
    const [externalProfileTitle,setExternalProfileTitle] = useState("");
    const [externalProfileURL,setExternalProfileURL] = useState("");

    // education
    const [eduInstitution, setEduInstitution] = useState('');
    const [eduDegree, setEduDegree] = useState('');
    const [eduSDate, setEduSDate] = useState('');
    const [eduEDate, setEduEDate] = useState('');
    const [eduDesc, setEduDesc] = useState('');

    // university courses
    const [course, setCourse] = useState("");
    const [ects, setEcts] = useState("");
    const [courseDesc, setCourseDesc] = useState("");

    // certifications
    const [certificationTitle, setCertificationTitle] = useState("");
    const [certificationDescription, setCertificationDescription] = useState("");
    const [certificationImage, setCertificationImage] = useState("");

    // experience
    const [expCompany, setExpCompany] = useState('');
    const [expJTitle, setExpJTitle] = useState('');
    const [expSDate, setExpSDate] = useState('');
    const [expEDate, setExpEDate] = useState('');
    const [expDesc, setExpDesc] = useState('');

    // skills
    const [skillCategory, setSkillCategory] = useState('');
    const [skillSkill, setSkillSkill] = useState('');

    // return visibility css classes for the opposite of what it is now on a single component
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

    // visibility classes for form popups
    const [popupClasses1, setPopupClasses1] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);
    const [popupClasses2, setPopupClasses2] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);
    const [popupClasses3, setPopupClasses3] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);
    const [popupClasses4, setPopupClasses4] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);
    const [popupClasses5, setPopupClasses5] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);
    const [popupClasses6, setPopupClasses6] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);
    const [popupClasses7, setPopupClasses7] = useReducer(changePopupClasses, ["popup-closed", "hidden"]);

    // changes which menu should be display at the time by using an array of css classes
    function changeActiveItem(n) {
        let pseudoArray = ["", "", "", "", "", "", "", "", ""];
        let pseudoArray2 = ["hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden"];
        pseudoArray[n] = "active-menu-item";
        pseudoArray2[n] = "";
        setMenuClassesArray(pseudoArray);
        setContentClassesArray(pseudoArray2);
    }

    // dunno why this is here
    if (popupClasses1[1] === "hidden" && popupClasses2[1] === "hidden" && popupClasses3[1] === "hidden"
        && popupClasses4[1] === "hidden" && popupClasses5[1] === "hidden" && popupClasses6[1] === "hidden"
        && popupClasses7[1] === "hidden") {
        document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
        document.body.classList.remove("noscroll");
    }

    // dont remember
    useEffect(()=>{setEditable(urlToPk(userData.url) === urlParams.id)}, [userData, urlParams])

    // get the correct profile based on the url
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

            case "community":
                changeActiveItem(3);
                break;

            default:
                changeActiveItem(0);
                break;
        }
    }, [])

    // data manipulation before submitting data to api on skills
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

    // initial api call to get all the data from the user
    useEffect( async () => {
        const targetUser = await apiCall(`users/${urlParams.id}`, token, {method: "GET"})
        setTargetUserData(targetUser)
        apiCall(`user-data?user=${targetUser.url}&`, token, {method: "GET"}).then(data => {
                let info = data.results[0]
                setUserInformation(info)
                setEditInfoHeadline(info["occupation"])
                setEditInfoLocation(info["location"])
                setEditInfoWebsite(info["website"])
                setEditInfoSummary(info["biography"])

                // create component for each entry on external profiles
                let newExternalProfileItems = info["external_profiles"].map((entry, index) => {
                    return <ProfileContentItem type="external profile" {...entry} key={index}/>
                })
                // update state containing all components
                setExternalProfileItems(newExternalProfileItems)

                let newEducationItems = info["education_data"].map((entry, index) => {
                    return <ProfileContentItem type="education" {...entry} key={index}/>
                })
                setEducationItems(newEducationItems)

                let newUniversityCourseItems = info["university_courses"].map((entry, index) => {
                    let ects = ""
                    if (entry.ects) {
                        ects = "ECTS: " + entry.ects
                    }

                    const subtitle = ects ? <p>{ects} <br/> {entry.description}</p> : entry.description

                    return <ProfileContentItem title={entry.course} subTitle={subtitle} key={index}/>
                })
                // update state containing all components
                setUniversityCourseItems(newUniversityCourseItems)

                let newCertificationItems = info["certifications"].map((entry, index) => {
                    let proof = ""
                    if (entry.proof) {
                        proof = <a href={entry.proof} target="_blank" rel="noopener noreferrer">Proof</a>
                    }
                    const subtitle = proof ? <p>{proof} <br/> {entry.description}</p> : entry.description
                    return <ProfileContentItem title={entry.title} subTitle={subtitle} key={index}/>
                })
                // update state containing all components
                setCertificationItems(newCertificationItems)

                let newExperienceItems = info["experience_data"].map( (entry, index) => {
                    return <ProfileContentItem type="experience" {...entry} key={index}/>
                })
                setExperienceItems(newExperienceItems)

                // sort skills by category
                readAndChangeSkills(info["skill_data"])

        })

        let postCommentIdx = 0
         apiCall(`posts?user=${targetUser.url}&`, token, {method: "GET"}).then(data => {
             const posts = data.results
             let newPostItems = []
             for (const post of posts) {
                 newPostItems.push(<PostCommentContainer content={post.content} key={postCommentIdx}/>)
                 postCommentIdx++;
             }
             setPostItems(newPostItems)

         })

        apiCall(`comments?user=${targetUser.url}&`, token, {method: "GET"}).then(data => {
             const comments = data.results
             let newCommentItems = []
             for (const comment of comments) {
                 newCommentItems.push(<PostCommentContainer content={comment.content} key={postCommentIdx}/>)
                 postCommentIdx++;
             }
             setCommentItems(newCommentItems)

         })




    }, [urlParams])

    // post updated basic info from form states
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
        setPopupClasses1()
    }

    // post external profile from form states
    async function createExternalProfile(e){
        e.preventDefault()
        let payload = {
            "title": externalProfileTitle,
            "url": externalProfileURL
        }

        const params = {
            payload: payload,
            method: "POST",
        }

        try {
            const data = await apiCall("external-profiles", token, params)
        } catch (error) {
            setMessage(error)
        }

        setExternalProfileTitle("")
        setExternalProfileURL("")
        setPopupClasses2()
    }

    // post education from form states
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
            let newItem = <ProfileContentItem type="education" {...data} key={educationItems.length}/>
            let newEducationItems = educationItems.concat(newItem)
            // update state containing all education tags
            setEducationItems(newEducationItems)
        })
        setPopupClasses3()
    }

    // post university course from form states
    async function createUniversityCourse(e){
        e.preventDefault()
        let payload = {
            "course": course,
            "ects": ects,
            "description": courseDesc
        }


        const params = {
            payload: payload,
            method: "POST",
        }

        try {
            const data = await apiCall("university-courses", token, params)
        } catch (error) {
            setMessage(error)
        }
        setCourse("")
        setEcts("")
        setCourseDesc("")
        setPopupClasses4()
    }

    // post university certification from form states
    async function createCertification(e){
        e.preventDefault()
        let payload = {
            "title": certificationTitle,
            "description": certificationDescription,
            "proof": certificationImage
        }

        const params = {
            payload: payload,
            method: "POST",
        }

        try {
            const data = await apiCall("certifications", token, params)
        } catch (error) {
            setMessage(error)
        }

        setCertificationTitle("")
        setCertificationDescription("")
        setPopupClasses5()
    }

    // post experience from form states
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
            prevState["experience_data"] = data
            return prevState
        })
        let newItem = <ProfileContentItem  type="experience" {...data} key={experienceItems.length}/>
        let newExperienceItems = experienceItems.concat(newItem)
        // update state containing all education tags
        setExperienceItems(newExperienceItems)
    })
    setPopupClasses6()
    }

    // post skill from form states
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
    setPopupClasses7()
    }

    return (
    <>
        <NavMenu/>
        <div className={`main-content`}>
            <div className={`profile`}>

                <PopupForm title="Edit your information" popupClasses={popupClasses1} setPopupClasses={setPopupClasses1}
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

                <PopupForm title="Add External Profile" popupClasses={popupClasses2} setPopupClasses={setPopupClasses2}
                    handleSubmit={createExternalProfile}>

                    <BasicInput  type="text" width="100%" label="Title"
                        value={externalProfileTitle} setter={setExternalProfileTitle} required="yes"/>
                    <BasicInput type="text" width="100%" label="URL"
                        value={externalProfileURL} setter={setExternalProfileURL} required="yes"/>

                </PopupForm>

                <PopupForm title="Add Education" popupClasses={popupClasses3} setPopupClasses={setPopupClasses3}
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

                <PopupForm title="Add University Courses" popupClasses={popupClasses4} setPopupClasses={setPopupClasses4}
                    handleSubmit={createUniversityCourse}>

                    <BasicInput name="add-skill-category" type="text" width="100%" label="Course"
                        value={course} setter={setCourse} required="yes"/>
                    <BasicInput name="add-skill-category" type="text" width="100%" label="Description"
                        value={courseDesc} setter={setCourseDesc} required="yes"/>
                    <BasicInput name="add-skill-skill" type="text" width="100%" label="ECTS (optional)"
                        value={ects} setter={setEcts} required="no"/>

                </PopupForm>

                <PopupForm title="Add Certifications" popupClasses={popupClasses5} setPopupClasses={setPopupClasses5}
                    handleSubmit={createCertification}>

                    <BasicInput name="add-skill-category" type="text" width="100%" label="Title"
                        value={certificationTitle} setter={setCertificationTitle} required="yes"/>
                    <BasicInput name="add-skill-skill" type="text" width="100%" label="Description (optional)"
                        value={certificationDescription} setter={setCertificationDescription} required="yes"/>
                    <AttachImage image={certificationImage} setImage={setCertificationImage} label={"Attach proof"}/>

                </PopupForm>

                <PopupForm title="Add Experience" popupClasses={popupClasses6} setPopupClasses={setPopupClasses6}
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

                <PopupForm title="Add Skill" popupClasses={popupClasses7} setPopupClasses={setPopupClasses7}
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

                        {/*<NavLink to="#university-courses" className={`profile-menu-item ${menuClassesArray[3]}`}*/}
                        {/*    onClick={e => changeActiveItem(3)}>*/}
                        {/*    <div className={`item-text`}>University Courses</div>*/}
                        {/*</NavLink>*/}

                        {/*<NavLink to="#certifications" className={`profile-menu-item ${menuClassesArray[4]}`}*/}
                        {/*    onClick={e => changeActiveItem(4)}>*/}
                        {/*    <div className={`item-text`}>Certifications</div>*/}
                        {/*</NavLink>*/}

                        <NavLink to="#community" className={`profile-menu-item ${menuClassesArray[5]}`}
                            onClick={e => changeActiveItem(3)}>
                            <div className={`item-text`}>Community</div>
                        </NavLink>

                        {/*<NavLink to="#skills" className={`profile-menu-item ${menuClassesArray[6]}`}*/}
                        {/*    onClick={e => changeActiveItem(6)}>*/}
                        {/*    <div className={`item-text`}>Skills</div>*/}
                        {/*</NavLink>*/}

                        {/*<NavLink to="#posts" className={`profile-menu-item ${menuClassesArray[7]}`}*/}
                        {/*    onClick={e => changeActiveItem(7)}>*/}
                        {/*    <div className={`item-text`}>Posts</div>*/}
                        {/*</NavLink>*/}

                        {/*<NavLink to="#comments" className={`profile-menu-item ${menuClassesArray[8]}`}*/}
                        {/*    onClick={e => changeActiveItem(8)}>*/}
                        {/*    <div className={`item-text`}>Comments</div>*/}
                        {/*</NavLink>*/}

                    </div>
                </div>

                <div className={`profile-content-container`}>

                    <ProfileContentFrame id="basic-info" className={`${contentClassesArray[0]}`}>
                        <div className={`profile-banner`}>
                            <img className={`profile-banner-pfp`} src={targetUser.image} alt="Profile icon"/>
                        </div>
                        <div className={`profile-basic-info`}>
                            {editable && <img className={`basic-info-toggler`} src={pencil_icon} alt="Pen icon" onClick={setPopupClasses1}/>}
                            <h3>
                                {targetUser.first_name} {targetUser.last_name}
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

                    <ProfileContentFrame id="external-profiles" className={`${contentClassesArray[0]}`} margin={true}
                                         title="External Profiles" plusBtn={editable} onClick={setPopupClasses2}>
                        {externalProfileItems}
                        {experienceItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                            You haven't added any experience yet...
                                                        </h4>
                        }
                    </ProfileContentFrame>

                    <ProfileContentFrame id="education" className={`${contentClassesArray[1]}`} margin={true}
                                         title="Education" plusBtn={editable} onClick={setPopupClasses3}>
                        {educationItems}
                        {educationItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                            You haven't added any education yet...
                                                        </h4>
                        }
                    </ProfileContentFrame>

                    <ProfileContentFrame id="university-courses" className={`${contentClassesArray[1]}`} margin={true}
                                         title="University Courses" plusBtn={editable} onClick={setPopupClasses4}>
                        {universityCourseItems}
                        {experienceItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                            You haven't added any experience yet...
                                                        </h4>
                        }
                    </ProfileContentFrame>

                    <ProfileContentFrame id="certifications" className={`${contentClassesArray[1]}`} margin={true}
                                         title="Certifications" plusBtn={editable} onClick={setPopupClasses5}>
                        {certificationItems}
                        {experienceItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                            You haven't added any experience yet...
                                                        </h4>
                        }
                    </ProfileContentFrame>

                    <ProfileContentFrame id="experience" className={`${contentClassesArray[2]}`} margin={true} title="Experience"
                        plusBtn={editable} onClick={setPopupClasses6}>
                        {experienceItems}
                        {experienceItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                            You haven't added any experience yet...
                                                        </h4>
                        }
                    </ProfileContentFrame>

                    <ProfileContentFrame id="skills" className={`${contentClassesArray[2]}`} margin={true} title="Skills"
                        plusBtn={editable} onClick={setPopupClasses7}>

                        {skillItems}
                        {skillItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>
                                                        You haven't added any skills yet...
                                                    </h4>}
                    </ProfileContentFrame>

                    <ProfileContentFrame id="posts" className={`${contentClassesArray[3]}`} margin={true} title="Posts">

                        {/*{postItems}*/}

                        {/*{postItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>*/}
                        {/*                                You haven't posted anything yet...*/}
                        {/*                           </h4>}*/}

                        <h2>Work in Progress</h2>
                    </ProfileContentFrame>

                    <ProfileContentFrame id="comments" className={`${contentClassesArray[3]}`} margin={true} title="Comments">
                        {/*{commentItems}*/}

                        {/*{commentItems.length === 0 && <h4 className={`normal`} style={{margin: "1rem 0"}}>*/}
                        {/*                                  You haven't commented on anything yet...*/}
                        {/*                              </h4>}*/}

                        <h2>Work in Progress</h2>
                    </ProfileContentFrame>

                </div>

            </div>
        </div>
    </>
    );
}

export default Profile; 