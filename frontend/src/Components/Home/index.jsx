import React from "react";
import NavMenu from "../NavMenu";
import Announcements from "./Announcements";
import Slider from "../Slider/Slider";
import Footer from "../Footer";

import HomePrimary from "./HomePrimary";
import HomeCover from "./HomeCover";
// STYLES
import "./index.css";
import {useLocation} from "react-router-dom";

function Home(props) {
    document.title = "UniLab - Home";
    const location = useLocation();
    let redirected;
    try {
        redirected = location.state.redirected
    } catch (e) {
        redirected = false
    }

    return (
        <>
            <NavMenu redirected={redirected}/>
            <HomeCover/>
            <div className={`home-content`}>
                <HomePrimary/>
                <Announcements/>
            </div>
            <Slider contentType={'jobs'}/>
            <Footer/>
        </>
    );
}

export default Home;