import React, { useState, useEffect } from "react";
// STYLES
import "./Login.css";
// IMAGES
import { NavLink } from "react-router-dom";

function Login(props) {

    const [loginClass, overlayClass] = props.loginClasses;
    const setLoginClasses = props.setLoginClasses;

    return (
        <>
            <div className={`overlay overlay-10k ${overlayClass}`} onClick={setLoginClasses} />

            <aside className={`login-form ${loginClass} shadow`}>

                <button className={`login-close-button close-button`} onClick={setLoginClasses} />

                <h1 className={`sign-in`}>Sign in</h1>

                <div id="main-error-message" className={`error-message`}>⚠ Invalid email or password.</div>

                <input className={`login-email shadow`} name="email" type="email" placeholder='Email Address' />

                <div className={`login-email-error error-message`}>⚠ Email is missing.</div>

                <input className={`login-password shadow`} name="password" type="password" placeholder='Password' />

                <div className={`password-error error-message`}>⚠ Password is missing.</div>

                <button className={`login-btn uni-button w100`} type="submit">Sign in</button>

                <NavLink to="#" className={`forgot-pass blue-link`}>Forgot your password?</NavLink>

            </aside>
        </>
    )
}

export default Login;