import React, { useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
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

function App() {
	return (
		<ContextProvider>
			<Router>
				<Switch>
					<PrivateRoute optional={true} exact path="/">
						<Home />
					</PrivateRoute>

					<PrivateRoute exact path="/community">
						<Community />
					</PrivateRoute>

					<PrivateRoute exact path="/universities">
						<Universities />
					</PrivateRoute>

					<PrivateRoute exact path="/companies">
						<Companies />
					</PrivateRoute>

					<PrivateRoute exact path="/jobs">
						<Jobs />
					</PrivateRoute>

					<PrivateRoute exact path="/profile">
						<Profile />
					</PrivateRoute>

					<PrivateRoute exact path="/settings">
						<Settings />
					</PrivateRoute>

					<Route exact path="/login">
						<Home />
					</Route>

					<Route exact path="/logout">
						<SignOut />
					</Route>

					<Route exact path="/sign-up">
						<SignUp />
					</Route>

					{/* Error responses */}
					<Route component={NotFound} />
				</Switch>
			</Router>
		</ContextProvider>
	);
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, userType, optional = false, ...rest }) {
	const dispatch = useAuthDispatch();
	const state = useAuthState();

	useEffect(() => {
		read_token(dispatch);
	}, [dispatch]);

	if (!state.token && !state.errorMessage) {
		return null;
	} else {
		if (optional) {
			return <Route {...rest} render={({ location }) => children} />;
		} else {
			return (
				<Route
					{...rest}
					render={({ location }) =>
						!state.errorMessage ? (
							children
						) : (
							<Redirect to={{ pathname: "/", state: { redirected: true } }} />
						)
					}
				/>
			);
		}
	}
}

export default App;
