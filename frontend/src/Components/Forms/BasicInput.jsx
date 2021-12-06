import React, { useRef, useState } from "react";
// STYLES
import "./BasicInput.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

function BasicInput(props) {

    const name = props.name;
    const width = props.width;
    const label = props.label;
    let type = props.type;
    const errorMsg = props.errorMsg;
    const input = useRef(null);
    const error = useRef(null);

    // FOR ERROR MESSAGE
    let errorBlock = <></>;
    if (errorMsg) {
        errorBlock = <div ref={error} className={`error-message noselect`}>⚠ {errorMsg}</div>;
    }

    // FOR PASSWORD INPUT
    const [opacity, setOpacityShown] = useState("transparent");
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
        if (opacity == "transparent") {
            setOpacityShown("opaque");
        }
        else {
            setOpacityShown("transparent");
        }
    };
    let eyeIcon = <></>;
    if (type === "password") {
        eyeIcon = <i className={opacity} onClick={togglePasswordVisiblity}>{eye}</i>;
        type = passwordShown ? "text" : "password";
    }

    const [errorCheck, setErrorCheck] = useState("no-line");

    function emptyCheck() {
        if (input.current.value.length == 0) {
            setErrorCheck("red-line");
        }
    }
    function removeError() {
        setErrorCheck("no-line");
    }


    return (
        <div className={`input-container`} style={{ width: width }}>
            <div className={`input-field`}>
                {eyeIcon}
                <input ref={input} type={type} name={name} required onFocus={removeError} onBlur={emptyCheck} />
                <label className={`noselect`}>{label}</label>
                <span className={`${errorCheck} bottom-line`}></span>
            </div>
            {errorBlock}
        </div>
    )
}

export default BasicInput;