import React from "react";
import NavMenu from "../NavMenu";
import Announcements from "../Announcements";
import Slider from "../Slider";
import Footer from "../Footer";

import HomePrimary from "./HomePrimary";
import HomeCover from "./HomeCover";
// STYLES
import "./index.css";

function Home(props) {
    document.title = "UniLab - Home";
    return (
        <>
            <NavMenu />
            <HomeCover />
            <div className={`home-content`}>
                <HomePrimary />
                <Announcements />
            </div>
            <Slider contentType={'jobs'} />
            <Footer />
        </>
    );
}

export default Home;