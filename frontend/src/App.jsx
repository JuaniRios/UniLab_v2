import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import routes from './Config/routes';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import {ContextProvider, useAuthDispatch} from "./Context";
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
function PrivateRoute({ children, userType, ...rest }) {
    const dispatch = useAuthDispatch();
    const [loggedIn, setLoggedIn] = useState(0)
    useEffect( () => {
        if (loggedIn) {
            hasValidToken(setLoggedIn);
        }
    })

    async function hasValidToken(setLoggedIn){
        // read the token in localStorage. If token is valid, log in by updating context.
        // return true if token is valid and context updated. return false otherwise
        const res = await read_token(dispatch)
        setLoggedIn(res)
    }


    return (
        <Route {...rest} render={({ location }) => loggedIn ? (children) :
            (<Redirect to={{pathname: "/", state: { from: location }}}/>)}
        />
  );
}

export default App;