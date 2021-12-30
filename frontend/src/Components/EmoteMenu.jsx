import React, { useState, useEffect, useRef } from "react";
import Picker from 'emoji-picker-react';
// STYLES
import "./EmoteMenu.css";

function EmoteMenu(props) {

    const menuWidth = props.menuWidth;
    const menuTop = props.menuTop;
    const menuBottom = props.menuBottom;
    const menuLeft = props.menuLeft;
    const menuRight = props.menuRight;
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const [emoteBtnClass, setEmoteBtnClass] = useState("emote-btn-default");
    const [emoteFieldClass, setEmoteFieldClass] = useState("hidden");
    const toggleEmoteBtnClass = (e) => {
        if (emoteBtnClass === "emote-btn-default") {
            setEmoteBtnClass("emote-btn-toggled");
            setEmoteFieldClass("shown");
        }
        else {
            setEmoteBtnClass("emote-btn-default");
            setEmoteFieldClass("hidden");
        }
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    if (!event.target.classList.contains("emote-btn")) {
                        setEmoteBtnClass("emote-btn-default");
                        setEmoteFieldClass("hidden");
                    }
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const fieldRef = useRef(null);
    useOutsideAlerter(fieldRef);
    const btnRef = useRef(null);
    // useOutsideAlerter(btnRef);

    const message = props.message;
    const setMessage = props.setMessage;
    const textarea = props.textarea;
    const setCursorPosition = props.setCursorPosition;
    const onEmojiClick = (event, emojiObject) => {
        const ref = textarea.current;
        ref.focus();
        const start = message.substring(0, ref.selectionStart);
        const end = message.substring(ref.selectionStart);
        const text = start + emojiObject.emoji + end;
        setMessage(text);
        setCursorPosition(start.length + emojiObject.emoji.length);
    };

    return (
        <>
            <button type="button" ref={btnRef} className={`emote-btn ${emoteBtnClass}`} onClick={toggleEmoteBtnClass}>&#128513;</button>
            <div ref={fieldRef} className={`emote-field ${emoteFieldClass}`}
                style={{ width: menuWidth, top: menuTop, bottom: menuBottom, left: menuLeft, right: menuRight }}>
                <Picker onEmojiClick={onEmojiClick} native={true} />
            </div>
        </>
    )
}

export default EmoteMenu;