import React, { useReducer } from "react";
import NavMenu from "../NavMenu";
import Search from "../Search";
import Slider from "../Slider";

import mainBackground from "../../Assets/img/vienna.jpg";

function Companies(props) {

    document.title = "Companies - UniLab";
    document.getElementsByTagName("HTML")[0].classList.remove("y-scroll");
    document.body.classList.remove("noscroll");

    var mainFrameStyle = {
        background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${mainBackground})`,
        backgroundPosition: "center center",
        backgroundSize: "cover"
    };

    return (
        <>
            <NavMenu />
            <div className={`main-content-fixed`} style={mainFrameStyle}>
                <Search searchType="companies" width="w60" />
                <Slider contentType={'companies'} />
            </div>
        </>
    );
}

export default Companies;