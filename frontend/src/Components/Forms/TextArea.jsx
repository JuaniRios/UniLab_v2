import React, { useRef, useState, useEffect } from "react";
// STYLES
import "./TextArea.css";
import EmoteMenu from "../EmoteMenu";

function TextArea(props) {

    const width = props.width;
    const label = props.label;
    const textarea = useRef(null);


    const [message, setMessage] = useState("");
    const [cursorPosition, setCursorPosition] = useState("");
    const handleChange = e => {
        setMessage(e.target.value);
    };
    useEffect(() => {
        textarea.current.selectionEnd = cursorPosition;
    }, [cursorPosition])

    const [errorCheck, setErrorCheck] = useState("no-line");
    function emptyCheck() {
        if (textarea.current.value.length == 0) {
            setErrorCheck("red-line");
        }
    }
    function removeError() {
        setErrorCheck("no-line");
    }

    return (

        <div className={`textarea-container`} style={{ width: width }}>

            <div className={`textarea-field`}>



                <textarea
                    ref={textarea}
                    className={`text-area input custom-scroll`}
                    name='content' rows={"14"} required
                    placeholder="Write a post..."
                    onFocus={removeError} onBlur={emptyCheck}
                    value={message}
                    onChange={handleChange}>
                </textarea>

                <EmoteMenu message={message}
                    setMessage={setMessage}
                    textarea={textarea}
                    setCursorPosition={setCursorPosition}
                    menuWidth="40%"
                    menuTop="10%"
                    menuRight="0" />

                <span className={`${errorCheck} bottom-line`}></span>

            </div>

        </div>
    )
}

export default TextArea;