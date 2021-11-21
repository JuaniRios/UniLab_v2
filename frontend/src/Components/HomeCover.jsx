import React, { useState, useEffect, useReducer, useRef } from "react";
import { NavLink } from "react-router-dom";
// STYLES
import "./HomeCover.css";
// IMAGES
import microsoft_icon from "../Assets/img/ms.jpg";
import google_icon from "../Assets/img/google-logo.webp";

function HomeCover(props) {

    const homePolygon = useRef(null);
    const homeMessage = useRef(null);

    useEffect(() => {
        var timer1 = 1;
        var i = 1;
        homeMessage.current.style.bottom = "-100%";
        while (i <= 75) {
            (function () {    // create a closure (new scope)
                var _i = i;   // make a local copy of `i` from the outer scope
                var timer2 = timer1;
                setTimeout(() => {
                    homePolygon.current.setAttribute("points", `${_i},0 100,0 100,101 ${_i - 25},101`);
                }, timer2);
            })();
            i = i + 0.01;
            timer1 = timer1 + 0.2;
        }
        homeMessage.current.style.bottom = "0";
    });

    return (
        <div className={`home-cover`}>
            <svg className={`home-cover-svg`} viewBox="0 0 100 100" preserveAspectRatio="none" >
                <polygon className={`home-cover-polygon`} points="0,0 100,0 100,101 0,101" ref={homePolygon} />
            </svg>
            <div className={`home-cover-message w30`} ref={homeMessage}>
                <h1 className={`welcome-msg`}>Welcome to UniLab!</h1>
                <h2>An easier way to connect with employers in Europe</h2>
                <button className={`uni-button`}>Get Started</button>
            </div>
        </div>
    )
}

export default HomeCover;
