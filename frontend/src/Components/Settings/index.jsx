import React, { useEffect, useRef, useState } from "react";
import NavMenu from "../NavMenu";
import "./index.css";

import account_img from "../../Assets/img/account.png";
import password_img from "../../Assets/img/password.png";

import AttachImage from "../Forms/AttachImage";
import BasicInput from "../Forms/BasicInput";
import postContent from "../HelperFunctions/postContent";
import PostContainer from "../Community/PostContainer";
import apiCall from "../HelperFunctions/apiCall";
import { useAuthState } from "../../Context";
import { NavLink } from "react-router-dom";

import scrollTo from "../HelperFunctions/scrollTo";
import isScrolledToElement from "../HelperFunctions/isScrolledToElement";

export default function Settings(props) {

    document.title = "Settings - UniLab";
    document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
    document.body.classList.remove("noscroll");

    const { token, userData } = useAuthState()
    const [image, setImage] = useState("");
    const [spanText, setSpanText] = useState("Attach an image");

    // Input states

    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [email, setEmail] = useState(userData.email);
    const [currPass, setCurrPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmNewPass, setConfirmNewPass] = useState("");

    // Menu refs

    const changePass = useRef(null);
    const generalInfo = useRef(null);

    // Menu states

    const [generalInfoState, setGeneralInfoState] = useState("active-settings-item");
    const [changePassState, setChangePassState] = useState("");

    useEffect(() => {
        document.addEventListener('scroll', scrollToMenu);
        return () => {
            document.removeEventListener('scroll', scrollToMenu);
        }
    }, [])

    function scrollToMenu(e) {
        if (isScrolledToElement(changePass.current)) {
            setChangePassState("active-settings-item");
            setGeneralInfoState("");
        }
        if (isScrolledToElement(generalInfo.current)) {
            setChangePassState("");
            setGeneralInfoState("active-settings-item");
        }
    }

    function toggleMenuOption(contentRef, menuBtnState) {
        setChangePassState("");
        setGeneralInfoState("");
        scrollTo(contentRef);
        menuBtnState("active-settings-item");
    }

    async function changeInfo(e) {
        e.preventDefault()
        let payload = {
            first_name: firstName,
            last_name: lastName,
            email: email
        }
        const params = {
            method: "PATCH",
            payload: payload,
            fullUrl: true
        }
        if (typeof (image) !== "string") {
            payload["image"] = image;
        }

        try {
            const updatedInfo = await apiCall(userData.url, token, params)
            setImage(updatedInfo.image)
            setSpanText("Attach an image")
        } catch (e) {
            console.log(e)
        }
        window.location.reload()
    }

    async function changePassword(e) {
        e.preventDefault()
        let payload = {
            "old_password": currPass,
            "new_password": newPass,
        }
        const params = {
            payload: payload,
            method: "PUT"
        }

        try {
            const updatedInfo = await apiCall("change-password", token, params)
        } catch (e) {
            console.log("error in changePassword")
            console.log(e.message)
        }
    }

    return (
        <>
            <NavMenu />
            <div className={`main-content`}>
                <div className={`settings`}>
                    <div className={`settings-menu`}>

                        <div className={`settings-menu-nav`}>
                            <NavLink to="#general-info" className={`settings-menu-item ${generalInfoState} disabled-link`}
                                onClick={e => toggleMenuOption(generalInfo.current, setGeneralInfoState)}>
                                <img className={`settings-menu-img noselect`} src={account_img} alt="Account image" />
                                <span>General Info</span>
                            </NavLink>

                            <NavLink to="#change-password" className={`settings-menu-item ${changePassState} disabled-link`}
                                onClick={e => toggleMenuOption(changePass.current, setChangePassState)}>
                                <img className={`settings-menu-img noselect`} src={password_img} alt="Change password image" />
                                <span>Change Password</span>
                            </NavLink>
                        </div>

                    </div>

                    <div className={`settings-content-container`}>

                        <div id="general-info" className={`settings-content shadow`} ref={generalInfo}>
                            <h2 className={`settings-content-title`}>General Info</h2>

                            <AttachImage avatar={true} image={image} setImage={setImage} spanText={spanText}
                                setSpanText={setSpanText} />

                            <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
                                <BasicInput name="change-first-name" type="text" width="47%" label="First Name" setter={setFirstName} value={firstName} />
                                <BasicInput name="change-last-name" type="text" width="47%" label="Last Name" setter={setLastName} value={lastName} />
                            </div>

                            <BasicInput name="change-email" type="text" width="100%" label="Email Address" setter={setEmail} value={email} />

                            <button className={`uni-button save-btn`} onClick={changeInfo}>Save Changes</button>
                        </div>

                        <div id="change-password" className={`settings-content shadow`} ref={changePass}>
                            <h2 className={`settings-content-title`}>Change Password</h2>
                            <div className={`passwords-container`}>

                                <BasicInput name="current-password" type="password" width="100%" label="Current Password" setter={setCurrPass} value={currPass} />

                                <BasicInput name="new-password" type="password" width="100%" label="New Password" setter={setNewPass} value={newPass} />

                                <BasicInput name="confirm-new-password" type="password" width="100%" label="Confirm New Password" setter={setConfirmNewPass} value={confirmNewPass} />

                            </div>
                            <button className={`uni-button save-btn`} onClick={changePassword}>Save Changes</button>
                        </div>

                    </div>
                </div>


            </div>
        </>
    );
}
