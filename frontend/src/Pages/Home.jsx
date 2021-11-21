import React from "react";
import NavMenu from "../Components/NavMenu";
import Footer from "../Components/Footer";
import HomeCover from "../Components/HomeCover";
import Slider from "../Components/Slider";
// SCRIPTS
import "../Assets/scripts/main.jsx";

function Home(props) {
    document.title = "UniLab - Home";
    return (
        <>
            <NavMenu />
            <HomeCover />
            <Slider />
            <Footer />
        </>
    );
}

export default Home;