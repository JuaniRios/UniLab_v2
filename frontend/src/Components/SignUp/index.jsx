import React from "react";
// OTHER
import NavMenu from "../NavMenu";
import SignupForm from "./SignupForm";

export default function SignUp(props) {
	document.title = "Sign up - UniLab";
	document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
	document.body.classList.remove("noscroll");
	return (
		<>
			<NavMenu />
			<main className={`main-content`}>
				<SignupForm />
			</main>
		</>
	);
}
