import React from "react";
import NavMenu from "../Components/NavMenu";

function Register(props) {
    document.title = "Sign up - UniLab";
    document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
    document.body.classList.remove("noscroll");
    return (
        <>
            <NavMenu />
        </>
    );
}

export default Register;