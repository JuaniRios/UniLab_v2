import React, { useState } from "react";
import "./CollapsibleMenu.css";

export default function CollapsibleMenu(props) {

    return (
        <>
            <div className={`collapsible-menu-btn`}>
                <span>{props.text}</span>
            </div>
            <div className={`collapsible-menu-content`}>
                {props.children}
            </div>
        </>
    );
}