import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
// STYLES
import "./main_style.css";
// PAGES
import Home from "./Components/Home";
import Community from "./Components/Community";

import Login from "./Pages/Login";
import SignOut from "./Components/SignOut";

import SignUp from "./Components/SignUp";

import NotFound from "./Pages/PageNotFound";

import { CommunityPosts } from "./Components/CommunityPosts.jsx"
// OTHER
import { useAuthDispatch, ContextProvider, useAuthState } from "./Context";
import { read_token } from "./Context/actions";

function App() {
    return (
        <ContextProvider>
            <Router>
                <Switch>

                    <PrivateRoute optional={true} exact path='/'>
                        <Home />
                    </PrivateRoute>

                    <Route exact path='/login'>
                        <Login />
                    </Route>

                    <Route exact path='/logout'>
                        <SignOut />
                    </Route>

                    <Route exact path='/sign-up'>
                        <SignUp />
                    </Route>

                    <PrivateRoute exact path='/community'>
                        <Community />
                    </PrivateRoute>

                    <Route component={NotFound} />

                </Switch>
            </Router>
        </ContextProvider>
    )
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, userType, optional = false, ...rest }) {
    const dispatch = useAuthDispatch();
    const state = useAuthState();

    useEffect(() => {
        read_token(dispatch)
    }, [])

    console.log(state)
    if (!state.token && !state.errorMessage) {
        return null


    } else {
        if (optional) {
            return <Route {...rest} render={({ location }) => children} />
        } else {
            return (
                <Route {...rest} render={({ location }) => !state.errorMessage ? (children) :
                    (<Redirect to={{ pathname: "/login", state: { from: location } }} />)} />
            )
        }

    }
}

export default App;