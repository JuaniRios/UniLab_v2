import React, { useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, Outlet } from "react-router-dom";
import { Suspense } from "react";
// STYLES
import "./main_style.css";
// PAGES
import Home from "./Components/Home";
import Community from "./Components/Community";
import Universities from "./Components/Universities";
import Companies from "./Components/Companies";
import Jobs from "./Components/Jobs";
import JobDetails from "./Components/JobDetails";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import SignOut from "./Components/SignOut";
import SignUp from "./Components/SignUp";
import Management from "./Components/Management";
import CompanyProfile from "./Components/CompanyProfile/index";
// ERROR PAGES
import PageNotFound from "./Components/PageNotFound";
// OTHER
import { useAuthDispatch, ContextProvider, useAuthState } from "./Context";
import { read_token } from "./Context/actions";
import SinglePost from "./Components/SinglePost";

function App() {
	return (
		<ContextProvider>
			<Router>
				<Routes>
					<Route path="/" element={<PrivateRoute optional={true} />}>
						<Route path="" element={<Home />} />
					</Route>

					<Route path="/community" element={<PrivateRoute />}>
						<Route path="" element={<Community />} />
					</Route>

					<Route path="/universities" element={<PrivateRoute />}>
						<Route path="" element={<Universities />} />
					</Route>

					<Route path="/companies" element={<PrivateRoute />}>
						<Route path="" element={<Companies />} />
					</Route>

					<Route path="/companies/:id" element={<PrivateRoute />}>
						<Route path="" element={<CompanyProfile />} />
					</Route>

					<Route path="/jobs" element={<PrivateRoute />}>
						<Route path="" element={<Jobs />} />
					</Route>

					<Route path="/jobs/:id" element={<PrivateRoute />}>
						<Route path="" element={<JobDetails />} />
					</Route>

					<Route path="/post" element={<PrivateRoute />}>
						<Route path="" element={<SinglePost />} />
					</Route>

					<Route path="/jobs" element={<PrivateRoute />}>
						<Route path="" element={<Jobs />} />
					</Route>

					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="" element={<Profile />} />
					</Route>

					<Route path="/settings" element={<PrivateRoute />}>
						<Route path="" element={<Settings />} />
					</Route>

					<Route path="/logout" element={<SignOut />} />

					<Route path="/sign-up" element={<SignUp />} />

					<Route path="/management" element={<PrivateRoute />}>
						<Route path="" element={<Management />} />
					</Route>

					{/* Error responses */}
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Router>
		</ContextProvider>
	);
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ optional = false }) {
	const dispatch = useAuthDispatch();
	const state = useAuthState();

	useEffect(() => {
		read_token(dispatch);
	}, [dispatch]);

	if (!state.token && !state.errorMessage) {
		return null;
	} else {
		if (optional) {
			return <Outlet />;
		} else {
			return !state.errorMessage ? <Outlet /> : <Navigate to="/" state={"showLogin"} />;
		}
	}
}

// here app catches the suspense from page in case translations are not yet loaded
export default function WrappedApp() {
	return (
		<Suspense fallback="...is loading">
			<App />
		</Suspense>
	);
}

// export default App;
