import React, {useReducer} from "react";

let token = localStorage.getItem("token")

export const initialState = {
    userData: "",
    token: "",
    errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        // case "REQUEST_LOGIN":
        //     return {
        //         ...initialState,
        //         loading: true,
        //     };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                userData: action.payload.userData,
                token: action.payload.token
            };
        case "LOGOUT":
            return {
                ...initialState,
                userData: "",
                token: "",
                errorMessage: null
            }
        case "LOGIN_ERROR":
            return {
                ...initialState,
                errorMessage: action.error,
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)


    }

}