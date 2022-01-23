import React, {useEffect, useState} from "react";
// STYLES
import "./Login.css";
// OTHER
import { NavLink, Redirect, useNavigate } from "react-router-dom";
import { loginUser, useAuthDispatch, useAuthState } from "../../Context";
import BasicInput from "../Forms/BasicInput";
import {ErrorMessage} from "../Forms/BasicInput";
import {useMessage} from "../../Context/context";
import {CSSTransition} from "react-transition-group";


export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [feedbackMessage, setFeedbackMessage] = useMessage()
	const dispatch = useAuthDispatch();
	const auth = useAuthState()

	const [loginError, setLoginError] = useState(false)
	const loginErrorContainer = <ErrorMessage message={"No active account found with the given credentials."}/>

	const [missingEmailError, setMissingEmailError] = useState(false)
	const [missingPasswordError, setMissingPasswordError] = useState(false)
	const [invalidEmailError, setInvalidEmailError] = useState(false)
	const [invalidPasswordError, setInvalidPasswordError] = useState(false)

	const handleLogin = async (e) => {
		e.preventDefault();

		// form validation
		setMissingEmailError(false)
		setMissingPasswordError(false)
		setInvalidEmailError(false)
		setInvalidPasswordError(false)
		setLoginError(false)
		let payload = { email, password };
		const emailRegex =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (!email) setMissingEmailError(true)
		if (!password) setMissingPasswordError(true)
		const isEmailValid = email.match(emailRegex)
		if (!isEmailValid && email) setInvalidEmailError(true)

		if (email && password && isEmailValid){ // make the api call to check user credentials
			try {
				await loginUser(dispatch, payload);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect( () => {
		if (auth.token && !auth.errorMessage) { // successfully logged in
			props.setDisplayProfile(false)
			props.setDisplay(false)

		} else if (auth.errorMessage) { // login error
			setLoginError(true);
		}
	}, [auth])

	useEffect( () => {
		setLoginError(false)
	}, [])
	return (
		<>
		<CSSTransition
			in={props.display}
			unmountOnExit
			timeout={500}
			classNames={"menu-login"}>
			<aside className={`login-form login-form-opened  shadow`}>
				<button className={`login-close-button close-button`} onClick={() => props.setDisplay(false)} />

				<h1 className={`sign-in`}>Sign in</h1>

				<BasicInput
					name="login-email"
					type="text"
					width="100%"
					label="Email Address"
					errors={[
						["Email Address Missing!", missingEmailError],
						["Invalid Email Address!", invalidEmailError]
					]}
					setter={setEmail}
					value={email}
				/>
				<BasicInput
					name="login-password"
					type="password"
					width="100%"
					label="Password"
					errors={[
						["Password Missing!", missingPasswordError],
						["Invalid Password!", invalidPasswordError]
					]}
					setter={setPassword}
					value={password}
				/>

				{loginError ? loginErrorContainer : null}


				<button className={`login-btn uni-button w100`} type="submit" onClick={handleLogin}>
					Sign in
				</button>

				<NavLink to="#" className={`forgot-pass blue-link`}>
					Forgot your password?
				</NavLink>
			</aside>
		</CSSTransition>
		</>
	);
}
