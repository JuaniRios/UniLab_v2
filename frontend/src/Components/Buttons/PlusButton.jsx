import React from "react";
// STYLES
import "./PlusButton.css";

function PlusButton(props) {

    const clickEvent = props.clickEvent;
    const position = props.position;

    var btnStyle = {
        position: position
    }

    return (
        <button className={`plus-btn`} onClick={clickEvent} style={btnStyle} type="button"></button>
    );
}

export default PlusButton;