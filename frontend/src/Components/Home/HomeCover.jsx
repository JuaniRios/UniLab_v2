import React from "react";
// STYLES
import "./HomeCover.css";
// IMAGES

function HomeCover(props) {

    return (
        <div className={`home-cover`}>

            <div className={`home-cover-polygon`}></div>

            <div className={`home-cover-message w30`}>
                <h1 className={`welcome-msg`}>Welcome to UniLab!</h1>
                <h2>An easier way to connect with employers in Europe</h2>
                <button className={`uni-button-3`}>Get Started</button>
            </div>
        </div>
    )
}

export default HomeCover;
