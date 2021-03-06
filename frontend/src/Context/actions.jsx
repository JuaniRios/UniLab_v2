import { config } from "../Config/config";
import apiCall from "../Components/HelperFunctions/apiCall";
const ROOT_URL = config.django_api;

export async function loginUser(dispatch, loginPayload) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json", Accept: "application/json" },
		body: JSON.stringify(loginPayload),
	};

	try {
		console.log("fetching token for the following payload: ", loginPayload);
		let response = await fetch(`${ROOT_URL}token`, requestOptions);
		let data = await response.json();

		if (data.access) {
			localStorage.setItem("token", data.access);
			return await read_token(dispatch);
		}

		dispatch({ type: "LOGIN_ERROR", error: data.detail });
	} catch (error) {
		dispatch({ type: "LOGIN_ERROR", error: error });
	}
}

export async function logout(dispatch) {
	dispatch({ type: "LOGOUT" });
	localStorage.removeItem("token");
	return true;
}

export async function read_token(dispatch) {
	const token = localStorage.getItem("token");
	if (!token) {
		dispatch({ type: "LOGIN_ERROR", error: "No token in localStorage" });
		return false;
	}

	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token: token }),
	};

	let params = {
		method: "POST",
		payload: {
			token: token,
		},
	};

	try {
		// dispatch({ type: 'REQUEST_LOGIN' });
		let data = await apiCall("token/get-user", "", params);
		// let response = await fetch(`${ROOT_URL}token/get-user`, requestOptions);
		// let data = await response.json();

		if (data) {
			dispatch({ type: "LOGIN_SUCCESS", payload: { userData: data.response, token: token } });
			return true;
		}

		dispatch({ type: "LOGIN_ERROR", error: data.error });
	} catch (error) {
		dispatch({ type: "LOGIN_ERROR", error: error });
	}
	return false;
}
