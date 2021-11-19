import React from "react";
import NavMenu from "../Components/NavMenu";
import Footer from "../Components/Footer";
// SCRIPTS
import "../Assets/scripts/main.jsx";

function Home(props) {
    document.title = "UniLab - Home";
    return (
        <>
            <NavMenu />
            <h1>TEST1</h1>
            <h1>TEST2</h1>
            <h1>TEST3</h1>
            <h1>TEST4</h1>
            <h1>TEST5</h1>
            <h1>TEST6</h1>
            <h1>TEST7</h1>
            <h1>TEST8</h1>
            <h1>TEST9</h1>
            <h1>TEST10</h1>
            <h1>TEST11</h1>
            <Footer />
        </>
    );
}

export default Home;