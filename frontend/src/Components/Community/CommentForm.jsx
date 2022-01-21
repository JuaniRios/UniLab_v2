import React, { useRef, useState, useEffect } from "react";
// STYLES
import "./CommentForm.css";
// OTHER
import EmoteMenu from "../EmoteMenu";
import { useAuthState } from "../../Context";
import postContent from "../HelperFunctions/postContent";
import CommentContainer from "./CommentContainer";

export default function CommentForm(props) {
	const authState = useAuthState();
	const textarea = useRef(null);
	const inputContainer = useRef(null);
	const [focused, setFocused] = useState(false);
	const [commentFormAlign, setCommentFormAlign] = useState(true);
	function autoGrow() {
		textarea.current.style.height = "5px";
		textarea.current.style.height = textarea.current.scrollHeight + "px";
		if (parseInt(textarea.current.style.height) > 50) {
			inputContainer.current.style.borderRadius = "10px";
			setCommentFormAlign(false);
		} else {
			inputContainer.current.style.borderRadius = "50px";
			setCommentFormAlign(true);
		}
	}
	const [message, setMessage] = useState("");
	const [cursorPosition, setCursorPosition] = useState("");
	const handleChange = (e) => {
		setMessage(e.target.value);
	};
	useEffect(() => {
		textarea.current.selectionEnd = cursorPosition;
	}, [cursorPosition]);
	async function handleSubmit() {
		if (message.length < 1) return false;
		let payload = { content: message, post: props.postUrl };
		try {
			const commentInfo = await postContent("comments", authState.token, payload);
			props.setCommentList((current) => {
				let updated = current.slice();
				updated.unshift(<CommentContainer {...commentInfo} key={current.length} />);
				return updated;
			});
			setMessage("");
		} catch (e) {
			console.log(e);
		}
	}
	function handleEnter(event) {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSubmit().catch((e) => console.log);
		}
	}
	function preventNewLine(e) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
		}
	}
	useEffect(() => {
		if (focused) {
			document.addEventListener("keyup", handleEnter);
		} else {
			document.removeEventListener("keyup", handleEnter);
		}
		return () => {
			document.removeEventListener("keyup", handleEnter);
		};
	}, [focused, message, handleEnter]);
	return (
		<form className={`comment-form w90 ${commentFormAlign ? "a-i-c" : "a-i-f-s"}`}>
			<img
				className={`comment-form-img`}
				src={authState.userData.image}
				alt={`Your profile`}
				title={`Post Owner`}
			/>
			<div className={`comment-input-container`} ref={inputContainer}>
				<textarea
					ref={textarea}
					className="custom-scroll"
					placeholder="Write a comment..."
					onInput={autoGrow}
					value={message}
					onChange={handleChange}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					onKeyPress={preventNewLine}
				/>
				<EmoteMenu
					menuWidth="60%"
					menuTop="100%"
					menuRight="0"
					message={message}
					setMessage={setMessage}
					textarea={textarea}
					setCursorPosition={setCursorPosition}
				/>
			</div>
		</form>
	);
}
