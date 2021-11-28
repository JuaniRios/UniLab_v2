import React, { useState, useEffect, useReducer, useRef } from "react";
import { NavLink } from "react-router-dom";
// STYLES
import "./HomeBlock.css";
import Loader from "../Loader";

function HomeBlock(props) {

    const headerValue = props.headerValue;
    const btnValue = props.btnValue;

    return (
        <div className={`home-block shadow`}>
            <h1 className={`home-block-header`}>
                {headerValue}
            </h1>
            {props.children}
            <a href="{% url 'signup' %}" className={`home-block-btn uni-button`}>
                {btnValue}
            </a>
        </div>
    )
}

export default HomeBlock;