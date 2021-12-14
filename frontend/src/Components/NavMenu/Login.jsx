import React, { useState, useEffect } from "react";
// STYLES
import "./Login.css";
// IMAGES
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { loginUser, useAuthDispatch, useAuthState } from "../../Context";
import BasicInput from "../Forms/BasicInput";

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory();
    const dispatch = useAuthDispatch()

    const [loginClass, overlayClass] = props.loginClasses;
    const setLoginClasses = props.setLoginClasses;


    const handleLogin = async (e) => {
        e.preventDefault()
        let payload = { email, password }
        try {
            const success = await loginUser(dispatch, payload)
            if (success) {
                props.setLoginClasses()
                props.setProfileClasses()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={`overlay overlay-10k ${overlayClass}`} onClick={setLoginClasses} />

            <aside className={`login-form ${loginClass} shadow`}>

                <button className={`login-close-button close-button`} onClick={setLoginClasses} />

                <h1 className={`sign-in`}>Sign in</h1>

                <div id="main-error-message" className={`error-message`}>⚠ Invalid email or password.</div>

                <BasicInput name="login-email" type="text" width="100%" label="Email Address" errorMsg="Email Address Missing!" />
                <BasicInput name="login-password" type="password" width="100%" label="Password" errorMsg="Password Missing!" />

                <input className={`login-email shadow`} name="email" type="email" placeholder='Email Address'
                    value={email} onChange={e => setEmail(e.target.value)} />

                <div className={`login-email-error error-message`}>⚠ Email is missing.</div>

                <input className={`login-password shadow`} name="password" type="password" placeholder='Password'
                    value={password} onChange={e => setPassword(e.target.value)} />

                <div className={`password-error error-message`}>⚠ Password is missing.</div>

                <button className={`login-btn uni-button w100`} type="submit" onClick={handleLogin}>Sign in</button>

                <NavLink to="#" className={`forgot-pass blue-link`}>Forgot your password?</NavLink>

            </aside>
        </>
    )
}

export default Login;