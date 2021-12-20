import React, { useRef, useState } from "react";
import NavMenu from "../NavMenu";
import "./index.css";

import account_img from "../../Assets/img/account.png";
import password_img from "../../Assets/img/password.png";

import AttachImage from "../Forms/AttachImage";
import BasicInput from "../Forms/BasicInput";

function Settings(props) {

    document.title = "Settings - UniLab";
    document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
    document.body.classList.remove("noscroll");

    // Input states

    const [firstName, setFirstName] = useState("Firstname");
    const [lastName, setLastName] = useState("Lastname");
    const [email, setEmail] = useState("Your@email.com");

    const [currPass, setCurrPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmNewPass, setConfirmNewPass] = useState("");

    // Menu refs

    const changePass = useRef(null);
    const generalInfo = useRef(null);

    // Menu states

    const [generalInfoState, setGeneralInfoState] = useState("active-settings-item");
    const [changePassState, setChangePassState] = useState("");

    function isScrolledToElement(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function scrollTo(element) {
        element.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }

    // document.addEventListener('scroll', async function (e) {
    //     if (isScrolledToElement(changePass.current)) {
    //         setChangePassState("active-settings-item");
    //         setGeneralInfoState("");
    //     }
    //     if (isScrolledToElement(generalInfo.current)) {
    //         setChangePassState("");
    //         setGeneralInfoState("active-settings-item");
    //     }
    // });

    function toggleMenuOption(contentRef, menuBtnState) {
        setChangePassState("");
        setGeneralInfoState("");
        scrollTo(contentRef);
        menuBtnState("active-settings-item");
    }

    return (
        <>
            <NavMenu />
            <div className={`main-content`}>

                <div className={`settings-menu`}>

                    <div className={`settings-menu-item ${generalInfoState}`} onClick={e => toggleMenuOption(generalInfo.current, setGeneralInfoState)}>
                        <img className={`settings-menu-img noselect`} src={account_img} alt="Account image" />
                        <span>General Info</span>
                    </div>

                    <div className={`settings-menu-item ${changePassState}`} onClick={e => toggleMenuOption(changePass.current, setChangePassState)}>
                        <img className={`settings-menu-img noselect`} src={password_img} alt="Change password image" />
                        <span>Change Password</span>
                    </div>

                </div>

                <div className={`settings-content-container`}>

                    <div className={`settings-content shadow`} ref={generalInfo}>
                        <h2 className={`settings-content-title`}>General Info</h2>

                        <AttachImage avatar={true} />

                        <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
                            <BasicInput name="change-first-name" type="text" width="47%" label="First Name" setter={setFirstName} value={firstName} />
                            <BasicInput name="change-last-name" type="text" width="47%" label="Last Name" setter={setLastName} value={lastName} />
                        </div>

                        <BasicInput name="change-email" type="text" width="100%" label="Email Address" setter={setEmail} value={email} />

                        <button className={`uni-button save-btn`}>Save Changes</button>
                    </div>

                    <div className={`settings-content shadow`} ref={changePass}>
                        <h2 className={`settings-content-title`}>Change Password</h2>
                        <div className={`passwords-container`}>

                            <BasicInput name="current-password" type="password" width="100%" label="Current Password" setter={setCurrPass} value={currPass} />

                            <BasicInput name="new-password" type="password" width="100%" label="New Password" setter={setNewPass} value={newPass} />

                            <BasicInput name="confirm-new-password" type="password" width="100%" label="Confirm New Password" setter={setConfirmNewPass} value={confirmNewPass} />

                        </div>
                        <button className={`uni-button save-btn`}>Save Changes</button>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Settings;