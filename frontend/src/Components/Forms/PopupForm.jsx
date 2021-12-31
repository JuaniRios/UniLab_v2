import React, { useEffect } from "react";
import CloseButton from "../Buttons/CloseButton";
import "./PopupForm.css";

export default function PopupForm(props) {

    const [popupClass, overlayClass] = props.popupClasses;
    const setPopupClasses = props.setPopupClasses;
    
    let title;
    if (props.title) {
        title = <h1 className="normal">{props.title}</h1>;
    }
    else {
        title = <></>;
    }

    return (
        <>
            <div className={`overlay overlay-10k ${overlayClass}`} onClick={setPopupClasses} />

            <aside className={`popup-form-container ${popupClass} shadow`}>
                <form className={`popup-form custom-scroll`}>
                    <CloseButton clickEvent={setPopupClasses} position="absolute" />
                    {title}
                    {props.children}
                    <button className="uni-button popup-save-btn">Save</button>
                </form>
            </aside>
        </>
    );
}