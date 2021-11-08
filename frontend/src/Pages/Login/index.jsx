// Pages/Login/index.js

import React, {useEffect, useState} from 'react';

import styles from './';
import {loginUser, useAuthDispatch, useAuthState} from "../../Context";
import {Redirect, useHistory} from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory();
    const dispatch = useAuthDispatch()
    const state = useAuthState()

    useEffect( () => {
        dispatch({type: "LOGOUT"})
    }, [])

    const handleLogin = async (e)  => {
        e.preventDefault()
        let payload = {email, password}
        try {
            const success = await loginUser(dispatch, payload)
            if (success){
                history.push("/dashboard")
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (state.token){
        return (
            <h1>Logging you out...</h1>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>Login Page</h1>

                <form>
                    <div className={styles.loginForm}>
                        <div className={styles.loginFormItem}>
                            <label htmlFor='email'>Username</label>
                            <input type='text' id='email' value={email}
                                   onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={styles.loginFormItem}>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' value={password}
                                   onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button onClick={handleLogin}>login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;