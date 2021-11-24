import React from "react";
import HomePrimary from "./HomePrimary";
import Announcements from "../Announcements";
// SCRIPTS
// import "../Assets/scripts/main.jsx";
// STYLE
import "./index.css";


function HomeComponents(props) {
    document.title = "UniLab - Home";
    return (
        <div className={`main-content-wrapper`}>
            <HomePrimary />
            <Announcements />
        </div>
    );
}

export default HomeComponents;