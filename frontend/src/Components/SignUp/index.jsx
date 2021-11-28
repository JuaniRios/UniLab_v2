import React from "react";
import NavMenu from "../NavMenu";
import SignupForm from "./SignupForm";

function SignUp(props) {
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

export default SignUp;