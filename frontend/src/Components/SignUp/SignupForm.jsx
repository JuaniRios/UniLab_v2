import React, { useEffect, useState } from "react";
// STYLES
import "./SignupForm.css";
// IMAGES
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { config } from "../../Config/config";
import { loginUser, useAuthDispatch, useAuthState } from "../../Context";
import { useMessage } from "../../Context/context";

function SignupForm(props) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const { token } = useAuthState()
    let history = useHistory()
    const dispatch = useAuthDispatch()
    const [feedbackMessage, setFeedbackMessage] = useMessage()

    useEffect(() => {
        dispatch({ type: "LOGOUT" })
    }, [])

    function dataIsValid() {
        return firstName &&
            password &&
            lastName &&
            email
    }

    async function handleSignup(e) {
        e.preventDefault()
        async function apiCall() {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    password: password,
                    user_type: 3
                })
            };

            const url = config.django_api + "users"
            try {
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    console.log("response not ok. error is " + response.status)
                    setFeedbackMessage("response not ok. error is " + response.status)

                    return false
                } else {
                    return true
                }
            } catch (e) {
                console.log(e)
            }


        }

        if (dataIsValid()) {
            const api_resp = await apiCall();
            if (api_resp) {
                const success = await loginUser(dispatch, { "email": email, "password": password })
                if (success) {
                    history.push("/")
                }
            }
        }
    }

    return (
        <aside className={`signup-form shadow`}>

            <h1 className={`sign-up`}>Sign up</h1>

            <div id="main-error-message" className={`error-message`}>⚠ An error has occurred, please try again.</div>

            <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>

                <input className={`signup-fname shadow`} name="first_name" type="text" placeholder='First Name'
                    value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input className={`signup-lname shadow`} name="password" type="text" placeholder='Last Name'
                    value={lastName} onChange={e => setLastName(e.target.value)} />
                <div className={`signup-fname-error error-message w47`}>⚠ First Name is missing.</div>
                <div className={`password-lname error-message w47`}>⚠ Last Name is missing.</div>

            </div>

            <div className={`w100 flex col-wrap j-c-s-b a-i-c`}>
                <input className={`signup-email shadow`} name="email" type="email" placeholder='Email Address'
                    value={email} onChange={e => setEmail(e.target.value)} />
                <div className={`signup-email-error error-message`}>⚠ Email is missing.</div>
            </div>
            <div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>


                <input className={`signup-password shadow`} name="password" type="password" placeholder='Password' />
                <input className={`signup-password-confirm shadow`} name="password" type="password" placeholder='Confirm Password'
                    value={password} onChange={e => setPassword(e.target.value)} />
                <div className={`password-error error-message w47`}>⚠ Password is missing.</div>
                <div className={`password-confirm-error error-message w47`}>⚠ Passwords do NOT match.</div>

            </div>


            <div className={`signup-agreements`}>
                By clicking Sign up, you agree to the UniLab's
                <NavLink to="#" className={`orange-link`}> User Agreement</NavLink>,
                <NavLink to="#" className={`orange-link`}> Privacy Policy</NavLink>,
                and <NavLink to="#" className={`orange-link`}>Cookie Policy</NavLink>.
            </div>

            <button className={`signup-btn uni-button w100`} type="submit" onClick={handleSignup}>Sign up</button>

        </aside>
    )
}

export default SignupForm;