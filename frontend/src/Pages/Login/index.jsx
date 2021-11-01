// Pages/Login/index.js

import React, {useState} from 'react';

import styles from './login.module.css';
import {loginUser, useAuthDispatch, useAuthState} from "../../Context";

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAuthDispatch()
    const { loading, errorMessage} = useAuthState()

    const handleLogin = async (e)  => {
        e.preventDefault()
        let payload = {email, password}
        try {
            let response = await loginUser(dispatch, payload)
            if (!response){
                props.history.push('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
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
                    <button onClick={handleLogin} disabled={loading}>login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;