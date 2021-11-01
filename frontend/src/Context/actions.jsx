const ROOT_URL = 'http://127.0.0.1:8000/api';

export async function loginUser(dispatch, loginPayload) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
    };

    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await fetch(`${ROOT_URL}/token`, requestOptions);
        let data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token)
            await read_token();
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.detail });
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
}

export async function read_token(dispatch) {
    const token = localStorage.getItem('token')
    if (!token) {
        return false
    }

    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: token,
    };

    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await fetch(`${ROOT_URL}/token/get-user`, requestOptions);
        let data = await response.json();

        if (data.response) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data.response });
            return true
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.error });

    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
}