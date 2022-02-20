import React, {useEffect, useState} from "react";
import CloseButton from "../Buttons/CloseButton";

// STYLES
import "./GeneralForm.css";
import {CSSTransition} from "react-transition-group";


export default function GeneralForm(props) {
	const [formToggled, setFormToggled] = props.formToggle

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

						<div className="uni-create-btn uni-button" onClick={props.handleSubmit}>{props.submitText}</div>
					</div>
				</div>
			</CSSTransition>
		</>
	);
}
