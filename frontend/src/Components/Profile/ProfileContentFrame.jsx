import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import PlusButton from "../Buttons/PlusButton";
import NavMenu from "../NavMenu";
import "./ProfileContentFrame.css";

function ProfileContentFrame(props) {

    let contentStyle = {
        width: props.width,
        padding: (props.margin) ? "2rem" : "0"
    }

    let plusBtn;
    if (props.plusBtn) {
        plusBtn = <PlusButton />;
    }
    let title;
    if (props.title) {
        title = <h1 className={`normal`} style={{ margin: "0" }}>{props.title}</h1>;
    }

    return (
        <div id={props.id} className={`profile-content shadow`} style={contentStyle}>
            <div className={`flex-row j-c-s-b a-i-c w100`}>
                {title}
                {plusBtn}

            </div>
            {props.children}
        </div>
    );
}

export default ProfileContentFrame; 