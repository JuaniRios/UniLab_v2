import React, {useEffect, useState} from "react";
import CloseButton from "../Buttons/CloseButton";

// STYLES
import "./GeneralForm.css";
import {CSSTransition} from "react-transition-group";


export default function GeneralForm(props) {
	const [formToggled, setFormToggled] = props.formToggle
	let submitToggle;
	if ("submitToggle" in props) {
		submitToggle = props.submitToggle
	} else {
		submitToggle = true
	}

	return (
		<>

			{formToggled && <div className={`overlay`} onClick={e => setFormToggled(false)}/>}
			<CSSTransition in={formToggled} unmountOnExit timeout={500} classNames={"uni-form-transition"}>
				<div className={`uni-form-wrapper shadow`}>
					<CloseButton
						borderRadius="0 10px 0 10px"
						position="absolute"
						clickEvent={(e) => setFormToggled(false)}
					/>

					<div className={`uni-form custom-scroll`}>
						<h1 className={`uni-form-title`}>{props.title}</h1>

						{props.children}

						{submitToggle ?
							<div className="uni-create-btn uni-button"
								 onClick={props.handleSubmit}>{props.submitText}</div>
							:
							<div className="uni-create-btn uni-button-disabled" style={{opacity: 0.3}}>{props.submitText}</div>
						}
					</div>
				</div>
			</CSSTransition>
		</>
	);
}
