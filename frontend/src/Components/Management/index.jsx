import React, {useEffect, useReducer, useState} from "react";
import BasicList from "./BasicList";
// STYLES
import "./index.css";
import profile_icon from "../../Assets/img/profile.png";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader";
import {Link, NavLink} from "react-router-dom";




export default function Management(props) {
	const [type, setType] = useState("university");
	const [forceReload, setForceReload] = useState(false)
	function dragElement(elmnt) {
		var pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;
		if (document.getElementById(elmnt.id + "header")) {
			// if present, the header is where you move the DIV from:
			document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
		} else {
			// otherwise, move the DIV from anywhere inside the DIV:
			elmnt.onmousedown = dragMouseDown;
		}

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			// set the element's new position:
			elmnt.style.top = elmnt.offsetTop - pos2 + "px";
			elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
		}

		function closeDragElement() {
			// stop moving when mouse button is released:
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}

	const singularTypes = {"universities":"university", "companies": "company"}

	return (
		<>
			<main className={`main-content-management`}>
				<div className={`admin-menu`}>
					<div
						className={`admin-menu-item ${type==="university" ? "active-item" : ""}`}
						onClick={(e) => setType("university")}
					>
						Universities
					</div>
					<div
						className={`admin-menu-item ${type==="company" ? "active-item" : ""}`}
						onClick={(e) => setType("company")}
					>
						Companies
					</div>
					<Link to={"/"} onClick={window.location.reload} className={`admin-menu-item`} >
						Back to UniLab
					</Link>
				</div>
				<div
					className={`admin-content content-${
						["university","company"].includes(type) ? "horizontal" : "vertical"
					}`}
				>
						<div className={`add-new-field custom-scroll`}>
							<BasicList title={`Approved users for creating a ${type}`} type={type} option="REMOVE"
								forceReload={[forceReload, setForceReload]} avoidYourself={true}/>
						</div>
						<div className={`add-new-field custom-scroll`}>
							<BasicList title="Unapproved users" type={type} option="ADD"
								forceReload={[forceReload, setForceReload]} avoidYourself={true}/>
						</div>
				</div>
			</main>
		</>
	);
}
