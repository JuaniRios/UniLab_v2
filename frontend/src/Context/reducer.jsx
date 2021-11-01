import React, {useReducer} from "react";

let token = localStorage.getItem("token")

export const initialState = {
    userData: "",
    token: "",
    loading: false,
    errorMessage: null
};

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true
            };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                userData: action.payload,
                loading: false
            };
        case "LOGOUT":
            return {
                ...initialState,
                userData: "",
                token: ""
            }
        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)


    }

}