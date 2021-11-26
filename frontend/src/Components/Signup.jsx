import React, { useState, useEffect } from "react";
// STYLES
import "./Signup.css";
// IMAGES
import { NavLink } from "react-router-dom";

function Signup(props) {

    return (
        <aside className={`signup-form shadow`}>

            <h1 className={`sign-up`}>Sign up</h1>

            <div id="main-error-message" className={`error-message`}>⚠ An error has occurred, please try again.</div>

            <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>

                <input className={`signup-fname shadow`} name="email" type="text" placeholder='First Name' />
                <input className={`signup-lname shadow`} name="password" type="text" placeholder='Last Name' />
                <div className={`signup-fname-error error-message w47`}>⚠ First Name is missing.</div>
                <div className={`password-lname error-message w47`}>⚠ Last Name is missing.</div>

            </div>

            <input className={`signup-email shadow`} name="email" type="email" placeholder='Email Address' />
            <div className={`signup-email-error error-message`}>⚠ Email is missing.</div>

            <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>

                <input className={`signup-password shadow`} name="password" type="password" placeholder='Password' />
                <input className={`signup-password-confirm shadow`} name="password" type="password" placeholder='Confirm Password' />
                <div className={`password-error error-message w47`}>⚠ Password is missing.</div>
                <div className={`password-confirm-error error-message w47`}>⚠ Passwords do NOT match.</div>

            </div>


            <div className={`signup-agreements`}>
                By clicking Sign up, you agree to the UniLab's
                <NavLink to="#" className={`orange-link`}> User Agreement</NavLink>,
                <NavLink to="#" className={`orange-link`}> Privacy Policy</NavLink>,
                and <NavLink to="#" className={`orange-link`}>Cookie Policy</NavLink>.
            </div>

            <button className={`signup-btn uni-button w100`} type="submit">Sign up</button>

        </aside>
    )
}

export default Signup;