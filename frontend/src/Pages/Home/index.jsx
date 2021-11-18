import React from "react";
import NavMenu from "../../Components/NavMenu";
// SCRIPTS
import "../../Assets/scripts/main.jsx";

function Home(props) {
    document.title = "UniLab - Home";
    return (
        <>
            <NavMenu />
        </>
    );
}

export default Home;