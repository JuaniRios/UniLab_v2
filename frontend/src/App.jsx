import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import {useAuthDispatch, ContextProvider, useAuthState} from "./Context";
import {read_token} from "./Context/actions";

function App() {
    return (
        <ContextProvider>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Login/>
                    </Route>
                    <PrivateRoute exact path='/dashboard'>
                        <Dashboard/>
                    </PrivateRoute>
                </Switch>
            </Router>
        </ContextProvider>
    )
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({children, userType, ...rest}) {
    const dispatch = useAuthDispatch();
    const state = useAuthState();

    useEffect(() => {
        read_token(dispatch)
    }, [])

    if (!state.token && !state.errorMessage) {
        return (
            <h1>Checking for authentication...</h1>
        )


    } else { return(
    <Route {...rest} render={({location}) => !state.errorMessage ? (children) :
        (<Redirect to={{pathname: "/", state: {from: location}}}/>)}
    />
    )}



}

export default App;