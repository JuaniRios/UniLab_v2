import React, { useReducer, useRef, useState, useEffect } from "react";
// STYLES
import "./CommentForm.css";
// ICONS
import profile_icon from "../../Assets/img/profile.png";
// OTHER COMPONENTS
import EmoteMenu from "../EmoteMenu";
import {useAuthState} from "../../Context";
import postContent from "../HelperFunctions/postContent";
import PostContainer from "./PostContainer";
import CommentContainer from "./CommentContainer";

function CommentForm(props) {
    const authState = useAuthState()
    const textarea = useRef(null);
    const [focused, setFocused] = useState(false)
    function autoGrow() {
        textarea.current.style.height = "5px";
        textarea.current.style.height = (textarea.current.scrollHeight) + "px";
    }

    const [message, setMessage] = useState("");
    const [cursorPosition, setCursorPosition] = useState("");
    const handleChange = e => {
        setMessage(e.target.value);
    };
    const [posting, setPosting] = useState(false)

    useEffect(() => {
        textarea.current.selectionEnd = cursorPosition;
    }, [cursorPosition])

    useEffect( () => {
        console.log(`focused state is ${focused}`)
        if (focused) {
            document.addEventListener("keyup", handleEnter)
        } else {
            document.removeEventListener("keyup", handleEnter)
        }

        return () => {
            document.removeEventListener("keyup", handleEnter)
        }
    }, [focused])

    async function handleSubmit(e) {
        let payload = {content: message}
        try {
            const commentInfo = await postContent("comments", authState.token, payload)
            console.log(commentInfo)
            props.setCommentList(current => {
                let updated = current.slice()
                updated.unshift(<CommentContainer {...commentInfo} key={current.length}/>)
                return updated
            })
            setMessage("")

        } catch (e) {
            console.log(e)
        }


    }

    function handleFocus(val) {
        setFocused(val)
        console.log(focused)
        console.log("focused?")
    }

    function handleEnter(event) {
        if (event.key === "Enter" ) console.log("Enter pressed")
    }

    return (
        <form className="comment-form w90">
            <img className={`comment-form-img`} src={profile_icon} alt={`Your profile picture`} title={`Post Owner`} />
            <div className={`comment-input-container`}>
                <textarea ref={textarea} className="custom-scroll" placeholder="Write a comment..."
                onInput={autoGrow} value={message} onChange={handleChange} onFocus={() => setFocused(true)} onBlur={ () => setFocused(false)}/>
                <EmoteMenu menuWidth="60%" menuTop="100%" menuRight="0"
                    message={message}
                    setMessage={setMessage}
                    textarea={textarea}
                    setCursorPosition={setCursorPosition}
                />
            </div>
        </form>
    )
}

export default CommentForm;