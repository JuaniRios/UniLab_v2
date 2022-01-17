import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
    Outlet
} from 'react-router-dom';
// STYLES
import "./main_style.css";
// PAGES
import Home from "./Components/Home";
import Community from "./Components/Community";
import Universities from "./Components/Universities";
import Companies from "./Components/Companies";
import Jobs from "./Components/Jobs";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import SignOut from "./Components/SignOut";
import SignUp from "./Components/SignUp";
// ERROR PAGES
import NotFound from "./Components/PageNotFound";
// OTHER
import { useAuthDispatch, ContextProvider, useAuthState } from "./Context";
import { read_token } from "./Context/actions";
import SinglePost from "./Components/SinglePost";

function App() {
    return (
        <ContextProvider>
            <Router>
                <Routes>

                    <Route optional={true} path='/' element={<Home/>}/>

					<Route path="/community" element={<PrivateRoute/>}>
						<Route path="" element={<Community />}/>
					</Route>

					<Route path="/universities" element={<PrivateRoute/>}>
						<Route path="" element={<Universities />}/>
					</Route>

					<Route path="/companies" element={<PrivateRoute/>}>
						<Route path="" element={<Companies />}/>
					</Route>

					<Route path="/jobs" element={<PrivateRoute/>}>
						<Route path="" element={<Jobs />}/>
					</Route>
                    <Route path='/post' element={<PrivateRoute/>}>
                        <Route path="" element={<SinglePost />}/>
                    </Route>

                    <Route path='/jobs' element={<PrivateRoute/>}>
                        <Route path="" element={<Jobs />}/>
                    </Route>

					<Route path="/profile" element={<PrivateRoute/>}>
						<Route path="" element={<Profile />}/>
					</Route>

					<Route path="/settings" element={<PrivateRoute/>}>
						<Route path="" element={<Settings />}/>
					</Route>

					<Route path="/login" element={<Home/>}/>

					<Route path="/logout" element={<SignOut/>}/>

					<Route path="/sign-up" element={<SignUp/>}/>

                    {/* Error responses */}
                    <Route component={NotFound} />

                </Routes>
            </Router>
        </ContextProvider>
    )
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({optional = false}) {
	const dispatch = useAuthDispatch();
	const state = useAuthState();

	useEffect(() => {
		read_token(dispatch);
	}, [dispatch]);

    if (!state.token && !state.errorMessage) {
        return null

    } else {
        if (optional) {
            return <Outlet/>
        } else {
            return (
               !state.errorMessage ? <Outlet/> :<Navigate to="/"  state={ {"redirected": true } }/>
            )
        }

    }
}

export default App;
