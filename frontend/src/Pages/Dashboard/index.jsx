// Pages/Dashboard/index.js

import React from 'react'
import styles from './dashboard.module.css'
import {logout, useAuthDispatch, useAuthState} from "../../Context";

function Dashboard(props) {
    const dispatch = useAuthDispatch()
    const userData = useAuthState()

    const handeLogout = () => {
        logout(dispatch)
        props.history.push('/login')
    }

    return (
        <div style={{ padding: 10 }}>
            <div className={styles.dashboardPage} >
                <h1>
                    Dashboard
                </h1>
                <button className={styles.logoutBtn} onClick={handeLogout}>Logout</button>
            </div>
            <p>Welcome {userData.email}</p>
        </div>
    )
}

export default Dashboard