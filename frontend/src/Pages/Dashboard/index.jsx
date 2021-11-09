// Pages/Dashboard/index.js

import React from 'react';
import { logout, useAuthDispatch, useAuthState } from "../../Context";
import { useHistory } from "react-router-dom";

function Dashboard(props) {
    const dispatch = useAuthDispatch()
    const { userData } = useAuthState()
    let history = useHistory();

    const handleLogout = () => {
        logout(dispatch)
        history.push('/')
    }

    return (
        <div style={{ padding: 10 }}>
            <div className="dashboardPage" >
                <h1>
                    Dashboard
                </h1>
                <button className="logoutBtn" onClick={handleLogout}>Logout</button>
            </div>
            <p>Welcome {userData.first_name}</p>
        </div>
    )
}

export default Dashboard