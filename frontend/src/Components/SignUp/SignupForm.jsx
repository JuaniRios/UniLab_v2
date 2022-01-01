import React, { useEffect, useState } from "react";
// STYLES
import "./SignupForm.css";
// IMAGES
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { config } from "../../Config/config";
import { loginUser, useAuthDispatch, useAuthState } from "../../Context";
import { useMessage } from "../../Context/context";
// OTHER COMPONENTS
import BasicInput from "../Forms/BasicInput";

export default function SignupForm(props) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const { token } = useAuthState();
	let history = useHistory();
	const dispatch = useAuthDispatch();
	const [feedbackMessage, setFeedbackMessage] = useMessage();

	useEffect(() => {
		dispatch({ type: "LOGOUT" });
	}, []);

	function dataIsValid() {
		return firstName && password && lastName && email;
	}

	async function handleSignup(e) {
		e.preventDefault();
		async function apiCall() {
			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					email: email,
					first_name: firstName,
					last_name: lastName,
					password: password,
					user_type: 3,
				}),
			};

			const url = config.django_api + "users";
			try {
				const response = await fetch(url, requestOptions);
				if (!response.ok) {
					console.log("response not ok. error is " + response.status);
					setFeedbackMessage("response not ok. error is " + response.status);

					return false;
				} else {
					return true;
				}
			} catch (e) {
				console.log(e);
			}
		}

		if (dataIsValid()) {
			const api_resp = await apiCall();
			if (api_resp) {
				const success = await loginUser(dispatch, { email: email, password: password });
				if (success) {
					history.push("/");
				}
			}
		}
	}

	return (
		<aside className={`signup-form shadow`}>
			<h1 className={`sign-up`}>Sign up</h1>

			<div id="main-error-message" className={`error-message noselect`}>
				⚠ An error has occurred, please try again.
			</div>

			<div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
				<BasicInput
					name="signup-first-name"
					type="text"
					width="47%"
					label="First Name"
					errorMsg="First Name Missing!"
				/>
				<BasicInput
					name="signup-last-name"
					type="text"
					width="47%"
					label="Last Name"
					errorMsg="Last Name Missing!"
				/>
			</div>

			<BasicInput
				name="signup-email2"
				type="text"
				width="100%"
				label="Email Address"
				errorMsg="Email Address Missing!"
			/>

			<div className={`double-input-wrap w100 flex row-wrap j-c-s-b a-i-c`}>
				<BasicInput
					name="signup-password"
					type="password"
					width="47%"
					label="Password"
					errorMsg="Password Missing!"
				/>
				<BasicInput
					name="signup-password-confirm"
					type="password"
					width="47%"
					label="Confirm Password"
					errorMsg="Passwords do NOT match!"
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
