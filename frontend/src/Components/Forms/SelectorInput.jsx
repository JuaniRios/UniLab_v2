import React, {useEffect, useState} from "react";
// STYLES
import "./SelectorInput.css";
// FONT AWESOME

export default function SelectorInput(props) {
	const width = props.width;
	const label = props.label;
	const [inputValue, setInput] = [props.value, props.setter];
	const choices = props.choices // a json where the key is the text for the button, and the val is the text for the api
	let choiceList = []

	for (const choice in choices) {
		choiceList.push(<option value={choices[choice]}>{choice}</option>)
	}

	if (!props.required) {
		choiceList.push(<option value={""}>Choose Later</option>)
	}

	return (
		<div className={`select-container`} style={{ width: width }}>
			<div className={`select-field`}>
				<select value={inputValue} onChange={e => {setInput(e.target.value)}}>
					<option disabled selected value="" id={"default-select-option"}>Select One</option>
					{choiceList}
				</select>
				<label className={`noselect`}>{label}</label>
			</div>
		</div>
	);
}