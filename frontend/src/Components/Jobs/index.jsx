import React, { useReducer } from "react";
import NavMenu from "../NavMenu";
import Search from "../Search";
import Slider from "../Slider";

import mainBackground from "../../Assets/img/vienna.jpg";

function Jobs(props) {

    document.title = "Jobs - UniLab";

    var mainFrameStyle = {
        background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${mainBackground})`,
        backgroundPosition: "center center",
        backgroundSize: "cover"
    };

    return (
        <>
            <NavMenu />
            <div className={`main-content-fixed`} style={mainFrameStyle}>
                <Search searchType="jobs" width="w60" />
                <Slider contentType={'jobs'} />
            </div>
        </>
    );
}

export default Jobs;