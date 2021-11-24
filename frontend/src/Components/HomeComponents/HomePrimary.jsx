import React, { useState, useEffect, useReducer, useRef } from "react";
import { NavLink } from "react-router-dom";
import HomeBlock from "./HomeBlock";
// STYLES
import "./HomePrimary.css";
// IMAGES
import BoxGrid from "./BoxGrid";

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
                <BoxGrid contentType={"companies"}/>
            </HomeBlock>

        </div>
    )
}

export default HomePrimary;