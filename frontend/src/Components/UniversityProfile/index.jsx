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
import {useMessage} from "../../Context/context";
import AttachImage from "../Forms/AttachImage";
import DoubleInputWrap from "../Forms/DoubleInputWrap";
import SelectorInput from "../Forms/SelectorInput";
import ImageGallery from "./ImageGallery";
import AdminList from "./AdminList";
import {CSSTransition} from "react-transition-group";
import StudentList from "./StudentList";
import Application from "./Application";
import ApplicationsSlider from "./ApplicationsSlider";

export default function UniversityProfile(props) {
    const {token, userData} = useAuthState()
    const [message, setMessage] = useMessage()
    let urlParams = useParams()
    const [isAdmin, setIsAdmin] = useState(false)

    // PAGE STATES
        // General Profile Data
    const [universityData, setUniversityData] = useState({})

        // Pictures Page
    const [pictureItems, setPictureItems] = useState([])

        // Students Page
    const [studentItems, setStudentItems] = useState([])
    const [applicationsToggle, setApplicationsToggle] = useState(false)
	const [applicationsList, setApplicationsList] = useState(<></>)

        // Admins Page
    const [adminItems, setAdminItems] = useState([])

        // Posts Page
    const [postItems, setPostItems] = useState([])

        // Comments Page
    const [commentItems, setCommentItems] = useState([])

    // FORM STATES
        // University Info Form
    const [uniName, setUniName] = useState("")
    const [uniDescription, setUniDescription] = useState("")
    const [uniWebsite, setUniWebsite] = useState("")
    const [uniVideo, setUniVideo] = useState("")
    const [uniImage, setUniImage] = useState("")
    const [uniCountry, setUniCountry] = useState("")
    const [uniCity, setUniCity] = useState("")
    const [uniStudentRange, setUniStudentRange] = useState("")

        // Add Pictures Form
    const [newImage, setNewImage] = useState("")
    const [uniImages, setUniImages] = useState([])

        // Admins Form
    const [forceReload, setForceReload] = useState(false)

    // CSS stuff
    const [menuClassesArray, setMenuClassesArray] = useState(["active-menu-item", "", "", "", "", ""]);
    const [contentClassesArray, setContentClassesArray] = useState(["", "hidden", "hidden", "hidden", "hidden", "hidden"]);

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

            //TODO: Uni pictures

            // case "pictures":
            //     changeActiveItem(1);
            //     break;

            case "students":
                changeActiveItem(1);
                break;

            case "applications":
                changeActiveItem(2);
                break;

            case "admins":
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

    //
    useEffect(()=>{
        if (Object.keys(universityData).length > 0 && userData) {
            setIsAdmin(universityData.admins.includes(userData.url))
        }
    },[universityData, userData])

    // load in initial data
    useEffect(async () => {
        let data;
        try {
            data = await apiCall(`universities/${urlParams.id}`, token, {method: "GET"})
            setUniversityData(data)
            setUniName(data.name)
            setUniDescription(data.description)
            setUniWebsite(data.website_url)
            setUniVideo(data.video_url)
            setUniStudentRange(data.student_range)
            setUniCountry(data.country)
            setUniCity(data.city)
        } catch (e) {
            setMessage(`api call on universities/id failed: ${e}`)
        }

        // TODO: Uni posts
        // try {
        //     const posts = await apiCall(`posts?uni_owner=${data.url}&`, token, {method: "GET"})
        //     console.table(posts)
        //     let newPostItems = []
        //     let keyIdx = 0
        //     for (const post of posts.results) {
        //         newPostItems.push(<PostCommentContainer content={post.content} key={keyIdx}/>)
        //         keyIdx++;
        //     }
        //     setPostItems(newPostItems)
        // } catch (e) {
        //     setMessage(e)
        // }

        // try {
        //     const comments = await apiCall(`comments?uni_owner=${data.url}&`, token, {method: "GET"})
        //     let newCommentItems = []
        //     let keyIdx = 0
        //     for (const comment of comments.results) {
        //         newCommentItems.push(<PostCommentContainer content={comment.content} key={keyIdx}/>)
        //         keyIdx++;
        //     }
        //     setCommentItems(newCommentItems)
        // } catch (e) {
        //     setMessage(e)
        // }

        //TODO: uni images

        // try {
        //     let images = await apiCall(`university-pictures?owner=${universityData.url}`, token, {method: "GET"})
        //     setUniImages(images.results)
        // } catch (e) {
        //     setMessage(e)
        // }

    }, [])


    async function updateBasicInfo(e) {
        e.preventDefault()
        let payload = {
            "name": uniName,
            "description": uniDescription,
            "website_url": uniWebsite,
            "video_url": uniVideo,
            "student_range": uniStudentRange,
            "country": uniCountry,
            "city": uniCity,
        }

        if (uniImage) {
            payload["image"] = uniImage
        }
        const params = {
            payload: payload,
            method: "PATCH",
            fullUrl: true
        }

        try {
            const newData = await apiCall(universityData.url, token, params)
            setUniversityData(newData)
        } catch (e) {
            setMessage(`error in update basic info api call: ${e}`)
        } finally {
            setPopupClasses()
            setUniImage("")
        }
    }

    //TODO: uni pictures

    // async function postPicture(e){
    //     setPopupClasses2()
    //     e.preventDefault()
    //     const params = {
    //         "method": "POST",
    //         "payload": {"image": newImage, "owner": universityData.url}
    //     }
    //     try {
    //         await apiCall("uni-pictures", token, params)
    //     } catch (e) {
    //         setMessage(e)
    //     }
    // }

    async function seeApplications(userUrl, toggle) {
        console.log(`userURl is: ${userUrl}`)
        toggle(true)
        const user = await apiCall(userUrl, token, {method:"GET", fullUrl:true})
        const applications = user.applications
		try {
			if (applications.length === 0) {
				setMessage("No applications made yet :(");
				return;
			}

			const newApplicationsList = [];
			for (const applicationUrl of applications) {
                const application = await apiCall(applicationUrl, token, {method:"GET", fullUrl:true})
				newApplicationsList.push(
					<Application {...application}/>
				);
			}
			setApplicationsList(
				<ApplicationsSlider first_name={user.first_name} last_name={user.last_name}
                                    closeEvent={(e) => {toggle(false)}}>
					{newApplicationsList}
				</ApplicationsSlider>
			);
		} catch (e) {
			setMessage(`error in showApplicants: ${e}`);
		}
	}

    return (<>
        <NavMenu/>

        <div className={`main-content`}>
            <div className={`profile`}>

                <PopupForm title="Edit uni information" popupClasses={popupClasses}
                           setPopupClasses={setPopupClasses}
                           handleSubmit={updateBasicInfo}>
                    <DoubleInputWrap>
                        <BasicInput label={"uni Name"} required={true} value={uniName} setter={setUniName}/>
                        <BasicInput label={"Country"} required={false} value={uniCountry}
                                    setter={setUniCountry}/>
                    </DoubleInputWrap>

                    <DoubleInputWrap>
                        <BasicInput label={"City"} required={false} value={uniCity}
                            setter={setUniCountry}/>
                        <SelectorInput label={"Size"} required={false} value={uniStudentRange}
                                       setter={setUniStudentRange}
                                       choices={{
                                           "<5000 students": 1, "5000-15000 students": 2, ">15000 students": 3
                                       }}/>
                        
                    </DoubleInputWrap>

                    <DoubleInputWrap>
                        <BasicInput label={"Website URL"} required={false} value={uniWebsite}
                                    setter={setUniWebsite}/>
                        <BasicInput label={"Video URL"} required={false} value={uniVideo} setter={setUniVideo}/>
                    </DoubleInputWrap>

                    <TextArea label={"Summary"} required={false} value={uniDescription}
                              setter={setUniDescription}/>

                    <AttachImage label={"Upload Profile Picture"} required={false} image={uniImage}
                                 setImage={setUniImage}/>

                </PopupForm>
                
                {/*TODO: add uni picture*/}
                {/*<PopupForm title="Add a Picture" popupClasses={popupClasses2} setPopupClasses={setPopupClasses2}*/}
                {/*           handleSubmit={postPicture}>*/}
                
                {/*    <AttachImage label={"Upload Picture"} required={false} image={newImage} setImage={setNewImage}/>*/}
                
                {/*</PopupForm>*/}

                {/*SIDE BAR*/}
                <div className={`main-profile-menu`}>
                    <div className={`fixed-menu`}>

                        <NavLink to="#basic-info" className={`profile-menu-item ${menuClassesArray[0]}`}
                                 onClick={e => changeActiveItem(0)}>
                            <div className={`item-text`}>University Information</div>
                        </NavLink>

                        <NavLink to="#students" className={`profile-menu-item ${menuClassesArray[1]}`}
                                 onClick={e => changeActiveItem(1)}>
                            <div className={`item-text`}>Students</div>
                        </NavLink>

                        {isAdmin &&
                            <NavLink to="#admins" className={`profile-menu-item ${menuClassesArray[3]}`}
                                     onClick={e => changeActiveItem(3)}>
                                <div className={`item-text`}>Admins</div>
                            </NavLink>
                        }

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

                {/*MAIN CONTENT*/}
                <div className={`profile-content-container`}>

                    <ProfileContentFrame id="basic-info" className={`${contentClassesArray[0]}`}>
                        <div className={`profile-banner`}>
                            <img className={`profile-banner-pfp`} src={universityData.image} alt="Profile icon"/>
                        </div>
                        <div className={`profile-basic-info`}>
                            {isAdmin &&
                                <img className={`basic-info-toggler`} src={pencil_icon} alt="Pen icon"
                                     onClick={setPopupClasses}/>
                            }
                            <h3>
                                {universityData.name}
                            </h3>
                            <p>{universityData.student_range_verbose}</p>
                            <p>
                                <span className={`gray-text`}>{universityData.country}</span>
                                <span className={`gray-text`}> · </span>
                                <span className={`gray-text`}>{universityData.city}</span>
                                <span className={`gray-text`}> · </span>
                                <NavLink to={universityData.website || "#"} className={`website-link`}>Website<img
                                    src={redirect_icon} alt="Redirect icon"/>
                                </NavLink>
                            </p>
                            <h3>
                                Summary
                            </h3>
                            <p>{universityData.description || "You haven't added a summary yet..."}</p>
                        </div>
                    </ProfileContentFrame>

                    {/*Show grid of applications for a single user*/}
                    {applicationsToggle && applicationsList}

                    <ProfileContentFrame id="students" className={`${contentClassesArray[1]}`} margin={true}
                                         title="Students"
                                         plusBtn={false} onClick={setPopupClasses2}>
                        <CSSTransition
                            in={!!universityData}
                            unmountOnExit
                            timeout={500}
                            classNames={"admin-list-transition"}
                        >
                            <div>
                                {isAdmin &&
                                    <div className={`add-new-field custom-scroll`}>
                                        <StudentList
                                            title="Add a new student:"
                                            option="ADD"
                                            forceReload={[forceReload, setForceReload]}
                                            entityUrl={universityData.url}
                                            entity={"university"}
                                            editable={isAdmin}
                                        />
                                    </div>
                                }

                                <div className={`add-new-field custom-scroll`}>
                                    <StudentList
                                        title={`Students:`}
                                        option="REMOVE"
                                        forceReload={[forceReload, setForceReload]}
                                        entityUrl={universityData.url}
                                        entity={"university"}
                                        editable={isAdmin}
                                        seeApplications={seeApplications}
                                        setApplicationsToggle={setApplicationsToggle}
                                    />
                                </div>

                            </div>
                        </CSSTransition>
                    </ProfileContentFrame>

                    <ProfileContentFrame id="admins" className={`${contentClassesArray[3]}`} margin={true}
                                         title="Admins"
                                         plusBtn={isAdmin} onClick={setPopupClasses2}>

                    <CSSTransition
                            in={!!universityData}
                            unmountOnExit
                            timeout={500}
                            classNames={"admin-list-transition"}
                        >
                            <div>

                                <div className={`add-new-field custom-scroll`}>
                                    <AdminList
                                        title="Add a new admin:"
                                        option="ADD"
                                        forceReload={[forceReload, setForceReload]}
                                        entityUrl={universityData.url}
                                        entity={"university"}
                                    />
                                </div>

                                                                <div className={`add-new-field custom-scroll`}>
                                    <AdminList
                                        title={`Manage admins:`}
                                        option="REMOVE"
                                        forceReload={[forceReload, setForceReload]}
                                        entityUrl={universityData.url}
                                        entity={"university"}
                                    />
                                </div>

                            </div>
                    </CSSTransition>
                    </ProfileContentFrame>


                    <ProfileContentFrame id="posts" className={`${contentClassesArray[4]}`} margin={true} title="Posts">

                        To be implemented...
                        {/*{postItems}*/}

                        {/*{postItems || <h4 className={`normal`} style={{margin: "1rem 0"}}>*/}
                        {/*    You haven't posted anything yet...*/}
                        {/*</h4>}*/}

                    </ProfileContentFrame>

                    <ProfileContentFrame id="comments" className={`${contentClassesArray[5]}`} margin={true}
                                         title="Comments">
                        To be implemented...
                        {/*{commentItems}*/}

                        {/*{commentItems || <h4 className={`normal`} style={{margin: "1rem 0"}}>*/}
                        {/*    You haven't commented on anything yet...*/}
                        {/*</h4>}*/}

                    </ProfileContentFrame>

                </div>

            </div>
        </div>
    </>);
}
