// Pages/PageNotFound/index.js

import React from "react";
import NavMenu from "./NavMenu";
import "./PageNotFound.css"

export default function PageNotFound(props) {
	return (<>
		<NavMenu/>
		<h1 className={"not-found"}>Error 404: Page not found</h1>
	</>)
}
