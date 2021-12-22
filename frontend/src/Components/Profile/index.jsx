import React, { useEffect, useRef, useState } from "react";
import NavMenu from "../NavMenu";
import "./index.css";

function Profile(props) {

    document.title = "Profile - UniLab";
    document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
    document.body.classList.remove("noscroll");

    return (
        <>
            <NavMenu />
        </>
    );
}

export default Profile;