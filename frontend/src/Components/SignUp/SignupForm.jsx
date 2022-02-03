import React, { useEffect, useState } from "react";
// STYLES
import "./SignupForm.css";
// IMAGES
import { NavLink, Redirect, useNavigate } from "react-router-dom";
import { config } from "../../Config/config";
import { loginUser, useAuthDispatch, useAuthState } from "../../Context";
import { useMessage } from "../../Context/context";
// OTHER COMPONENTS
import BasicInput from "../Forms/BasicInput";
import apiCall from "../HelperFunctions/apiCall";

export default function SignupForm(props) {
	const [message, setMessage] = useMessage()

	// form strings
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("")
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	let navigate = useNavigate();
	const dispatch = useAuthDispatch();

	// error booleans
	const [missingPassword, setMissingPassword] = useState(false)
	const [missingConfirmPassword, setMissingConfirmPassword] = useState(false)
	const [missingFirstName, setMissingFirstName] = useState(false)
	const [missingLastName, setMissingLastName] = useState(false)
	const [missingEmail, setMissingEmail] = useState(false)
	const [passwordMismatch, setPasswordMismatch] = useState(false)
	const [generalError, setGeneralError] = useState(false)

	const generalErrorComponent = <>
		<div id="main-error-message" className={`error-message noselect`}>
				⚠ An error has occurred, please try again.
		</div>
	</>


	useEffect(() => {
		dispatch({ type: "LOGOUT" });
	}, []);

	function dataIsValid() {
		return firstName && password && lastName && email;
	}

	async function handleSignup(e) {
		e.preventDefault();
		let payload = {
			"email": email,
			"first_name": firstName,
			"last_name": lastName,
			"password": password,
			"user_type": 3,
		}
		let params = {
			"payload": payload,
			"method": "POST",
		}

		if (dataIsValid()) {
			try {
				await apiCall("users", null, params) // if api call is unsuccessful, then catch block is executed
				const success = await loginUser(dispatch, {email: email, password: password});
				if (success) navigate("/")

			} catch (error) {
				setMessage(error)
			}
		}
	}

	return (
		<aside className={`signup-form shadow`}>
			<h1 className={`sign-up`}>Sign up</h1>
			{generalError ? generalErrorComponent:null}
			<div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
				<BasicInput
					name="signup-first-name"
					type="text"
					width="47%"
					label="First Name"
					errors={[
						["First Name Missing!", missingFirstName]
					]}
					setter={setFirstName}
					value={firstName}
				/>
				<BasicInput
					name="signup-last-name"
					type="text"
					width="47%"
					label="Last Name"
					errors={[
						["Last Name Missing!", missingLastName]
					]}
					setter={setLastName}
					value={lastName}
				/>
			</div>

			<BasicInput
				name="signup-email2"
				type="text"
				width="100%"
				label="Email Address"
				errors={[
					["Email Address Missing!", missingEmail]
				]}
				setter={setEmail}
				value={email}
			/>

			<div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
				<BasicInput
					name="signup-password"
					type="password"
					width="47%"
					label="Password"
					errors={[
						["Password Missing!", missingPassword]
					]}
					setter={setPassword}
					value={password}
				/>
				<BasicInput
					name="signup-password-confirm"
					type="password"
					width="47%"
					label="Confirm Password"
					errors={[
						["Passwords do NOT match!", passwordMismatch],
						["Please confirm your password!", missingConfirmPassword]
					]}
					setter={setConfirmPassword}
					value={confirmPassword}
					/>
			</div>

			<div className={`signup-agreements`}>
				By clicking "Sign up", you agree to the UniLab's
				<NavLink to="#" className={`orange-link`}>
					{" "}
					User Agreement
				</NavLink>
				,
				<NavLink to="#" className={`orange-link`}>
					{" "}
					Privacy Policy
				</NavLink>
				, and{" "}
				<NavLink to="#" className={`orange-link`}>
					Cookie Policy
				</NavLink>
				.
			</div>

			<button className={`signup-btn uni-button w100`} type="submit" onClick={handleSignup}>
				Sign up
			</button>
		</aside>
	);
}
