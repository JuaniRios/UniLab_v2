import React, {useEffect, useState} from "react";
// STYLES
import "./Login.css";
// OTHER
import { NavLink, Redirect, useNavigate } from "react-router-dom";
import { loginUser, useAuthDispatch, useAuthState } from "../../Context";
import BasicInput from "../Forms/BasicInput";
import {ErrorMessage} from "../Forms/BasicInput";


export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let history = useNavigate();
	const dispatch = useAuthDispatch();
	const auth = useAuthState()

	const [loginError, setLoginError] = useState(false)
	const loginErrorContainer = <ErrorMessage message={"No active account found with the given credentials."}/>

	const [missingEmailError, setMissingEmailError] = useState(false)
	const [missingPasswordError, setMissingPasswordError] = useState(false)
	const [invalidEmailError, setInvalidEmailError] = useState(false)
	const [invalidPasswordError, setInvalidPasswordError] = useState(false)


	const [loginClass, overlayClass] = props.loginClasses;
	const setLoginClasses = props.setLoginClasses;


	const handleLogin = async (e) => {
		e.preventDefault();
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
		if (!email.match(emailRegex) && email) setInvalidEmailError(true)

		if (!missingEmailError && !missingPasswordError && !invalidEmailError){
			try {
				await loginUser(dispatch, payload);

			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect( () => {
		if (auth.token && !auth.errorMessage) { // successfully logged in
			props.setLoginClasses();
			props.setProfileClasses();
		} else if (auth.errorMessage) { // login error
			setLoginError(true);
		}
	}, [auth])


	return (
		<>
			<div className={`overlay overlay-10k ${overlayClass}`} onClick={setLoginClasses} />

			<aside className={`login-form ${loginClass} shadow`}>
				<button className={`login-close-button close-button`} onClick={setLoginClasses} />

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
		</>
	);
}
