import React, { useState, useEffect } from "react";
// STYLES
import "./GeneralSearch.css";
// IMAGES
import search_icon from "../../Assets/img/top-nav/search.png";
import CloseButton from "../Buttons/CloseButton";

export default function GeneralSearch(props) {
	return (
		<>
			<div className={`overlay shown`} onClick={() => {props.setDisplay(false)}}/>
			<form className={`search-wrapper search-menu-opened shadow flex-row a-i-c j-c-c`}>
				<img id="search-icon" src={search_icon} alt="Magnifying Glass" title="Search" />

				<input
					className={`search-field noshadow`}
					name="main-search"
					type="search"
					placeholder="Search UniLab..."
				/>

				<CloseButton clickEvent={() => {props.setDisplay(false)}} position="relative" borderRadius="50%" />
			</form>
		</>
	);
}
