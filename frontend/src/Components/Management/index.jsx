import React, { useReducer, useState } from "react";
import BasicList from "./BasicList";
// STYLES
import "./index.css";
import profile_icon from "../../Assets/img/profile.png";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader";
import { NavLink } from "react-router-dom";
const element = <FontAwesomeIcon icon={faSearch} size="1x" color="gray" />;

export default function Management(props) {
	const [universities, setUniversities] = useState(true);
	const [companies, setCompanies] = useState(false);
	// const [state, dispatch] = useReducer(first, second, third);
	function changeItem(setter) {
		setUniversities(false);
		setCompanies(false);
		setter(true);
	}

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

	return (
		<>
			<main className={`main-content-management`}>
				<div className={`admin-menu`}>
					<div
						className={`admin-menu-item ${universities ? "active-item" : ""}`}
						onClick={(e) => changeItem(setUniversities)}
					>
						Universities
					</div>
					<div
						className={`admin-menu-item ${companies ? "active-item" : ""}`}
						onClick={(e) => changeItem(setCompanies)}
					>
						Companies
					</div>
					<NavLink to={`/`} className={`admin-menu-item`}>
						Back to UniLab
					</NavLink>
				</div>
				<div
					className={`admin-content content-${
						universities || companies ? "horizontal" : "vertical"
					}`}
				>
					{universities ? (
						<>
							<BasicList type="a university">
								<Loader size="3" color="orange" />
								{/* INSERT ITEMS DYNAMICALLY HERE | BEST WITH .map() */}
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									FirstnameFirstname LastnameLastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									FirstnameFirstname LastnameLastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									FirstnameFirstname LastnameLastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									FirstnameFirstname LastnameLastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									FirstnameFirstname LastnameLastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									FirstnameFirstname LastnameLastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									FirstnameFirstname LastnameLastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									FirstnameFirstname LastnameLastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									FirstnameFirstname LastnameLastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									Firstname Lastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
								<div className={`basic-list-item shadow`}>
									{/* An example list item */}
									<img
										className={`basic-list-item-icon`}
										src={profile_icon}
										alt="user"
									/>
									Firstname Lastname
									<div className={`basic-list-item-btn noselect`} tabIndex={1}>
										REMOVE
									</div>
								</div>
							</BasicList>
						</>
					) : null}
					{companies ? (
						<BasicList type="a company">
							<Loader size="3" color="orange" />
							{/* INSERT ITEMS DYNAMICALLY HERE | BEST WITH .map() */}
							<div className={`basic-list-item shadow`}>
								{/* An example list item */}
								<img
									className={`basic-list-item-icon`}
									src={profile_icon}
									alt="user"
								/>
								FirstnameFirstname LastnameLastname
								<div className={`basic-list-item-btn noselect`} tabIndex={1}>
									REMOVE
								</div>
							</div>
						</BasicList>
					) : null}
					{universities || companies ? (
						<div className={`add-new-field custom-scroll`}>
							<div className={`add-new-input-field shadow`}>
								<i className={`add-new-search-icon`}>{element}</i>
								<input
									className={`add-new-input`}
									type="text"
									placeholder="Search for a user..."
								/>
							</div>
							<Loader size="3" color="orange" />
							<div className={`basic-list-item shadow`}>
								{/* An example list item */}
								<img
									className={`basic-list-item-icon`}
									src={profile_icon}
									alt="user"
								/>
								FirstnameFirstname LastnameLastname
								<div className={`basic-list-item-btn noselect`} tabIndex={1}>
									ADD
								</div>
							</div>
							<div className={`basic-list-item shadow`}>
								{/* An example list item */}
								<img
									className={`basic-list-item-icon`}
									src={profile_icon}
									alt="user"
								/>
								FirstnameFirstname LastnameLastname
								<div className={`basic-list-item-btn noselect`} tabIndex={1}>
									ADD
								</div>
							</div>
							<div className={`basic-list-item shadow`}>
								{/* An example list item */}
								<img
									className={`basic-list-item-icon`}
									src={profile_icon}
									alt="user"
								/>
								FirstnameFirstname LastnameLastname
								<div className={`basic-list-item-btn noselect`} tabIndex={1}>
									ADD
								</div>
							</div>
							<div className={`basic-list-item shadow`}>
								{/* An example list item */}
								<img
									className={`basic-list-item-icon`}
									src={profile_icon}
									alt="user"
								/>
								FirstnameFirstname LastnameLastname
								<div className={`basic-list-item-btn noselect`} tabIndex={1}>
									ADD
								</div>
							</div>
							<div className={`basic-list-item shadow`}>
								{/* An example list item */}
								<img
									className={`basic-list-item-icon`}
									src={profile_icon}
									alt="user"
								/>
								FirstnameFirstname LastnameLastname
								<div className={`basic-list-item-btn noselect`} tabIndex={1}>
									ADD
								</div>
							</div>
							<div className={`basic-list-item shadow`}>
								{/* An example list item */}
								<img
									className={`basic-list-item-icon`}
									src={profile_icon}
									alt="user"
								/>
								FirstnameFirstname LastnameLastname
								<div className={`basic-list-item-btn noselect`} tabIndex={1}>
									ADD
								</div>
							</div>
							<div className={`basic-list-item shadow`}>
								{/* An example list item */}
								<img
									className={`basic-list-item-icon`}
									src={profile_icon}
									alt="user"
								/>
								FirstnameFirstname LastnameLastname
								<div className={`basic-list-item-btn noselect`} tabIndex={1}>
									ADD
								</div>
							</div>
						</div>
					) : null}
				</div>
			</main>
		</>
	);
}
