import React, { useReducer } from "react";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import Slider from "../Slider";

function Jobs(props) {

    document.title = "Jobs - UniLab";

    return (
        <>
            <NavMenu />
            <div className={`main-content`}>
                <Slider contentType={'jobs'} />
            </div>
            <Footer />
        </>
    );
}

export default Jobs;