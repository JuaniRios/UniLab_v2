import React from "react";
import { NavLink } from "react-router-dom";
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
                <NavLink to="/sign-up" className={`uni-button-3`}>Get Started</NavLink>
            </div>
        </div>
    )
}

export default HomeCover;
