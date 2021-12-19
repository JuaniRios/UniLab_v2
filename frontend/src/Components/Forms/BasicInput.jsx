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
    const setInput = props.setter;
    const inputValue = props.value;

    // FOR ERROR MESSAGE
    let errorBlock = <></>;
    if (errorMsg) {
        errorBlock = <div className={`error-message noselect`}>⚠ {errorMsg}</div>;
    }

    // FOR PASSWORD INPUT
    const [opacity, setOpacityShown] = useState("transparent");
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
        if (opacity === "transparent") {
            setOpacityShown("opaque");
        }
        else {
            setOpacityShown("transparent");
        }
    };
    let eyeIcon = <></>;
    if (type === "password") {
        eyeIcon = <i className={opacity} onClick={togglePasswordVisibility}>{eye}</i>;
        type = passwordShown ? "text" : "password";
    }

    const [errorCheck, setErrorCheck] = useState("no-line");

    function emptyCheck(e) {
        if (e === "") {
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
                <input value={inputValue} type={type} name={name} required
                    onFocus={removeError}
                    onBlur={e => emptyCheck(e.target.value)}
                    onChange={e => setInput(e.target.value)}
                />
                <label className={`noselect`}>{label}</label>
                <span className={`${errorCheck} bottom-line`} />
            </div>
            {errorBlock}
        </div>
    )
}

export default BasicInput;