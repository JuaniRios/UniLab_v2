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

    const loginErrorMessage = <></>


    const handleLogin = async (e) => {
        e.preventDefault()
        let payload = { email, password }
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

        try {
            const success = await loginUser(dispatch, payload)
            if (success) {
                props.setLoginClasses()
                props.setProfileClasses()
            } else {
                const loginErrorMessage = <><div id="main-error-message" className={`error-message`}>⚠ "No active account found with the given credentials."</div></>
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



                <BasicInput name="login-email" type="text" width="100%" label="Email Address" errorMsg="Email Address Missing!"
                    setter={setEmail} value={email} />
                <BasicInput name="login-password" type="password" width="100%" label="Password" errorMsg="Password Missing!"
                    setter={setPassword} value={password}/>

                {loginErrorMessage}



                <button className={`login-btn uni-button w100`} type="submit" onClick={handleLogin}>Sign in</button>

                <NavLink to="#" className={`forgot-pass blue-link`}>Forgot your password?</NavLink>

            </aside>
        </>
    )
}

export default Login;