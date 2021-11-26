import React from "react";
import NavMenu from "../Components/NavMenu";
import Signup from "../Components/Signup";

function Register(props) {
    document.title = "Sign up - UniLab";
    document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
    document.body.classList.remove("noscroll");
    return (
        <>
            <NavMenu />
            <main className={`main-content`}>
                <Signup />
            </main>
        </>
    );
}

export default Register;