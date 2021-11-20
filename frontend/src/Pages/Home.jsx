import React from "react";
import NavMenu from "../Components/NavMenu";
import Footer from "../Components/Footer";
import Slider from "../Components/Slider";
// SCRIPTS
import "../Assets/scripts/main.jsx";

function Home(props) {
    document.title = "UniLab - Home";
    return (
        <>
            <NavMenu />
            <Slider />
            <Footer />
        </>
    );
}

export default Home;