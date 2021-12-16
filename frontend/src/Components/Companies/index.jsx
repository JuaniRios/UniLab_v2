import React, { useReducer } from "react";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import Slider from "../Slider";

function Companies(props) {

    document.title = "Companies - UniLab";

    return (
        <>
            <NavMenu />
            <div className={`main-content`}>
                <Slider contentType={'companies'} />
            </div>
            <Footer />
        </>
    );
}

export default Companies;