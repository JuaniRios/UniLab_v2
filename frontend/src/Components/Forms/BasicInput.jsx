import React, {useEffect, useState} from "react";
// STYLES
import "./BasicInput.css";
// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

export function ErrorMessage(props) {
	return (<>
				<div className={`error-message noselect`}>⚠ {props.message}</div>
			</>
	)
}

export default function BasicInput(props) {
	const name = props.name;
	let width = "100%"
	if ("width" in props) width = props.width;


	const label = props.label;
	let type = props.type;
	let errors = props.errors;
	if (errors === undefined) errors = []
	// errors is a list of lists. each inner list contains a msg string, and a bool hook to display it or not
	const [inputValue, setInput] = [props.value, props.setter];
	const [shownErrors, setShownErrors] = useState([])

	// update shown errors
	useEffect( () => {
		let errorList = []
		for (const error of errors) {
			if (error[1]) {
				errorList.push(<ErrorMessage message={error[0]}/>)
			}
		setShownErrors(errorList)
		}
	}, [errors])

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


	if (props.type === "number") {
		inputBody = (
			<input
				value={inputValue}
				type={"text"}
				pattern="\d*"
				required
				name={name}
				onChange={(e) => {setInput(e.target.value)}}
				maxLength={props.maxLength}

			/>
		);

	}
	else if (props.required === "no") {
		inputBody = (
			<input
				value={inputValue}
				type={type}
				required
				name={name}
				onChange={(e) => {setInput(e.target.value)}}
				maxLength={props.maxLength}

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
				onChange={(e) => {setInput(e.target.value)}}
				maxLength={props.maxLength}
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
				onBlur={(e) => {emptyCheck(e.target.value)}}
				onChange={(e) => {setInput(e.target.value)}}
				maxLength={props.maxLength}
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
			{shownErrors}
		</div>
	);
}
