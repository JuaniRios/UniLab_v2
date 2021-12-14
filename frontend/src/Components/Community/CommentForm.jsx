import React, { useReducer, useRef, useState, useEffect } from "react";
// STYLES
import "./CommentForm.css";
// ICONS
import profile_icon from "../../Assets/img/profile.png";
// OTHER COMPONENTS
import EmoteMenu from "../EmoteMenu";

function CommentForm(props) {

    const textarea = useRef(null);
    function autoGrow() {
        textarea.current.style.height = "5px";
        textarea.current.style.height = (textarea.current.scrollHeight) + "px";
    }

    const [message, setMessage] = useState("");
    const [cursorPosition, setCursorPosition] = useState("");
    const handleChange = e => {
        setMessage(e.target.value);
    };
    useEffect(() => {
        textarea.current.selectionEnd = cursorPosition;
    }, [cursorPosition])

    return (
        <form className="comment-form w90">
            <img className={`comment-form-img`} src={profile_icon} alt={`Your profile picture`} title={`Post Owner`} />
            <div className={`comment-input-container`}>
                <textarea ref={textarea} className="custom-scroll" placeholder="Write a comment..."
                    onInput={autoGrow} value={message} onChange={handleChange}></textarea>
                <EmoteMenu menuWidth="60%" menuTop="100%" menuRight="0"
                    message={message}
                    setMessage={setMessage}
                    textarea={textarea}
                    setCursorPosition={setCursorPosition} />
            </div>
        </form>
    )
}

export default CommentForm;