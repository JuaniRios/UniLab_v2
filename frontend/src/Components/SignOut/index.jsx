import React from "react";

import { logout, useAuthDispatch, useAuthState } from "../../Context";
import { Redirect, Navigate } from "react-router-dom";

export default function LogOut(props) {
	const dispatch = useAuthDispatch();
	logout(dispatch);
	return <Navigate to="/" />;
}
