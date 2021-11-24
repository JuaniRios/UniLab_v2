import React, { useState, useEffect, useReducer, useRef } from "react";
import { NavLink } from "react-router-dom";
import HomeBlock from "./HomeBlock";
// STYLES
import "./HomePrimary.css";
// IMAGES

function HomePrimary(props) {

    var companyName = "LONGCOMPANYNAMEWITHOUTSPACING";

    if (companyName.length > 20) {
        companyName = companyName.slice(0, 19) + "...";
    }

    return (
        <div className={`home-primary`}>

            <HomeBlock headerValue="Explore UniLab" btnValue="Create Account">
                <div className={`home-block-content-1`}>
                    <p>
                        Join our platform with companies around the world. Search for a suitable job in
                        your field, location and language.
                    </p>
                    <p>
                        Explore companies, positions and community posts to learn more about your
                        future workplace.
                    </p>
                </div>
            </HomeBlock>

            <HomeBlock headerValue="Top Companies" btnValue="More Companies">
                <div className={`employer-box`}>
                    <a className={`employer-item shadow`}>
                        <div className={`employer-name noselect`}>
                            <div className={`w90`}>{companyName}</div>
                            <div className={`employer-stars`}>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
                        </div>
                        <div className={`employer-overlay`}></div>
                    </a>

                    <a className={`employer-item shadow`}>
                        <div className={`employer-name noselect`}>
                            <div className={`w90`}>{companyName}</div>
                            <div className={`employer-stars`}>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
                        </div>
                        <div className={`employer-overlay`}></div>
                    </a>

                    <a className={`employer-item shadow`}>
                        <div className={`employer-name noselect`}>
                            <div className={`w90`}>{companyName}</div>
                            <div className={`employer-stars`}>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
                        </div>
                        <div className={`employer-overlay`}></div>
                    </a>

                    <a className={`employer-item shadow`}>
                        <div className={`employer-name noselect`}>
                            <div className={`w90`}>{companyName}</div>
                            <div className={`employer-stars`}>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
                        </div>
                        <div className={`employer-overlay`}></div>
                    </a>

                    <a className={`employer-item shadow`}>
                        <div className={`employer-name noselect`}>
                            <div className={`w90`}>{companyName}</div>
                            <div className={`employer-stars`}>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
                        </div>
                        <div className={`employer-overlay`}></div>
                    </a>

                    <a className={`employer-item shadow`}>
                        <div className={`employer-name noselect`}>
                            <div className={`w90`}>{companyName}</div>
                            <div className={`employer-stars`}>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
                        </div>
                        <div className={`employer-overlay`}></div>
                    </a>

                    <a className={`employer-item shadow`}>
                        <div className={`employer-name noselect`}>
                            <div className={`w90`}>{companyName}</div>
                            <div className={`employer-stars`}>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
                        </div>
                        <div className={`employer-overlay`}></div>
                    </a>

                    <a className={`employer-item shadow`}>
                        <div className={`employer-name noselect`}>
                            <div className={`w90`}>{companyName}</div>
                            <div className={`employer-stars`}>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
                        </div>
                        <div className={`employer-overlay`}></div>
                    </a>
                </div>
            </HomeBlock>

        </div>
    )
}

export default HomePrimary;