import React from "react";

import { logout, useAuthDispatch, useAuthState } from "../../Context";
import { Redirect, useHistory } from "react-router-dom";

export default function LogOut(props) {
	let history = useHistory();
	const dispatch = useAuthDispatch();
	const state = useAuthState();
	logout(dispatch);
	return <Redirect to="/" />;
}
