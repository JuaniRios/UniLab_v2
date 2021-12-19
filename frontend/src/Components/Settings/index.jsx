import React, { useState } from "react";
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

    const [firstName, setFirstName] = useState('Firstname');
    const [lastName, setLastName] = useState('Lastname');
    const [email, setEmail] = useState("Your@email.com");

    return (
        <>
            <NavMenu />
            <div className={`main-content`}>
                <div className={`settings-container shadow`}>

                    <div className={`settings-menu`}>

                        <div className={`settings-menu-item active-settings-item`}>
                            <img className={`settings-menu-img noselect`} src={account_img} alt="Account image" />
                            <span>General Info</span>
                        </div>

                        <div className={`settings-menu-item`}>
                            <img className={`settings-menu-img noselect`} src={password_img} alt="Change password image" />
                            <span>Change Password</span>
                        </div>

                    </div>

                    <div className={`settings-content`}>
                        <h2 className={`settings-content-title`}>General Info</h2>

                        <AttachImage avatar={true} />

                        <div className={`double-input-wrap w90 flex row-wrap j-c-s-b a-i-c`}>
                            <BasicInput name="change-first-name" type="text" width="47%" label="First Name" setter={setFirstName} value={firstName} />
                            <BasicInput name="change-last-name" type="text" width="47%" label="Last Name" setter={setLastName} value={lastName} />
                        </div>

                        <BasicInput name="change-email" type="text" width="90%" label="Email Address" setter={setEmail} value={email} />

                        <button className={`uni-button save-btn w20`}>Save</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Settings;