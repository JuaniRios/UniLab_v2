import React from "react";
// STYLES
import "./CloseButton.css";

function CloseButton(props) {

    const clickEvent = props.clickEvent;
    const position = props.position;

    var btnStyle = {
        position: position
    }

    return (
        <button className={`close-btn`} onClick={clickEvent} style={btnStyle} type="button">

        </button>
    );
}

export default CloseButton;