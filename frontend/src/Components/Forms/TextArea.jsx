import React, { useRef, useState, useEffect } from "react";
// STYLES
import "./TextArea.css";
// OTHER
import EmoteMenu from "../EmoteMenu";

export default function TextArea(props) {
	const width = props.width;
	const label = props.label;
	const textarea = useRef(null);
	const [message, setMessage] = [props.message, props.setMessage];
	const [cursorPosition, setCursorPosition] = useState("");
	const handleChange = (e) => {
		setMessage(e.target.value);
	};
	useEffect(() => {
		textarea.current.selectionEnd = cursorPosition;
	}, [cursorPosition]);
	const [errorCheck, setErrorCheck] = useState("no-line");
	function emptyCheck() {
		if (textarea.current.value.length == 0) {
			setErrorCheck("red-line");
		}
	}
	function removeError() {
		setErrorCheck("no-line");
	}
	let textareaBody;
	if (props.required === "no") {
		textareaBody = (
			<textarea
				ref={textarea}
				className={`text-area input custom-scroll`}
				name="content"
				rows={props.rows ? props.rows : "10"}
				placeholder={label}
				required
				value={message}
				onChange={handleChange}
			></textarea>
		);
	} else {
		textareaBody = (
			<textarea
				ref={textarea}
				className={`text-area input custom-scroll`}
				name="content"
				rows={props.rows ? props.rows : "10"}
				placeholder={label}
				required
				onFocus={removeError}
				onBlur={emptyCheck}
				value={message}
				onChange={handleChange}
			></textarea>
		);
	}
	return (
		<div className={`textarea-container`} style={{ width: width }}>
			<div className={`textarea-field`}>
				{textareaBody}
				<EmoteMenu
					message={message}
					setMessage={setMessage}
					textarea={textarea}
					setCursorPosition={setCursorPosition}
					menuWidth="40%"
					menuTop={props.menuTop ? props.menuTop : "10%"}
					menuRight="0"
				/>
				<span className={`${errorCheck} bottom-line`}></span>
			</div>
		</div>
	);
}
