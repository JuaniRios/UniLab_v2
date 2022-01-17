import { config } from "../../Config/config";
const ROOT_URL = config.django_api;

export async function loginUser(dispatch, loginPayload) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(loginPayload)

    };

    try {
        let response = await fetch(`${ROOT_URL}/token`, requestOptions);
        let data = await response.json();

        if (data.access) {
            localStorage.setItem('token', data.access)
            return await read_token(dispatch);
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.detail });
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    return true
}

export async function read_token(dispatch) {
    const token = localStorage.getItem('token')
    if (!token) {
        dispatch({type: "LOGIN_ERROR", error: "No token in localStorage"})
        return false
    }

    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token: token}),
    };

    try {
        // dispatch({ type: 'REQUEST_LOGIN' });
        let response = await fetch(`${ROOT_URL}/token/get-user`, requestOptions);
        let data = await response.json();

        if (data.response) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: {userData: data.response, token: token} });
            return true
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.error });

    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
    return false
}