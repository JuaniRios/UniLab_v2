import React, { useState } from "react";
// STYLES
import "./BasicInput.css";
// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function BasicInput(props) {
	const name = props.name;
	const width = props.width;
	const label = props.label;
	let type = props.type;
	const errorMsg = props.errorMsg;
	const [inputValue, setInput] = [props.value, props.setter];
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
		} else {
			setOpacityShown("transparent");
		}
	};
	let eyeIcon = <></>;
	if (type === "password") {
		eyeIcon = (
			<i className={opacity} onClick={togglePasswordVisibility}>
				{eye}
			</i>
		);
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
	let inputBody;
	if (props.required === "no") {
		inputBody = (
			<input
				value={inputValue}
				type={type}
				required
				name={name}
				onChange={(e) => setInput(e.target.value)}
			/>
		);
	} else if (props.required === "special") {
		inputBody = (
			<input
				className="special-input"
				value={inputValue}
				type={type}
				required
				name={name}
				onChange={(e) => setInput(e.target.value)}
			/>
		);
	} else {
		inputBody = (
			<input
				value={inputValue}
				type={type}
				name={name}
				required
				onFocus={removeError}
				onBlur={(e) => emptyCheck(e.target.value)}
				onChange={(e) => setInput(e.target.value)}
			/>
		);
	}
	return (
		<div className={`input-container`} style={{ width: width }}>
			<div className={`input-field`}>
				{eyeIcon}
				{inputBody}
				<label className={`noselect`}>{label}</label>
				<span className={`${errorCheck} bottom-line`} />
			</div>
			{errorBlock}
		</div>
	);
}
